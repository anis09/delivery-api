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
const _bcrypt = require("bcrypt");
const _crypto = _interop_require_default(require("crypto"));
const _jsonwebtoken = require("jsonwebtoken");
const _enums = require("../constants/enums");
const _errors = require("../constants/errors");
const _vars = require("../constants/vars");
const _errormiddleware = require("../middlewares/error.middleware");
const _usermodel = require("../models/user.model");
const _auth = require("../utils/auth");
const _mailer = require("../utils/mailer");
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
let AuthService = class AuthService {
    async checkEmail(input) {
        let isExists = false;
        const foundUser = await this.users.findOne({
            "account.email": input.email.toLowerCase(),
            isArchived: false
        });
        if (foundUser) {
            isExists = true;
        }
        return {
            isExists
        };
    }
    async signUpUser(input) {
        const foundUser = await this.users.findOne({
            "account.email": input.email.toLowerCase(),
            isArchived: false
        });
        if (foundUser) throw new _errormiddleware.HttpException(409, _errors.errors.EMAIL_ALREADY_EXISTS);
        const user = await this.users.create({
            account: {
                role: "STANDARD",
                activationStatus: "ACTIVE",
                isVerified: false,
                verificationCode: _crypto.default.randomBytes(32).toString("hex"),
                verificationExpireAt: new Date(new Date().setHours(new Date().getHours() + _vars.vars.verificationCodeExpInHours)),
                email: input.email.toLowerCase(),
                password: (0, _bcrypt.hashSync)(input.password, 10)
            },
            profile: {
                firstName: input.firstName,
                lastName: input.lastName
            }
        });
        new _mailer.Mailer(user.account.email, {
            name: user.profile.firstName,
            url: `${_vars.vars.appLink}/auth/verify-account/${user.account.verificationCode}`
        }).sendVerifyAccount();
        return {
            success: true,
            userId: user._id
        };
    }
    async verifyUserAccount(input) {
        const foundUser = await this.users.findOne({
            "account.verificationCode": input.verificationCode,
            isArchived: false
        });
        if (!foundUser) throw new _errormiddleware.HttpException(404, _errors.errors.USER_NOT_FOUND);
        if (foundUser.account.isVerified) throw new _errormiddleware.HttpException(409, _errors.errors.ACCOUNT_ALREADY_VERIFIED);
        if (foundUser.account.verificationCode !== input.verificationCode || foundUser.account.verificationExpireAt <= new Date()) throw new _errormiddleware.HttpException(409, _errors.errors.INVALID_VERIFICATION_CODE);
        await this.users.findOneAndUpdate({
            "account.verificationCode": input.verificationCode
        }, {
            $set: {
                "account.isVerified": true,
                updatedAt: new Date()
            },
            $unset: {
                "account.verificationCode": 1,
                "account.verificationExpireAt": 1
            }
        });
        return {
            success: true
        };
    }
    async resendVerificationCodeEmail(input) {
        const foundUser = await this.users.findOne({
            "account.email": input.email.toLowerCase(),
            isArchived: false
        });
        if (!foundUser) throw new _errormiddleware.HttpException(404, _errors.errors.USER_NOT_FOUND);
        if (foundUser.account.isVerified) throw new _errormiddleware.HttpException(409, _errors.errors.ACCOUNT_ALREADY_VERIFIED);
        const updatedUser = await this.users.findOneAndUpdate({
            "account.email": input.email.toLowerCase()
        }, {
            $set: {
                "account.verificationCode": _crypto.default.randomBytes(32).toString("hex"),
                "account.verificationExpireAt": new Date(new Date().setHours(new Date().getHours() + _vars.vars.verificationCodeExpInHours)),
                updatedAt: new Date()
            }
        }, {
            new: true
        });
        new _mailer.Mailer(foundUser.account.email, {
            name: foundUser.profile.firstName,
            url: `${_vars.vars.appLink}/auth/verify-account/${updatedUser.account.verificationCode}`
        }).sendVerifyAccount();
        return {
            success: true
        };
    }
    async sendPasswordResetEmail(input) {
        const foundUser = await this.users.findOne({
            "account.email": input.email.toLowerCase(),
            isArchived: false
        });
        if (!foundUser) throw new _errormiddleware.HttpException(409, _errors.errors.EMAIL_NOT_FOUND);
        const updatedUser = await this.users.findOneAndUpdate({
            _id: foundUser._id
        }, {
            $set: {
                "account.passwordRecoveryToken": _crypto.default.randomBytes(32).toString("hex"),
                "account.passwordRecoveryExpireAt": new Date(new Date().setHours(new Date().getHours() + _vars.vars.recoveryTokenExpInHours)),
                updatedAt: new Date()
            }
        }, {
            new: true
        });
        new _mailer.Mailer(foundUser.account.email, {
            name: foundUser.profile.firstName,
            url: `${_vars.vars.appLink}/reset-password/${updatedUser.account.passwordRecoveryToken}`
        }).sendResetPassword();
        return {
            success: true
        };
    }
    async resetPassword(input) {
        const foundUser = await this.users.findOne({
            "account.passwordRecoveryToken": input.passwordRecoveryToken,
            isArchived: false
        });
        if (!foundUser || foundUser.account.passwordRecoveryExpireAt <= new Date()) throw new _errormiddleware.HttpException(409, _errors.errors.INVALID_PASSWORD_RECOVERY_TOKEN);
        await this.users.findOneAndUpdate({
            _id: foundUser._id
        }, {
            $set: {
                "account.password": (0, _bcrypt.hashSync)(input.newPassword, 10),
                "account.passwordRecoveredAt": new Date(),
                updatedAt: new Date()
            },
            $unset: {
                "account.passwordRecoveryToken": 1,
                "account.passwordRecoveryExpireAt": 1
            }
        });
        return {
            success: true
        };
    }
    async signInUser(input) {
        let lastSignIn = "";
        const foundUser = await this.users.findOne({
            "account.email": input.email.toLowerCase(),
            isArchived: false
        });
        if (!foundUser) throw new _errormiddleware.HttpException(401, _errors.errors.WRONG_CREDENTIALS);
        if (foundUser.account.activationStatus === _enums.ActivationStatus.Blocked) throw new _errormiddleware.HttpException(409, _errors.errors.ACCOUNT_HAS_BEEN_BLOCKED);
        if (!(0, _bcrypt.compareSync)(input.password, foundUser.account.password)) throw new _errormiddleware.HttpException(401, _errors.errors.WRONG_CREDENTIALS);
        let updateQuery = {
            $set: {
                "account.lastSignIn": new Date(),
                updatedAt: new Date()
            }
        };
        lastSignIn = foundUser.account.lastSignIn ? foundUser.account.lastSignIn.toDateString() : null;
        if (foundUser.account.activationStatus === _enums.ActivationStatus.Inactive) {
            updateQuery = {
                $set: {
                    "account.activationStatus": _enums.ActivationStatus.Active,
                    "account.lastSignIn": new Date(),
                    updatedAt: new Date()
                }
            };
        }
        await this.users.findOneAndUpdate({
            _id: foundUser._id
        }, updateQuery);
        return {
            success: true,
            accessToken: (0, _auth.generateAccessToken)(foundUser._id),
            lastSignIn: lastSignIn == "" ? null : lastSignIn,
            userId: foundUser._id
        };
    }
    async signOutUser(userId) {
        const foundUser = await this.users.findOne({
            _id: userId,
            isArchived: false
        });
        if (!foundUser) throw new _errormiddleware.HttpException(401, _errors.errors.WRONG_CREDENTIALS);
        await this.users.findOneAndUpdate({
            _id: foundUser._id
        }, {
            $set: {
                "account.lastSignOut": new Date(),
                updatedAt: new Date()
            }
        });
        return {
            success: true
        };
    }
    async refreshAccessToken(refreshToken) {
        if (refreshToken) {
            try {
                let decoded = (0, _jsonwebtoken.verify)(refreshToken, _vars.vars.jwtRefreshKey);
            } catch (error) {
                return {
                    success: false,
                    message: "Invalid Token"
                };
            }
        } else {
            return {
                success: false,
                message: "Invalid Token"
            };
        }
    }
    constructor(){
        _define_property(this, "users", _usermodel.userModel);
    }
};
const _default = AuthService;

//# sourceMappingURL=auth.service.js.map