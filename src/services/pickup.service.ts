import { vars } from "constants/vars";
import {
  CreatePickUpReqDto,
  CreatePickUpResDto,
  DeletePickupResDto,
  UpdatePickupReqDto,
  UpdatePickupResDto,
} from "../dtos/pickup.dto";
import { PickUp } from "../interfaces/models/pickup.model.interface";
import { pickUpModel } from "../models/pickup.model";
import { HttpException } from "../middlewares/error.middleware";
import { errors } from "../constants/errors";

export class PickUpService {
  private pickUps = pickUpModel;

  public async createPickUp(input: CreatePickUpReqDto): Promise<PickUp> {
    let result: PickUp;
    let newPickUp = new this.pickUps({
      pickup_time: input.pickup_time,
      pickup_address: input.pickup_adress,
      pickup_city: input.pickup_city,
      pickup_state: input.pickup_state,
      pickup_zipcode: input.pickup_zipCode,
      pickup_items: input.pickup_items,
      pickup_status: input.pickup_status,
    });
    result = await newPickUp.save();
    if (result) {
      return result;
    }
  }
  
  public async getAllPickUps(): Promise<PickUp[]> {
    let pickUps: PickUp[] = await this.pickUps.find();
    return pickUps;
  }

  public async updatePickup(
    input: UpdatePickupReqDto,
    pickUpId: string
  ): Promise<UpdatePickupResDto> {
    let foundPickup = await this.pickUps.findOne({ _id: pickUpId });
    if (!foundPickup)
      throw new HttpException(404, errors.PICKUP_DOES_NOT_EXIST);

    const updatedPickup: PickUp = await this.pickUps.findByIdAndUpdate(
      pickUpId,
      input,
      { new: true }
    );
    return {
      success: updatedPickup != null ? true : false,
    };
  }
  public async deletePickup(pickUpId:string):Promise<DeletePickupResDto>{
    let foundPickup = await this.pickUps.findOne({_id:pickUpId})
    if(!foundPickup) throw new HttpException(404,errors.PICKUP_DOES_NOT_EXIST)

    await this.pickUps.findByIdAndDelete({_id:pickUpId})
    return{
      success:true
    }
  }
}

export default PickUpService;
