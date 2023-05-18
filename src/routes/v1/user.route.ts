import UserController from "../../controllers/user.controller";
import {
  UpdateCurrentUserReqDto,
} from "../../dtos/user.dto";
import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { Routes } from "../../interfaces/routes.interface";
import validationMiddleware from "../../middlewares/validation.middleware";

class UserRouteV1 implements Routes {
  public path = "/api/v1/users";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:userId`,
      authMiddleware,
      this.userController.getUserById
    );
    this.router.get(
      this.path,
      authMiddleware,
      this.userController.getCurrentUser
    );
    this.router.put(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(UpdateCurrentUserReqDto, "body"),
      this.userController.updateCurrentUser
    );

    this.router.post(
      `${this.path}/password`,
      authMiddleware,
      this.userController.updatePassword
    );

    this.router.delete(
      `${this.path}`,
      authMiddleware,
      this.userController.deleteCurrentUser
    );


  }
}

export default UserRouteV1;
