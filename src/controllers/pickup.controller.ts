import { CreatePickUpReqDto, CreatePickUpResDto, DeletePickupResDto, UpdatePickupReqDto, UpdatePickupResDto } from "../dtos/pickup.dto";
import { NextFunction, Request, Response } from "express";
import PickUpService from "../services/pickup.service";
import { PickUp } from "../interfaces/models/pickup.model.interface";

class PickUpController {
  private pickUpService = new PickUpService();

  public createPickUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: CreatePickUpReqDto = req.body as any;
      const outputData: PickUp = await this.pickUpService.createPickUp(
        inputData
      );
      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };
  public getAllPickUps = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pickups: PickUp[] = await this.pickUpService.getAllPickUps();
      res.status(200).json(pickups);
    } catch (error) {
      next(error);
    }
  };
  public updatePickup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pickUpId } = req.params as any;
      const input: UpdatePickupReqDto = req.body;
      const outputData: UpdatePickupResDto = await this.pickUpService.updatePickup(
        input,
        pickUpId,
      );
      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };
  public deletePickup = async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try{
        const {pickUpId} =req.params as any;
        const outputData: DeletePickupResDto=await this.pickUpService.deletePickup(pickUpId);
        res.status(200).json(outputData);
    }catch(error){
        next(error);
    }
  };
}
export default PickUpController;
