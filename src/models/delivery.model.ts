import { connection, Schema, Document, Types } from "mongoose";
import { vars } from "../constants/vars";
import { Delivery } from "../interfaces/models/delivery.model.interface";

const deliverySchema: Schema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: 'User' },
    delivery_time: Date,
    delivery_address: String,
    delivery_city: String,
    delivery_state: String,
    delivery_zipcode: Number,
    delivery_items: [String],
    delivery_status: String
  },
  { collection: "deliveries", versionKey: false }
);

const db = connection.useDb(vars.mongoDb);
const deliveryModel = db.model<Delivery & Document>("Delivery", deliverySchema);

export { deliveryModel };
