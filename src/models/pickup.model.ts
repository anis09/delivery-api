import { connection, Schema, Document, Types } from "mongoose";
import { vars } from "../constants/vars";
import { PickUp } from "interfaces/models/pickup.model.interface";

const pickUpSchema: Schema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: 'User' },
    pickup_time: Date,
    pickup_address: String,
    pickup_city: String,
    pickup_state: String,
    pickup_zipcode: Number,
    pickup_items: [String],
    pickup_status: String
  },
  { collection: "pickUp", versionKey: false }
);

const db = connection.useDb(vars.mongoDb);
const pickUpModel = db.model<PickUp & Document>("PickUp", pickUpSchema);

export { pickUpModel };
