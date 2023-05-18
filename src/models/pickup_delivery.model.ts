import { connection, Schema, Document, Types } from "mongoose";
import { vars } from "../constants/vars";
import { PickupDelivery } from "interfaces/models/pickup_delivery.model.interface";

const pickUpDeliverySchema: Schema = new Schema(
  {
    pickupId:{type :Types.ObjectId,ref:'Pickup'},
    deliveryId:{type :Types.ObjectId,ref:'Delivery'}
  },
  { collection: "pickUpDelivery", versionKey: false }
);

const db = connection.useDb(vars.mongoDb);
const pickUpDeliveryModel = db.model<PickupDelivery & Document>("PickUpDelivery", pickUpDeliverySchema);

export { pickUpDeliveryModel };
