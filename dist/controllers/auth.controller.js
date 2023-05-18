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
const _authservice = _interop_require_default(require("../services/auth.service"));
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
let AuthController = class AuthController {
    constructor(){
        _define_property(this, "authService", new _authservice.default());
        _define_property(this, "signInUser", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.authService.signInUser(inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "signOutUser", async (req, res, next)=>{
            try {
                const outputData = await this.authService.signOutUser(req.user);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "signUpUser", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.authService.signUpUser(inputData);
                res.status(201).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "checkEmail", async (req, res, next)=>{
            try {
                const inputData = req.query;
                const outputData = await this.authService.checkEmail(inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "verifyUserAccount", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.authService.verifyUserAccount(inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "resendVerificationCodeEmail", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.authService.resendVerificationCodeEmail(inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "resetPassword", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.authService.resetPassword(inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "sendPasswordResetEmail", async (req, res, next)=>{
            try {
                const inputData = req.body;
                const outputData = await this.authService.sendPasswordResetEmail(inputData);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "refreshToken", async (req, res, next)=>{
            try {
                let { refreshToken  } = req.cookies;
                let outputData = await this.authService.refreshAccessToken(refreshToken);
                res.status(200).json(outputData);
            } catch (error) {
                next(error);
            }
        });
    }
};
const _default = AuthController;

//# sourceMappingURL=auth.controller.js.map