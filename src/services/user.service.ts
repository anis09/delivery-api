import { compareSync, hashSync } from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import generator from 'generate-password';
import {
  DeleteCurrentUserResDto,
  GetCurrentUserResDto,
  UpdateCurrentUserReqDto,
  UpdateCurrentUserResDto,
  UpdatePasswordReqDto,
  UpdatePasswordResDto,
  UserDto,
} from "../dtos/user.dto";
import { errors } from "../constants/errors";
import { vars } from "../constants/vars";
import { User } from "../interfaces/models/user.model.interface";
import { HttpException } from "../middlewares/error.middleware";
import { userModel } from "../models/user.model";
import { Mailer } from "../utils/mailer";
class UserService {
  private users = userModel;
  public async getUsers(): Promise<any> {
   
    const users = await this.users.aggregate([
      {
        $match: {
          isArchived: false,
        },
      },
      {
        $project: {
          _id: 1,
          "account.kind": 1,
          "profile.firstName": 1,
          "profile.lastName": 1,
          "profile.avatarUrl": 1,
        },
      },
    ]);

    return users;
  }
  public async getCurrentUser(userId: string): Promise<GetCurrentUserResDto> {
    const foundUsers: GetCurrentUserResDto[] = await this.users.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
          isArchived: false,
        },
      },
      {
        $project: {
          _id: 0,
          userId: {
            $toString: "$_id",
          },
          account: {
            role: "$account.role",
            isVerified: "$account.isVerified",
            email: "$account.email",
          },
          profile: "$profile",
        },
      },
    ]);

    if (!foundUsers || foundUsers.length === 0) return null;

    return foundUsers[0];
  }

  public async updateCurrentUser(
    userId: string,
    input: UpdateCurrentUserReqDto
  ): Promise<UpdateCurrentUserResDto> {
    const foundUser: User = await this.users.findOne({
      _id: userId,
      isArchived: false,
    });
    if (!foundUser) throw new HttpException(404, errors.USER_NOT_FOUND);

    const updatedCurrentUser = await this.users.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "account.email": input.email
            ? input.email.toLowerCase()
            : foundUser.account.email,
          "profile.firstName": input.firstName
            ? input.firstName
            : foundUser.profile.firstName,
          "profile.lastName": input.lastName
            ? input.lastName
            : foundUser.profile.lastName,
          "profile.phone": input.phone ? input.phone : foundUser.profile.phone,
          "profile.avatarUrl": input.avatarUrl
            ? input.avatarUrl
            : foundUser.profile.avatarUrl,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    return {
      success: updatedCurrentUser != null ? true : false,
    };
  }


  public async updatePassword(
    userId: string,
    input: UpdatePasswordReqDto
  ): Promise<UpdatePasswordResDto> {
    const foundUser: User = await this.users.findOne({
      _id: userId,
      isArchived: false,
    });
    if (!foundUser) throw new HttpException(404, errors.USER_NOT_FOUND);

    if (!compareSync(input.oldPassword, foundUser.account.password))
      throw new HttpException(409, errors.WRONG_PASSWORD);

    const updatedPassword = await this.users.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "account.password": hashSync(input.newPassword, 10),
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    return {
      success: updatedPassword != null ? true : false,
    };
  }


  public async deleteCurrentUser(
    userId: string
  ): Promise<DeleteCurrentUserResDto> {
    const foundUser: User = await this.users.findOne({
      _id: userId,
      isArchived: false,
    });
    if (!foundUser) throw new HttpException(404, errors.USER_NOT_FOUND);

    const deletedCurrentUser = await this.users.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          isArchived: true,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    return {
      success: deletedCurrentUser != null ? true : false,
    };
  }
   
}

export default UserService;
