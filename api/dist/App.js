"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var App = /** @class */ (function () {
    function App(port, controllers) {
        var _this = this;
        this.errorHandler = function () {
            _this.app.use(function (err, req, res, next) {
                var status = err.status || 500;
                var message = err.message || "Something went wrong";
                res.status(status).send({
                    status: status,
                    message: message
                });
            });
        };
        this.initializeMiddleware = function () {
            _this.app.use(express_1.default.json());
            _this.app.use(express_1.default.urlencoded({ extended: true }));
            _this.app.use(cors_1.default());
        };
        this.intializeControllers = function (controllers) {
            controllers.forEach(function (controller) {
                _this.app.use("/api", controller.router);
            });
        };
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddleware();
        this.intializeControllers(controllers);
        this.errorHandler();
    }
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("server running on " + _this.port);
        });
    };
    return App;
}());
exports.App = App;
