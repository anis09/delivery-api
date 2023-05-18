"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Mailer", {
    enumerable: true,
    get: function() {
        return Mailer;
    }
});
const _htmltotext = _interop_require_default(require("html-to-text"));
const _nodemailer = _interop_require_default(require("nodemailer"));
const _pug = _interop_require_default(require("pug"));
const _vars = require("../constants/vars");
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
let Mailer = class Mailer {
    newTransport() {
        return _nodemailer.default.createTransport({
            host: _vars.vars.smtpHost,
            port: _vars.vars.smtpPort,
            auth: {
                user: _vars.vars.smtpUser,
                pass: _vars.vars.smtpPass
            }
        });
    }
    async sendEmail(template, subject) {
        const html = _pug.default.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            data: this.data,
            subject
        });
        const mailOptions = {
            from: _vars.vars.smtpUser,
            to: this.to,
            subject,
            html,
            text: _htmltotext.default.fromString(html)
        };
        await this.newTransport().sendMail(mailOptions);
    }
    async sendVerifyAccount() {
        await this.sendEmail('verify-account', 'Please verify your email address');
    }
    async sendResetPassword() {
        await this.sendEmail('reset-password', 'Reset your password');
    }
    async sendResetPasswordDash() {
        await this.sendEmail('reset-password-dash', 'Reset your password');
    }
    async sendGetPasswordDash() {
        await this.sendEmail('get-password-dash', 'Get your password');
    }
    constructor(to, data){
        _define_property(this, "to", void 0);
        _define_property(this, "data", void 0);
        this.to = to;
        this.data = data;
    }
};

//# sourceMappingURL=mailer.js.map