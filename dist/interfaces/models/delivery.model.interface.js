"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Delivery", {
    enumerable: true,
    get: function() {
        return Delivery;
    }
});
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
let Delivery = class Delivery {
    constructor(){
        _define_property(this, "_id", void 0);
        _define_property(this, "delivery_time", void 0);
        _define_property(this, "delivery_address", void 0);
        _define_property(this, "delivery_city", void 0);
        _define_property(this, "delivery_state", void 0);
        _define_property(this, "delivery_zipCode", void 0);
        _define_property(this, "delivery_items", void 0);
        _define_property(this, "delivery_status", void 0);
    }
};

//# sourceMappingURL=delivery.model.interface.js.map