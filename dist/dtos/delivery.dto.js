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
    CreateDeliveryReqDto: function() {
        return CreateDeliveryReqDto;
    },
    CreateDeliveryResDto: function() {
        return CreateDeliveryResDto;
    },
    UpdateDeliveryReqDto: function() {
        return UpdateDeliveryReqDto;
    },
    UpdateDeliveryResDto: function() {
        return UpdateDeliveryResDto;
    },
    DeleteDeliveryResDto: function() {
        return DeleteDeliveryResDto;
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
let CreateDeliveryReqDto = class CreateDeliveryReqDto {
    constructor(){
        _define_property(this, "delivery_time", void 0);
        _define_property(this, "delivery_adress", void 0);
        _define_property(this, "delivery_city", void 0);
        _define_property(this, "delivery_state", void 0);
        _define_property(this, "delivery_zipCode", void 0);
        _define_property(this, "delivery_items", void 0);
        _define_property(this, "delivery_status", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateDeliveryReqDto.prototype, "delivery_time", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], CreateDeliveryReqDto.prototype, "delivery_adress", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], CreateDeliveryReqDto.prototype, "delivery_city", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", String)
], CreateDeliveryReqDto.prototype, "delivery_state", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    (0, _classvalidator.IsNumber)(),
    __metadata("design:type", Number)
], CreateDeliveryReqDto.prototype, "delivery_zipCode", void 0);
__decorate([
    (0, _classvalidator.IsDefined)(),
    __metadata("design:type", Array)
], CreateDeliveryReqDto.prototype, "delivery_items", void 0);
__decorate([
    (0, _classvalidator.IsIn)([
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED"
    ]),
    __metadata("design:type", String)
], CreateDeliveryReqDto.prototype, "delivery_status", void 0);
let CreateDeliveryResDto = class CreateDeliveryResDto {
    constructor(){
        _define_property(this, "success", void 0);
        _define_property(this, "createddeliveryId", void 0);
    }
};
let UpdateDeliveryReqDto = class UpdateDeliveryReqDto {
    constructor(){
        _define_property(this, "delivery_time", void 0);
        _define_property(this, "delivery_adress", void 0);
        _define_property(this, "delivery_city", void 0);
        _define_property(this, "delivery_state", void 0);
        _define_property(this, "delivery_zipCode", void 0);
        _define_property(this, "delivery_items", void 0);
    }
};
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UpdateDeliveryReqDto.prototype, "delivery_time", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryReqDto.prototype, "delivery_adress", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryReqDto.prototype, "delivery_city", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryReqDto.prototype, "delivery_state", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDeliveryReqDto.prototype, "delivery_zipCode", void 0);
__decorate([
    (0, _classvalidator.IsOptional)(),
    __metadata("design:type", Array)
], UpdateDeliveryReqDto.prototype, "delivery_items", void 0);
let UpdateDeliveryResDto = class UpdateDeliveryResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};
let DeleteDeliveryResDto = class DeleteDeliveryResDto {
    constructor(){
        _define_property(this, "success", void 0);
    }
};

//# sourceMappingURL=delivery.dto.js.map