import "reflect-metadata";
import {
  IsDefined,
  IsEmail,
  IsInt,
} from "class-validator";

export class SendPasswordResetEmailReqDto {
  @IsDefined()
  @IsEmail()
  public email: string;
}

export class SendPasswordResetEmailResDto {
  public success: boolean;
}

export class ResetPasswordReqDto {
  @IsDefined()
  public passwordRecoveryToken: string;

  @IsDefined()
  public newPassword: string;
}

export class ResetPasswordResDto {
  public success: boolean;
}

export class SignInUserReqDto {
  @IsDefined()
  @IsEmail()
  public email: string;

  @IsDefined()
  public password: string;
}

export class SignInUserResDto {
  public success: boolean;
  public accessToken: string;
  public lastSignIn?: string;
  userId: string;
}

export class SignOutUserResDto {
  public success: boolean;
}

export class SignUpUserReqDto {
  @IsDefined()
  @IsEmail()
  public email: string;

  @IsDefined()
  public password: string;

  @IsDefined()
  public firstName: string;

  @IsDefined()
  public lastName: string;

}

export class SignUpUserResDto {
  public success: boolean;
  public userId: string;
}
export class VerifyUserAccountReqDto {
  @IsDefined()
  public verificationCode: string;
}
export class CheckEmailReqDto {
  @IsDefined()
  @IsEmail()
  public email: string;
}

export class CheckEmailResDto {
  public isExists: boolean;
}
export class ResendVerificationCodeEmailReqDto {
  @IsDefined()
  @IsEmail()
  public email: string;
}

export class ResendVerificationCodeEmailResDto {
  public success: boolean;
}
export class VerifyUserAccountResDto {
  public success: boolean;
}
export class RefreshTokenReqDto {
  refreshToken: string;
}
