import { compareSync, hashSync } from "bcrypt";
import crypto from "crypto";
import { verify } from "jsonwebtoken";
import { ActivationStatus } from "../constants/enums";
import { errors } from "../constants/errors";
import { vars } from "../constants/vars";
import {
  CheckEmailReqDto,
  CheckEmailResDto,
  ResendVerificationCodeEmailReqDto,
  ResendVerificationCodeEmailResDto,
  ResetPasswordReqDto,
  ResetPasswordResDto,
  SendPasswordResetEmailReqDto,
  SendPasswordResetEmailResDto,
  SignInUserReqDto,
  SignInUserResDto,
  SignOutUserResDto,
  SignUpUserReqDto,
  SignUpUserResDto,
  VerifyUserAccountReqDto,
  VerifyUserAccountResDto,
} from "../dtos/auth.dto";
import { User } from "../interfaces/models/user.model.interface";
import { HttpException } from "../middlewares/error.middleware";
import { userModel } from "../models/user.model";
import { generateAccessToken } from "../utils/auth";
import { Mailer } from "../utils/mailer";

class AuthService {
  private users = userModel;

  public async checkEmail(input: CheckEmailReqDto): Promise<CheckEmailResDto> {
    let isExists: boolean = false;
    const foundUser: User = await this.users.findOne({
      "account.email": input.email.toLowerCase(),
      isArchived: false,
    });

    if (foundUser) {
      isExists = true;
    }

    return {
      isExists,
    };
  }

  public async signUpUser(input: SignUpUserReqDto): Promise<SignUpUserResDto> {
    const foundUser: User = await this.users.findOne({
      "account.email": input.email.toLowerCase(),
      isArchived: false,
    });
    if (foundUser) throw new HttpException(409, errors.EMAIL_ALREADY_EXISTS);

    const user: User = await this.users.create({
      account: {
        role: "STANDARD",
        activationStatus: "ACTIVE",
        isVerified: false,
        verificationCode: crypto.randomBytes(32).toString("hex"),
        verificationExpireAt: new Date(
          new Date().setHours(
            new Date().getHours() + vars.verificationCodeExpInHours
          )
        ),
        email: input.email.toLowerCase(),
        password: hashSync(input.password, 10),
      },
      profile: {
        firstName: input.firstName,
        lastName: input.lastName,
      },
    });

    new Mailer(user.account.email, {
      name: user.profile.firstName,
      url: `${vars.appLink}/auth/verify-account/${user.account.verificationCode}`,
    }).sendVerifyAccount();

    return {
      success: true,
      userId: user._id,
    };
  }

  public async verifyUserAccount(
    input: VerifyUserAccountReqDto
  ): Promise<VerifyUserAccountResDto> {
    const foundUser: User = await this.users.findOne({
      "account.verificationCode": input.verificationCode,
      isArchived: false,
    });
    if (!foundUser) throw new HttpException(404, errors.USER_NOT_FOUND);

    if (foundUser.account.isVerified)
      throw new HttpException(409, errors.ACCOUNT_ALREADY_VERIFIED);

    if (
      foundUser.account.verificationCode !== input.verificationCode ||
      foundUser.account.verificationExpireAt <= new Date()
    )
      throw new HttpException(409, errors.INVALID_VERIFICATION_CODE);

    await this.users.findOneAndUpdate(
      { "account.verificationCode": input.verificationCode },
      {
        $set: {
          "account.isVerified": true,
          updatedAt: new Date(),
        },
        $unset: {
          "account.verificationCode": 1,
          "account.verificationExpireAt": 1,
        },
      }
    );

    return {
      success: true,
    };
  }

  public async resendVerificationCodeEmail(
    input: ResendVerificationCodeEmailReqDto
  ): Promise<ResendVerificationCodeEmailResDto> {
    const foundUser: User = await this.users.findOne({
      "account.email": input.email.toLowerCase(),
      isArchived: false,
    });
    if (!foundUser) throw new HttpException(404, errors.USER_NOT_FOUND);

    if (foundUser.account.isVerified)
      throw new HttpException(409, errors.ACCOUNT_ALREADY_VERIFIED);

    const updatedUser: User = await this.users.findOneAndUpdate(
      { "account.email": input.email.toLowerCase() },
      {
        $set: {
          "account.verificationCode": crypto.randomBytes(32).toString("hex"),
          "account.verificationExpireAt": new Date(
            new Date().setHours(
              new Date().getHours() + vars.verificationCodeExpInHours
            )
          ),
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    new Mailer(foundUser.account.email, {
      name: foundUser.profile.firstName,
      url: `${vars.appLink}/auth/verify-account/${updatedUser.account.verificationCode}`,
    }).sendVerifyAccount();

    return {
      success: true,
    };
  }

  public async sendPasswordResetEmail(
    input: SendPasswordResetEmailReqDto
  ): Promise<SendPasswordResetEmailResDto> {
    const foundUser: User = await this.users.findOne({
      "account.email": input.email.toLowerCase(),
      isArchived: false,
    });
    if (!foundUser) throw new HttpException(409, errors.EMAIL_NOT_FOUND);

    const updatedUser: User = await this.users.findOneAndUpdate(
      { _id: foundUser._id },
      {
        $set: {
          "account.passwordRecoveryToken": crypto
            .randomBytes(32)
            .toString("hex"),
          "account.passwordRecoveryExpireAt": new Date(
            new Date().setHours(
              new Date().getHours() + vars.recoveryTokenExpInHours
            )
          ),
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    new Mailer(foundUser.account.email, {
      name: foundUser.profile.firstName,
      url: `${vars.appLink}/reset-password/${updatedUser.account.passwordRecoveryToken}`,
    }).sendResetPassword();

    return {
      success: true,
    };
  }

  public async resetPassword(
    input: ResetPasswordReqDto
  ): Promise<ResetPasswordResDto> {
    const foundUser: User = await this.users.findOne({
      "account.passwordRecoveryToken": input.passwordRecoveryToken,
      isArchived: false,
    });
    if (!foundUser || foundUser.account.passwordRecoveryExpireAt <= new Date())
      throw new HttpException(409, errors.INVALID_PASSWORD_RECOVERY_TOKEN);

    await this.users.findOneAndUpdate(
      { _id: foundUser._id },
      {
        $set: {
          "account.password": hashSync(input.newPassword, 10),
          "account.passwordRecoveredAt": new Date(),
          updatedAt: new Date(),
        },
        $unset: {
          "account.passwordRecoveryToken": 1,
          "account.passwordRecoveryExpireAt": 1,
        },
      }
    );

    return {
      success: true,
    };
  }

  public async signInUser(input: SignInUserReqDto): Promise<SignInUserResDto> {
    let lastSignIn: string = "";
    const foundUser: User = await this.users.findOne({
      "account.email": input.email.toLowerCase(),
      isArchived: false,
    });
    if (!foundUser) throw new HttpException(401, errors.WRONG_CREDENTIALS);

    if (foundUser.account.activationStatus === ActivationStatus.Blocked)
      throw new HttpException(409, errors.ACCOUNT_HAS_BEEN_BLOCKED);

    if (!compareSync(input.password, foundUser.account.password))
      throw new HttpException(401, errors.WRONG_CREDENTIALS);

    let updateQuery: any = {
      $set: {
        "account.lastSignIn": new Date(),
        updatedAt: new Date(),
      },
    };

    lastSignIn = foundUser.account.lastSignIn
      ? foundUser.account.lastSignIn.toDateString()
      : null;
    if (foundUser.account.activationStatus === ActivationStatus.Inactive) {
      updateQuery = {
        $set: {
          "account.activationStatus": ActivationStatus.Active,
          "account.lastSignIn": new Date(),
          updatedAt: new Date(),
        },
      };
    }

    await this.users.findOneAndUpdate({ _id: foundUser._id }, updateQuery);

    return {
      success: true,
      accessToken: generateAccessToken(foundUser._id),
      lastSignIn: lastSignIn == "" ? null : lastSignIn,
      userId: foundUser._id,
    };
  }

  public async signOutUser(userId: string): Promise<SignOutUserResDto> {
    const foundUser: User = await this.users.findOne({
      _id: userId,
      isArchived: false,
    });
    if (!foundUser) throw new HttpException(401, errors.WRONG_CREDENTIALS);

    await this.users.findOneAndUpdate(
      { _id: foundUser._id },
      {
        $set: {
          "account.lastSignOut": new Date(),
          updatedAt: new Date(),
        },
      }
    );

    return {
      success: true,
    };
  }

  public async refreshAccessToken(refreshToken: string): Promise<any> {
    if (refreshToken) {
      try {
        let decoded = verify(refreshToken, vars.jwtRefreshKey);
      } catch (error) {
        return {
          success: false,
          message: "Invalid Token",
        };
      }
    } else {
      return {
        success: false,
        message: "Invalid Token",
      };
    }
  }
}

export default AuthService;
