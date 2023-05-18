"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PickUp", {
    enumerable: true,
    get: function() {
        return PickUp;
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
let PickUp = class PickUp {
    constructor(){
        _define_property(this, "_id", void 0);
        _define_property(this, "pickup_time", void 0);
        _define_property(this, "pickup_address", void 0);
        _define_property(this, "pickup_city", void 0);
        _define_property(this, "pickup_state", void 0);
        _define_property(this, "pickup_zipCode", void 0);
        _define_property(this, "pickup_items", void 0);
        _define_property(this, "pickup_status", void 0);
    }
};

//# sourceMappingURL=pickup.model.interface.js.map