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
    DeliveryService: function() {
        return DeliveryService;
    },
    default: function() {
        return _default;
    }
});
const _deliverymodel = require("../models/delivery.model");
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
let DeliveryService = class DeliveryService {
    async createDelivery(input) {
        let result;
        let newDelivery = new this.deliveries({
            delivery_time: input.delivery_time,
            delivery_address: input.delivery_adress,
            delivery_city: input.delivery_city,
            delivery_state: input.delivery_state,
            delivery_zipcode: input.delivery_zipCode,
            delivery_items: input.delivery_items,
            delivery_status: input.delivery_status
        });
        result = await newDelivery.save();
        if (result) {
            return result;
        }
    }
    async getAllDeliveries() {
        let deliveries = await this.deliveries.find();
        return deliveries;
    }
    async updateDelivery(input, deliveryId) {
        let foundDelivery = await this.deliveries.findOne({
            _id: deliveryId
        });
        if (!foundDelivery) throw new _errormiddleware.HttpException(404, _errors.errors.DELIVERY_DOES_NOT_EXIST);
        const updatedDelivery = await this.deliveries.findByIdAndUpdate(deliveryId, input, {
            new: true
        });
        return {
            success: updatedDelivery != null ? true : false
        };
    }
    async deleteDelivery(deliveryId) {
        let foundDelivery = await this.deliveries.findOne({
            _id: deliveryId
        });
        if (!foundDelivery) throw new _errormiddleware.HttpException(404, _errors.errors.DELIVERY_DOES_NOT_EXIST);
        await this.deliveries.findByIdAndDelete({
            _id: deliveryId
        });
        return {
            success: true
        };
    }
    constructor(){
        _define_property(this, "deliveries", _deliverymodel.deliveryModel);
    }
};
const _default = DeliveryService;

//# sourceMappingURL=delivery.service.js.map