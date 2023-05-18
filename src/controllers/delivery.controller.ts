import { CreateDeliveryReqDto, CreateDeliveryResDto, DeleteDeliveryResDto, UpdateDeliveryReqDto, UpdateDeliveryResDto } from "../dtos/delivery.dto";
import { NextFunction, Request, Response } from "express";
import DeliveryService from "../services/delivery.service";
import { Delivery } from "../interfaces/models/delivery.model.interface";

class DeliveryController {
  private deliveryService = new DeliveryService();

  public createDelivery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inputData: CreateDeliveryReqDto = req.body as any;
      const outputData: Delivery = await this.deliveryService.createDelivery(
        inputData
      );
      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };
  public getAllDeliveries = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deliveries: Delivery[] = await this.deliveryService.getAllDeliveries();
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  };
  public updateDelivery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { deliveryId } = req.params as any;
      const input: UpdateDeliveryReqDto = req.body;
      const outputData: UpdateDeliveryResDto = await this.deliveryService.updateDelivery(
        input,
        deliveryId,
      );
      res.status(200).json(outputData);
    } catch (error) {
      next(error);
    }
  };
  public deleteDelivery = async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try{
        const {deliveryId} =req.params as any;
        const outputData: DeleteDeliveryResDto=await this.deliveryService.deleteDelivery(deliveryId);
        res.status(200).json(outputData);
    }catch(error){
        next(error);
    }
  };
}
export default DeliveryController;
