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
    UserDto: function() {
        return UserDto;
    },
    DeleteCurrentUserResDto: function() {
        return DeleteCurrentUserResDto;
    },
    DeleteUserResDto: function() {
        return DeleteUserResDto;
    },
    GetCurrentUserResDto: function() {
        return GetCurrentUserResDto;
    },
    UpdateCurrentUserReqDto: function() {
        return UpdateCurrentUserReqDto;
    },
    UpdateCurrentUserResDto: function() {
        return UpdateCurrentUserResDto;
    },
    UpdatePasswordReqDto: function() {
        return UpdatePasswordReqDto;
    },
    UpdatePasswordResDto: function() {
        return UpdatePasswordResDto;
    }
});
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
let UserDto = class UserDto {
    constructor(){
        _define_property(this, "userId", void 0);
        _define_property(this, "firstName", void 0);
        _define_property(this, "lastName", void 0);
        _define_property(this, "avatarUrl", void 0);
        _define_property(this, "role", void 0);
        _define_property(this, "activationStatus", void 0);
        _define_property(this, "isVerified", void 0);
        _define_property(this, "email", void 0);
        _define_property(this, "phone", void 0);
    }
};
let DeleteCurrentUserResDto = class DeleteCurrentUserResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let DeleteUserResDto = class DeleteUserResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let GetCurrentUserResDto = class GetCurrentUserResDto {
    constructor(){
        _define_property(this, "userId", void 0);
        _define_property(this, "account", void 0);
        _define_property(this, "profile", void 0);
    }
};
let UpdateCurrentUserReqDto = class UpdateCurrentUserReqDto {
    constructor(){
        _define_property(this, "email", void 0);
        _define_property(this, "firstName", void 0);
        _define_property(this, "lastName", void 0);
        _define_property(this, "phone", void 0);
        _define_property(this, "avatarUrl", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEmail)(),
    __metadata("design:type", String)
], UpdateCurrentUserReqDto.prototype, "email", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdateCurrentUserReqDto.prototype, "firstName", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdateCurrentUserReqDto.prototype, "lastName", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdateCurrentUserReqDto.prototype, "phone", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdateCurrentUserReqDto.prototype, "avatarUrl", void 0);
let UpdateCurrentUserResDto = class UpdateCurrentUserResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let UpdatePasswordReqDto = class UpdatePasswordReqDto {
    constructor(){
        _define_property(this, "oldPassword", void 0);
        _define_property(this, "newPassword", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], UpdatePasswordReqDto.prototype, "oldPassword", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], UpdatePasswordReqDto.prototype, "newPassword", void 0);
let UpdatePasswordResDto = class UpdatePasswordResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};

//# sourceMappingURL=user.dto.js.map