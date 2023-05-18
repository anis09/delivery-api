import { Router } from "express";
import AuthController from "../../controllers/auth.controller";
import {
  RefreshTokenReqDto,
  ResendVerificationCodeEmailReqDto,
  ResetPasswordReqDto,
  SendPasswordResetEmailReqDto,
  SignInUserReqDto,
  SignUpUserReqDto,
  VerifyUserAccountReqDto,
} from "../../dtos/auth.dto";
import { Routes } from "../../interfaces/routes.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";

class AuthRouteV1 implements Routes {
  public path = "/api/v1/auth";
  public adminPath = "/api/v1/admin/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/check`,
      this.authController.checkEmail
    );

    this.router.post(
      `${this.path}/sign-up`,
      validationMiddleware(SignUpUserReqDto, "body"),
      this.authController.signUpUser
    );
    this.router.post(
      `${this.path}/account-verify`,
      validationMiddleware(VerifyUserAccountReqDto, "body"),
      this.authController.verifyUserAccount
    );
    this.router.post(
      `${this.path}/code-resend`,
      validationMiddleware(ResendVerificationCodeEmailReqDto, "body"),
      this.authController.resendVerificationCodeEmail
    );
    this.router.post(
      `${this.path}/password-reset`,
      validationMiddleware(ResetPasswordReqDto, "body"),
      this.authController.resetPassword
    );
    this.router.post(
      `${this.path}/password-reset/email`,
      validationMiddleware(SendPasswordResetEmailReqDto, "body"),
      this.authController.sendPasswordResetEmail
    );
    this.router.post(
      `${this.path}/sign-in`,
      validationMiddleware(SignInUserReqDto, "body"),
      this.authController.signInUser
    );
    this.router.post(
      `${this.path}/sign-out`,
      authMiddleware,
      this.authController.signOutUser
    );
    this.router.post(
      `${this.path}/refresh`,
      validationMiddleware(RefreshTokenReqDto, "cookies"),
      this.authController.refreshToken
    );
  }
}

export default AuthRouteV1;
