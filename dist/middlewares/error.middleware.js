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
    HttpException: function() {
        return HttpException;
    },
    default: function() {
        return _default;
    }
});
const _logger = require("../utils/logger");
const _errors = require("../constants/errors");
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
let HttpException = class HttpException extends Error {
    constructor(status, message){
        super(message);
        _define_property(this, "status", void 0);
        _define_property(this, "message", void 0);
        this.status = status;
        this.message = message;
    }
};
const errorMiddleware = (error, req, res, next)=>{
    try {
        const status = error.status || 500;
        const message = error.message || _errors.errors.SOMETHING_WENT_WRONG;
        console.log("Error", error);
        _logger.logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json({
            message: status >= 500 ? _errors.errors.SOMETHING_WENT_WRONG : message
        });
    } catch (error) {
        next(error);
    }
};
const _default = errorMiddleware;

//# sourceMappingURL=error.middleware.js.map