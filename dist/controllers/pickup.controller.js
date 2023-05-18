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
const _pickupservice = _interop_require_default(require("../services/pickup.service"));
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
let PickUpController = class PickUpController {
    constructor(){
        _define_property(this, "pickUpService", new _pickupservice.default());
        _define_property(this, "createPickUp", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.pickUpService.createPickUp(inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "getAllPickUps", async (req, res, next)=>{
            try {
                const pickups = await this.pickUpService.getAllPickUps();
                res.status(200).json(pickups);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "updatePickup", async (req, res, next)=>{
            try {
                const { pickUpId  } = req.params;
                const input = req.body;
                const outputData = await this.pickUpService.updatePickup(input, pickUpId);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "deletePickup", async (req, res, next)=>{
            try {
                const { pickUpId  } = req.params;
                const outputData = await this.pickUpService.deletePickup(pickUpId);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
    }
};
const _default = PickUpController;

//# sourceMappingURL=pickup.controller.js.map