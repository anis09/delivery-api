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
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _errors = require("../constants/errors");
const validationMiddleware = (type, value = "body", skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true)=>{
    return function(req, res, next) {
        (0, _classvalidator.validate)((0, _classtransformer.plainToClass)(type, req[value]), {
            skipMissingProperties,
            whitelist,
            forbidNonWhitelisted
        }).then((validationErrors)=>{
            if (validationErrors.length > 0) {
                console.log("Errors", validationErrors[0].children);
                res.status(400).json({
                    message: _errors.errors.INVALID_REQUEST
                });
                return;
            } else {
                next();
            }
        });
    };
};
const _default = validationMiddleware;

//# sourceMappingURL=validation.middleware.js.map