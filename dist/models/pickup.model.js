"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pickUpModel", {
    enumerable: true,
    get: function() {
        return pickUpModel;
    }
});
const _mongoose = require("mongoose");
const _vars = require("../constants/vars");
const pickUpSchema = new _mongoose.Schema({
    user_id: {
        type: _mongoose.Types.ObjectId,
        ref: 'User'
    },
    pickup_time: Date,
    pickup_address: String,
    pickup_city: String,
    pickup_state: String,
    pickup_zipcode: Number,
    pickup_items: [
        String
    ],
    pickup_status: String
}, {
    collection: "pickUp",
    versionKey: false
});
const db = _mongoose.connection.useDb(_vars.vars.mongoDb);
const pickUpModel = db.model("PickUp", pickUpSchema);

//# sourceMappingURL=pickup.model.js.map