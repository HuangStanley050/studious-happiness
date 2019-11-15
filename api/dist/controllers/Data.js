"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var DataController = /** @class */ (function () {
    function DataController() {
        var _this = this;
        this.path = "/data";
        this.router = express_1.default.Router();
        this.initializeRoutes = function () {
            _this.router.get("" + _this.path, _this.rootRoute);
        };
        this.rootRoute = function (req, res) {
            res.send("Data route");
        };
        this.initializeRoutes();
    }
    return DataController;
}());
exports.default = DataController;
