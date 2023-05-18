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
    generateAccessToken: function() {
        return generateAccessToken;
    },
    generateRefreshToken: function() {
        return generateRefreshToken;
    }
});
const _jsonwebtoken = require("jsonwebtoken");
const _vars = require("../constants/vars");
const generateAccessToken = (userId)=>{
    return (0, _jsonwebtoken.sign)({
        uid: userId
    }, _vars.vars.jwtSecretKey, {
        expiresIn: _vars.vars.jwtExpiresIn
    });
};
const generateRefreshToken = (userId)=>{
    return (0, _jsonwebtoken.sign)({
        uid: userId
    }, _vars.vars.jwtRefreshKey, {
        expiresIn: _vars.vars.jwtRefreshKey
    });
};

//# sourceMappingURL=auth.js.map