import { NextFunction, Request, Response } from "express";
import {
  CheckEmailReqDto,
  CheckEmailResDto,
  RefreshTokenReqDto,
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
  VerifyUserAccountResDto
} from "../dtos/auth.dto";
import { RequestWithUser } from "../interfaces/auth.interface";
import AuthService from "../services/auth.service";

class AuthController {
  private authService = new AuthService();


  public signInUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: SignInUserReqDto = req.body;
      const outputData: SignInUserResDto = await this.authService.signInUser(
        inputData
      );

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };

  public signOutUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const outputData: SignOutUserResDto = await this.authService.signOutUser(
        req.user
      );

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };

  public signUpUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: SignUpUserReqDto = req.body;
      const outputData: SignUpUserResDto = await this.authService.signUpUser(
        inputData
      );

      res.status(201).json(outputData);
    } catch (error) {
      next(error);
    }
  };
  public checkEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: CheckEmailReqDto = req.query as any;
      const outputData: CheckEmailResDto = await this.authService.checkEmail(
        inputData
      );

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };

  public verifyUserAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: VerifyUserAccountReqDto = req.body;
      const outputData: VerifyUserAccountResDto =
        await this.authService.verifyUserAccount(inputData);

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };

  public resendVerificationCodeEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: ResendVerificationCodeEmailReqDto = req.body;
      const outputData: ResendVerificationCodeEmailResDto =
        await this.authService.resendVerificationCodeEmail(inputData);

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: ResetPasswordReqDto = req.body;
      const outputData: ResetPasswordResDto =
        await this.authService.resetPassword(inputData);

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };
  public sendPasswordResetEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: SendPasswordResetEmailReqDto = req.body;
      const outputData: SendPasswordResetEmailResDto =
        await this.authService.sendPasswordResetEmail(inputData);

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };
  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { refreshToken }: RefreshTokenReqDto = req.cookies as any;
      let outputData: any = await this.authService.refreshAccessToken(
        refreshToken
      );
      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
