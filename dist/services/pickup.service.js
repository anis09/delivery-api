"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PickUpService: function() {
        return PickUpService;
    },
    default: function() {
        return _default;
    }
});
const _pickupmodel = require("../models/pickup.model");
const _errormiddleware = require("../middlewares/error.middleware");
const _errors = require("../constants/errors");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
let PickUpService = class PickUpService {
    async createPickUp(input) {
        let result;
        let newPickUp = new this.pickUps({
            pickup_time: input.pickup_time,
            pickup_address: input.pickup_adress,
            pickup_city: input.pickup_city,
            pickup_state: input.pickup_state,
            pickup_zipcode: input.pickup_zipCode,
            pickup_items: input.pickup_items,
            pickup_status: input.pickup_status
        });
        result = await newPickUp.save();
        if (result) {
            return result;
        }
    }
    async getAllPickUps() {
        let pickUps = await this.pickUps.find();
        return pickUps;
    }
    async updatePickup(input, pickUpId) {
        let foundPickup = await this.pickUps.findOne({
            _id: pickUpId
        });
        if (!foundPickup) throw new _errormiddleware.HttpException(404, _errors.errors.PICKUP_DOES_NOT_EXIST);
        const updatedPickup = await this.pickUps.findByIdAndUpdate(pickUpId, input, {
            new: true
        });
        return {
            success: updatedPickup != null ? true : false
        };
    }
    async deletePickup(pickUpId) {
        let foundPickup = await this.pickUps.findOne({
            _id: pickUpId
        });
        if (!foundPickup) throw new _errormiddleware.HttpException(404, _errors.errors.PICKUP_DOES_NOT_EXIST);
        await this.pickUps.findByIdAndDelete({
            _id: pickUpId
        });
        return {
            success: true
        };
    }
    constructor(){
        _define_property(this, "pickUps", _pickupmodel.pickUpModel);
    }
};
const _default = PickUpService;

//# sourceMappingURL=pickup.service.js.map