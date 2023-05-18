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
const _mongoose = _interop_require_default(require("mongoose"));
const _errors = require("../constants/errors");
const _errormiddleware = require("../middlewares/error.middleware");
const _usermodel = require("../models/user.model");
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
let UserService = class UserService {
    async getUsers() {
        const users = await this.users.aggregate([
            {
                $match: {
                    isArchived: false
                }
            },
            {
                $project: {
                    _id: 1,
                    "account.kind": 1,
                    "profile.firstName": 1,
                    "profile.lastName": 1,
                    "profile.avatarUrl": 1
                }
            }
        ]);
        return users;
    }
    async getCurrentUser(userId) {
        const foundUsers = await this.users.aggregate([
            {
                $match: {
                    _id: new _mongoose.default.Types.ObjectId(userId),
                    isArchived: false
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: {
                        $toString: "$_id"
                    },
                    account: {
                        role: "$account.role",
                        isVerified: "$account.isVerified",
                        email: "$account.email"
                    },
                    profile: "$profile"
                }
            }
        ]);
        if (!foundUsers || foundUsers.length === 0) return null;
        return foundUsers[0];
    }
    async updateCurrentUser(userId, input) {
        const foundUser = await this.users.findOne({
            _id: userId,
            isArchived: false
        });
        if (!foundUser) throw new _errormiddleware.HttpException(404, _errors.errors.USER_NOT_FOUND);
        const updatedCurrentUser = await this.users.findOneAndUpdate({
            _id: userId
        }, {
            $set: {
                "account.email": input.email ? input.email.toLowerCase() : foundUser.account.email,
                "profile.firstName": input.firstName ? input.firstName : foundUser.profile.firstName,
                "profile.lastName": input.lastName ? input.lastName : foundUser.profile.lastName,
                "profile.phone": input.phone ? input.phone : foundUser.profile.phone,
                "profile.avatarUrl": input.avatarUrl ? input.avatarUrl : foundUser.profile.avatarUrl,
                updatedAt: new Date()
            }
        }, {
            new: true
        });
        return {
            success: updatedCurrentUser != null ? true : false
        };
    }
    async updatePassword(userId, input) {
        const foundUser = await this.users.findOne({
            _id: userId,
            isArchived: false
        });
        if (!foundUser) throw new _errormiddleware.HttpException(404, _errors.errors.USER_NOT_FOUND);
        if (!(0, _bcrypt.compareSync)(input.oldPassword, foundUser.account.password)) throw new _errormiddleware.HttpException(409, _errors.errors.WRONG_PASSWORD);
        const updatedPassword = await this.users.findOneAndUpdate({
            _id: userId
        }, {
            $set: {
                "account.password": (0, _bcrypt.hashSync)(input.newPassword, 10),
                updatedAt: new Date()
            }
        }, {
            new: true
        });
        return {
            success: updatedPassword != null ? true : false
        };
    }
    async deleteCurrentUser(userId) {
        const foundUser = await this.users.findOne({
            _id: userId,
            isArchived: false
        });
        if (!foundUser) throw new _errormiddleware.HttpException(404, _errors.errors.USER_NOT_FOUND);
        const deletedCurrentUser = await this.users.findOneAndUpdate({
            _id: userId
        }, {
            $set: {
                isArchived: true,
                updatedAt: new Date()
            }
        }, {
            new: true
        });
        return {
            success: deletedCurrentUser != null ? true : false
        };
    }
    constructor(){
        _define_property(this, "users", _usermodel.userModel);
    }
};
const _default = UserService;

//# sourceMappingURL=user.service.js.map