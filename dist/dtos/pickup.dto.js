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
    CreatePickUpReqDto: function() {
        return CreatePickUpReqDto;
    },
    CreatePickUpResDto: function() {
        return CreatePickUpResDto;
    },
    UpdatePickupReqDto: function() {
        return UpdatePickupReqDto;
    },
    UpdatePickupResDto: function() {
        return UpdatePickupResDto;
    },
    DeletePickupResDto: function() {
        return DeletePickupResDto;
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
let CreatePickUpReqDto = class CreatePickUpReqDto {
    constructor(){
        _define_property(this, "pickup_time", void 0);
        _define_property(this, "pickup_adress", void 0);
        _define_property(this, "pickup_city", void 0);
        _define_property(this, "pickup_state", void 0);
        _define_property(this, "pickup_zipCode", void 0);
        _define_property(this, "pickup_items", void 0);
        _define_property(this, "pickup_status", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreatePickUpReqDto.prototype, "pickup_time", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], CreatePickUpReqDto.prototype, "pickup_adress", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], CreatePickUpReqDto.prototype, "pickup_city", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], CreatePickUpReqDto.prototype, "pickup_state", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    (0, _classvalidator.IsNumber)(),
    __metadata("design:type", Number)
], CreatePickUpReqDto.prototype, "pickup_zipCode", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", Array)
], CreatePickUpReqDto.prototype, "pickup_items", void 0);
__decorate([
    (0, _classvalidator.IsIn)([
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED"
    ]),
    __metadata("design:type", String)
], CreatePickUpReqDto.prototype, "pickup_status", void 0);
let CreatePickUpResDto = class CreatePickUpResDto {
    constructor(){
        _define_property(this, "success", void 0);
        _define_property(this, "createdPickUpId", void 0);
    }
};
let UpdatePickupReqDto = class UpdatePickupReqDto {
    constructor(){
        _define_property(this, "pickup_time", void 0);
        _define_property(this, "pickup_adress", void 0);
        _define_property(this, "pickup_city", void 0);
        _define_property(this, "pickup_state", void 0);
        _define_property(this, "pickup_zipCode", void 0);
        _define_property(this, "pickup_items", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UpdatePickupReqDto.prototype, "pickup_time", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdatePickupReqDto.prototype, "pickup_adress", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdatePickupReqDto.prototype, "pickup_city", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdatePickupReqDto.prototype, "pickup_state", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsNumber)(),
    __metadata("design:type", Number)
], UpdatePickupReqDto.prototype, "pickup_zipCode", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePickupReqDto.prototype, "pickup_items", void 0);
let UpdatePickupResDto = class UpdatePickupResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let DeletePickupResDto = class DeletePickupResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};

//# sourceMappingURL=pickup.dto.js.map