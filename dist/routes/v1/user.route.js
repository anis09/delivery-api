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
const _usercontroller = _interop_require_default(require("../../controllers/user.controller"));
const _userdto = require("../../dtos/user.dto");
const _express = require("express");
const _authmiddleware = _interop_require_default(require("../../middlewares/auth.middleware"));
const _validationmiddleware = _interop_require_default(require("../../middlewares/validation.middleware"));
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
let UserRouteV1 = class UserRouteV1 {
    initializeRoutes() {
        this.router.get(`${this.path}/:userId`, _authmiddleware.default, this.userController.getUserById);
        this.router.get(this.path, _authmiddleware.default, this.userController.getCurrentUser);
        this.router.put(`${this.path}`, _authmiddleware.default, (0, _validationmiddleware.default)(_userdto.UpdateCurrentUserReqDto, "body"), this.userController.updateCurrentUser);
        this.router.post(`${this.path}/password`, _authmiddleware.default, this.userController.updatePassword);
        this.router.delete(`${this.path}`, _authmiddleware.default, this.userController.deleteCurrentUser);
    }
    constructor(){
        _define_property(this, "path", "/api/v1/users");
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "userController", new _usercontroller.default());
        this.initializeRoutes();
    }
};
const _default = UserRouteV1;

//# sourceMappingURL=user.route.js.map