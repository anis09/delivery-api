import {
  CreateDeliveryReqDto,
  CreateDeliveryResDto,
  DeleteDeliveryResDto,
  UpdateDeliveryReqDto,
  UpdateDeliveryResDto,
} from "../dtos/delivery.dto";
import { Delivery } from "../interfaces/models/delivery.model.interface";
import { deliveryModel } from "../models/delivery.model";
import { HttpException } from "../middlewares/error.middleware";
import { errors } from "../constants/errors";

export class DeliveryService {
  private deliveries = deliveryModel;

  public async createDelivery(input: CreateDeliveryReqDto): Promise<Delivery> {
    let result: Delivery;
    let newDelivery = new this.deliveries({
      delivery_time: input.delivery_time,
      delivery_address: input.delivery_adress,
      delivery_city: input.delivery_city,
      delivery_state: input.delivery_state,
      delivery_zipcode: input.delivery_zipCode,
      delivery_items: input.delivery_items,
      delivery_status: input.delivery_status,
    });
    result = await newDelivery.save();
    if (result) {
      return result;
    }
  }
  
  public async getAllDeliveries(): Promise<Delivery[]> {
    let deliveries: Delivery[] = await this.deliveries.find();
    return deliveries;
  }

  public async updateDelivery(
    input: UpdateDeliveryReqDto,
    deliveryId: string
  ): Promise<UpdateDeliveryResDto> {
    let foundDelivery = await this.deliveries.findOne({ _id: deliveryId });
    if (!foundDelivery)
      throw new HttpException(404, errors.DELIVERY_DOES_NOT_EXIST);

    const updatedDelivery: Delivery = await this.deliveries.findByIdAndUpdate(
      deliveryId,
      input,
      { new: true }
    );
    return {
      success: updatedDelivery != null ? true : false,
    };
  }
  public async deleteDelivery(deliveryId:string):Promise<DeleteDeliveryResDto>{
    let foundDelivery = await this.deliveries.findOne({_id:deliveryId})
    if(!foundDelivery) throw new HttpException(404,errors.DELIVERY_DOES_NOT_EXIST)

    await this.deliveries.findByIdAndDelete({_id:deliveryId})
    return{
      success:true
    }
  }
}

export default DeliveryService;
