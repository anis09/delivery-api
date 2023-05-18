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
const _pickupcontroller = _interop_require_default(require("../../controllers/pickup.controller"));
const _express = require("express");
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
let PickUpRouteV1 = class PickUpRouteV1 {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.pickUpController.getAllPickUps);
        this.router.post(`${this.path}`, this.pickUpController.createPickUp);
        this.router.put(`${this.path}/:pickUpId`, this.pickUpController.updatePickup);
        this.router.delete(`${this.path}/:pickUpId`, this.pickUpController.deletePickup);
    }
    constructor(){
        _define_property(this, "path", "/api/v1/pickUp");
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "pickUpController", new _pickupcontroller.default());
        this.initializeRoutes();
    }
};
const _default = PickUpRouteV1;

//# sourceMappingURL=pickup.route.js.map