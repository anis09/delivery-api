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
const _compression = _interop_require_default(require("compression"));
const _cookieparser = _interop_require_default(require("cookie-parser"));
const _cors = _interop_require_default(require("cors"));
const _express = _interop_require_default(require("express"));
const _helmet = _interop_require_default(require("helmet"));
const _hpp = _interop_require_default(require("hpp"));
const _mongoose = require("mongoose");
const _morgan = _interop_require_default(require("morgan"));
const _vars = require("./constants/vars");
const _errormiddleware = _interop_require_default(require("./middlewares/error.middleware"));
const _logger = require("./utils/logger");
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
let App = class App {
    listen() {
        this.app.listen(_vars.vars.port, ()=>{
            _logger.logger.info(`=================================`);
            _logger.logger.info(`======== ENV: ${_vars.vars.env} ========`);
            _logger.logger.info(`🚀 App listening on the port ${_vars.vars.port}`);
        });
    }
    getServer() {
        return this.app;
    }
    connectToMongoDB() {
        (0, _mongoose.connect)(_vars.vars.mongoUri);
    }
    initializeMiddlewares() {
        this.app.use(_express.default.json({
            limit: "50mb"
        }));
        this.app.use(_express.default.urlencoded({
            limit: "50mb",
            extended: true,
            parameterLimit: 50000
        }));
        this.app.use((0, _compression.default)());
        this.app.use((0, _cookieparser.default)());
        this.app.use((0, _cors.default)());
        this.app.use((0, _helmet.default)());
        this.app.use((0, _hpp.default)());
        this.app.use((0, _morgan.default)("dev", {
            stream: _logger.stream
        }));
    }
    initializeRoutes(routes) {
        routes.forEach((route)=>{
            this.app.use("/", route.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(_errormiddleware.default);
    }
    constructor(routes){
        _define_property(this, "app", void 0);
        this.app = (0, _express.default)();
        this.app.use(_express.default.static("public"));
        this.connectToMongoDB();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }
};
const _default = App;

//# sourceMappingURL=app.js.map