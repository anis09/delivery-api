"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deliveryModel", {
    enumerable: true,
    get: function() {
        return deliveryModel;
    }
});
const _mongoose = require("mongoose");
const _vars = require("../constants/vars");
const deliverySchema = new _mongoose.Schema({
    user_id: {
        type: _mongoose.Types.ObjectId,
        ref: 'User'
    },
    delivery_time: Date,
    delivery_address: String,
    delivery_city: String,
    delivery_state: String,
    delivery_zipcode: Number,
    delivery_items: [
        String
    ],
    delivery_status: String
}, {
    collection: "deliveries",
    versionKey: false
});
const db = _mongoose.connection.useDb(_vars.vars.mongoDb);
const deliveryModel = db.model("Delivery", deliverySchema);

//# sourceMappingURL=delivery.model.js.map