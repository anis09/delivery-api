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
const _jsonwebtoken = require("jsonwebtoken");
const _errors = require("../constants/errors");
const _vars = require("../constants/vars");
const _errormiddleware = require("./error.middleware");
const _usermodel = require("../models/user.model");
const authMiddleware = async (req, res, next)=>{
    try {
        const token = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
        console.log("TOken", token);
        if (token) {
            const payload = await (0, _jsonwebtoken.verify)(token, _vars.vars.jwtSecretKey);
            const foundUser = await _usermodel.userModel.findById(payload.uid);
            if (foundUser) {
                if (foundUser.account.passwordRecoveredAt) {
                    if (payload.iat < Math.floor(foundUser.account.passwordRecoveredAt.getTime() / 1000)) {
                        next(new _errormiddleware.HttpException(401, _errors.errors.WRONG_AUTHENTICATION));
                    }
                }
                if (foundUser.account.lastSignOut) {
                    if (payload.iat < Math.floor(foundUser.account.lastSignOut.getTime() / 1000)) {
                        next(new _errormiddleware.HttpException(401, _errors.errors.WRONG_AUTHENTICATION));
                    }
                }
                req.user = foundUser._id;
                next();
            } else {
                next(new _errormiddleware.HttpException(401, _errors.errors.WRONG_AUTHENTICATION));
            }
        } else {
            next(new _errormiddleware.HttpException(401, _errors.errors.WRONG_AUTHENTICATION));
        }
    } catch (error) {
        console.log("Error", error);
        next(new _errormiddleware.HttpException(401, _errors.errors.WRONG_AUTHENTICATION));
    }
};
const _default = authMiddleware;

//# sourceMappingURL=auth.middleware.js.map