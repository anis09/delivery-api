import { NextFunction, Request, Response } from "express";
import {
  DeleteCurrentUserResDto,
  DeleteUserResDto,
  GetCurrentUserResDto,
  UpdateCurrentUserReqDto,
  UpdateCurrentUserResDto,
  UpdatePasswordReqDto,
  UpdatePasswordResDto,
} from "../dtos/user.dto";
import { RequestWithUser } from "../interfaces/auth.interface";
import UserService from "../services/user.service";

class UserController {
  private userService = new UserService();

  public getCurrentUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const outputData: GetCurrentUserResDto =
        await this.userService.getCurrentUser(req.user);

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };
  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const outputData: GetCurrentUserResDto =
        await this.userService.getCurrentUser(req.params.userId);

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };
  public updateCurrentUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: UpdateCurrentUserReqDto = req.body;
      const outputData: UpdateCurrentUserResDto =
        await this.userService.updateCurrentUser(req.user, inputData);

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };


  public updatePassword = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: UpdatePasswordReqDto = req.body;
      const outputData: UpdatePasswordResDto =
        await this.userService.updatePassword(req.user, inputData);

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };


  public deleteCurrentUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const outputData: DeleteCurrentUserResDto =
        await this.userService.deleteCurrentUser(req.user);

      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };

 
}

export default UserController;
