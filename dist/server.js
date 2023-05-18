"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "app", {
    enumerable: true,
    get: function() {
        return app;
    }
});
const _authroute = _interop_require_default(require("./routes/v1/auth.route"));
const _app = _interop_require_default(require("./app"));
const _userroute = _interop_require_default(require("./routes/v1/user.route"));
const _pickuproute = _interop_require_default(require("./routes/v1/pickup.route"));
const _deliveryroute = _interop_require_default(require("./routes/v1/delivery.route"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = new _app.default([
    new _authroute.default(),
    new _userroute.default(),
    new _pickuproute.default(),
    new _deliveryroute.default()
]);
app.listen();

//# sourceMappingURL=server.js.map