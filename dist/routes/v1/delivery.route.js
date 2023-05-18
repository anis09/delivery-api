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
const _deliverycontroller = _interop_require_default(require("../../controllers/delivery.controller"));
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
let DeliveryRouteV1 = class DeliveryRouteV1 {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.deliveryController.getAllDeliveries);
        this.router.post(`${this.path}`, this.deliveryController.createDelivery);
        this.router.put(`${this.path}/:deliveryId`, this.deliveryController.updateDelivery);
        this.router.delete(`${this.path}/:deliveryId`, this.deliveryController.deleteDelivery);
    }
    constructor(){
        _define_property(this, "path", "/api/v1/delivery");
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "deliveryController", new _deliverycontroller.default());
        this.initializeRoutes();
    }
};
const _default = DeliveryRouteV1;

//# sourceMappingURL=delivery.route.js.map