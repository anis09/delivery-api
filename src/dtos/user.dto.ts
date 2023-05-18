import { IsDefined, IsEmail, IsIn, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public avatarUrl: string;
  public role: string;
  public activationStatus: string;
  public isVerified: boolean;
  public email: string;
  public phone: string;
}

export class DeleteCurrentUserResDto {
  public success: boolean;
}
export class DeleteUserResDto {
  public success: boolean;
}

export class GetCurrentUserResDto {
  public userId: string;
  public account: {
    role: string;
    isVerified: boolean;
    email: string;
  };
  public profile: {
    firstName: string;
    lastName: string;
    phone: string;
    avatarUrl?: string;
  };

  
  
}
export class UpdateCurrentUserReqDto {
  @IsOptional()
  @IsEmail()
  public email: string;

  @IsOptional()
  public firstName: string;

  @IsOptional()
  public lastName: string;

  @IsOptional()
  public phone: string;

  @IsOptional()
  public avatarUrl: string;

}

export class UpdateCurrentUserResDto {
  public success: boolean;
}
export class UpdatePasswordReqDto {
  @IsDefined()
  public oldPassword: string;

  @IsDefined()
  public newPassword: string;
}

export class UpdatePasswordResDto {
  public success: boolean;
}
