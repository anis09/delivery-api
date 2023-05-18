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
const _userservice = _interop_require_default(require("../services/user.service"));
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
let UserController = class UserController {
    constructor(){
        _define_property(this, "userService", new _userservice.default());
        _define_property(this, "getCurrentUser", async (req, res, next)=>{
            try {
                const outputData = await this.userService.getCurrentUser(req.user);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "getUserById", async (req, res, next)=>{
            try {
                const outputData = await this.userService.getCurrentUser(req.params.userId);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "updateCurrentUser", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.userService.updateCurrentUser(req.user, inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "updatePassword", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.userService.updatePassword(req.user, inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "deleteCurrentUser", async (req, res, next)=>{
            try {
                const outputData = await this.userService.deleteCurrentUser(req.user);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
    }
};
const _default = UserController;

//# sourceMappingURL=user.controller.js.map