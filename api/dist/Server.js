"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var Auth_1 = __importDefault(require("./controllers/Auth"));
var mongoose_1 = __importDefault(require("mongoose"));
var authController = new Auth_1.default();
var port = process.env.PORT || 5000;
var app = new App_1.App(port, [authController]);
var dataBaseURI = "mongodb://mongo/users";
mongoose_1.default.connect(process.env.MONGODB_URI || dataBaseURI).then(function () {
    app.listen();
});
