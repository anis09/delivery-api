"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _deliveryservice = _interop_require_default(require("../services/delivery.service"));
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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let DeliveryController = class DeliveryController {
    constructor(){
        _define_property(this, "deliveryService", new _deliveryservice.default());
        _define_property(this, "createDelivery", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.deliveryService.createDelivery(inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "getAllDeliveries", async (req, res, next)=>{
            try {
                const deliveries = await this.deliveryService.getAllDeliveries();
                res.status(200).json(deliveries);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "updateDelivery", async (req, res, next)=>{
            try {
                const { deliveryId  } = req.params;
                const input = req.body;
                const outputData = await this.deliveryService.updateDelivery(input, deliveryId);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "deleteDelivery", async (req, res, next)=>{
            try {
                const { deliveryId  } = req.params;
                const outputData = await this.deliveryService.deleteDelivery(deliveryId);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
    }
};
const _default = DeliveryController;

//# sourceMappingURL=delivery.controller.js.map