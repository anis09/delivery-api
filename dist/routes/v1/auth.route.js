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
const _express = require("express");
const _authcontroller = _interop_require_default(require("../../controllers/auth.controller"));
const _authdto = require("../../dtos/auth.dto");
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
let AuthRouteV1 = class AuthRouteV1 {
    initializeRoutes() {
        this.router.get(`${this.path}/check`, this.authController.checkEmail);
        this.router.post(`${this.path}/sign-up`, (0, _validationmiddleware.default)(_authdto.SignUpUserReqDto, "body"), this.authController.signUpUser);
        this.router.post(`${this.path}/account-verify`, (0, _validationmiddleware.default)(_authdto.VerifyUserAccountReqDto, "body"), this.authController.verifyUserAccount);
        this.router.post(`${this.path}/code-resend`, (0, _validationmiddleware.default)(_authdto.ResendVerificationCodeEmailReqDto, "body"), this.authController.resendVerificationCodeEmail);
        this.router.post(`${this.path}/password-reset`, (0, _validationmiddleware.default)(_authdto.ResetPasswordReqDto, "body"), this.authController.resetPassword);
        this.router.post(`${this.path}/password-reset/email`, (0, _validationmiddleware.default)(_authdto.SendPasswordResetEmailReqDto, "body"), this.authController.sendPasswordResetEmail);
        this.router.post(`${this.path}/sign-in`, (0, _validationmiddleware.default)(_authdto.SignInUserReqDto, "body"), this.authController.signInUser);
        this.router.post(`${this.path}/sign-out`, _authmiddleware.default, this.authController.signOutUser);
        this.router.post(`${this.path}/refresh`, (0, _validationmiddleware.default)(_authdto.RefreshTokenReqDto, "cookies"), this.authController.refreshToken);
    }
    constructor(){
        _define_property(this, "path", "/api/v1/auth");
        _define_property(this, "adminPath", "/api/v1/admin/auth");
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "authController", new _authcontroller.default());
        this.initializeRoutes();
    }
};
const _default = AuthRouteV1;

//# sourceMappingURL=auth.route.js.map