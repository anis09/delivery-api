"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userModel", {
    enumerable: true,
    get: function() {
        return userModel;
    }
});
const _vars = require("../constants/vars");
const _mongoose = require("mongoose");
const userSchema = new _mongoose.Schema({
    account: {
        role: String,
        email: String,
        password: String,
        verificationCode: String,
        verificationExpireAt: Date,
        isVerified: String,
        activationStatus: String,
        passwordRecoveryToken: String,
        passwordRecoveryExpireAt: Date,
        passwordRecoveredAt: Date,
        lastSignIn: Date,
        lastSignOut: Date
    },
    profile: {
        firstName: String,
        lastName: String,
        phone: String,
        avatarUrl: String
    },
    isArchived: {
        type: Boolean,
        default: false
    }
}, {
    collection: "users",
    timestamps: true,
    versionKey: false
});
const db = _mongoose.connection.useDb(_vars.vars.mongoDb);
const userModel = db.model("User", userSchema);

//# sourceMappingURL=user.model.js.map