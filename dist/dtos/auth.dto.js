"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    SendPasswordResetEmailReqDto: function() {
        return SendPasswordResetEmailReqDto;
    },
    SendPasswordResetEmailResDto: function() {
        return SendPasswordResetEmailResDto;
    },
    ResetPasswordReqDto: function() {
        return ResetPasswordReqDto;
    },
    ResetPasswordResDto: function() {
        return ResetPasswordResDto;
    },
    SignInUserReqDto: function() {
        return SignInUserReqDto;
    },
    SignInUserResDto: function() {
        return SignInUserResDto;
    },
    SignOutUserResDto: function() {
        return SignOutUserResDto;
    },
    SignUpUserReqDto: function() {
        return SignUpUserReqDto;
    },
    SignUpUserResDto: function() {
        return SignUpUserResDto;
    },
    VerifyUserAccountReqDto: function() {
        return VerifyUserAccountReqDto;
    },
    CheckEmailReqDto: function() {
        return CheckEmailReqDto;
    },
    CheckEmailResDto: function() {
        return CheckEmailResDto;
    },
    ResendVerificationCodeEmailReqDto: function() {
        return ResendVerificationCodeEmailReqDto;
    },
    ResendVerificationCodeEmailResDto: function() {
        return ResendVerificationCodeEmailResDto;
    },
    VerifyUserAccountResDto: function() {
        return VerifyUserAccountResDto;
    },
    RefreshTokenReqDto: function() {
        return RefreshTokenReqDto;
    }
});
require("reflect-metadata");
const _classvalidator = require("class-validator");
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
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let SendPasswordResetEmailReqDto = class SendPasswordResetEmailReqDto {
    constructor(){
        _define_property(this, "email", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    (0, _classvalidator.IsEmail)(),
    __metadata("design:type", String)
], SendPasswordResetEmailReqDto.prototype, "email", void 0);
let SendPasswordResetEmailResDto = class SendPasswordResetEmailResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let ResetPasswordReqDto = class ResetPasswordReqDto {
    constructor(){
        _define_property(this, "passwordRecoveryToken", void 0);
        _define_property(this, "newPassword", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], ResetPasswordReqDto.prototype, "passwordRecoveryToken", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], ResetPasswordReqDto.prototype, "newPassword", void 0);
let ResetPasswordResDto = class ResetPasswordResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let SignInUserReqDto = class SignInUserReqDto {
    constructor(){
        _define_property(this, "email", void 0);
        _define_property(this, "password", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    (0, _classvalidator.IsEmail)(),
    __metadata("design:type", String)
], SignInUserReqDto.prototype, "email", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], SignInUserReqDto.prototype, "password", void 0);
let SignInUserResDto = class SignInUserResDto {
    constructor(){
        _define_property(this, "success", void 0);
        _define_property(this, "accessToken", void 0);
        _define_property(this, "lastSignIn", void 0);
        _define_property(this, "userId", void 0);
    }
};
let SignOutUserResDto = class SignOutUserResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let SignUpUserReqDto = class SignUpUserReqDto {
    constructor(){
        _define_property(this, "email", void 0);
        _define_property(this, "password", void 0);
        _define_property(this, "firstName", void 0);
        _define_property(this, "lastName", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    (0, _classvalidator.IsEmail)(),
    __metadata("design:type", String)
], SignUpUserReqDto.prototype, "email", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], SignUpUserReqDto.prototype, "password", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], SignUpUserReqDto.prototype, "firstName", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], SignUpUserReqDto.prototype, "lastName", void 0);
let SignUpUserResDto = class SignUpUserResDto {
    constructor(){
        _define_property(this, "success", void 0);
        _define_property(this, "userId", void 0);
    }
};
let VerifyUserAccountReqDto = class VerifyUserAccountReqDto {
    constructor(){
        _define_property(this, "verificationCode", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], VerifyUserAccountReqDto.prototype, "verificationCode", void 0);
let CheckEmailReqDto = class CheckEmailReqDto {
    constructor(){
        _define_property(this, "email", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    (0, _classvalidator.IsEmail)(),
    __metadata("design:type", String)
], CheckEmailReqDto.prototype, "email", void 0);
let CheckEmailResDto = class CheckEmailResDto {
    constructor(){
        _define_property(this, "isExists", void 0);
    }
};
let ResendVerificationCodeEmailReqDto = class ResendVerificationCodeEmailReqDto {
    constructor(){
        _define_property(this, "email", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    (0, _classvalidator.IsEmail)(),
    __metadata("design:type", String)
], ResendVerificationCodeEmailReqDto.prototype, "email", void 0);
let ResendVerificationCodeEmailResDto = class ResendVerificationCodeEmailResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let VerifyUserAccountResDto = class VerifyUserAccountResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let RefreshTokenReqDto = class RefreshTokenReqDto {
    constructor(){
        _define_property(this, "refreshToken", void 0);
    }
};

//# sourceMappingURL=auth.dto.js.map