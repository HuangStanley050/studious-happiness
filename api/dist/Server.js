"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var Auth_1 = __importDefault(require("./controllers/Auth"));
var Data_1 = __importDefault(require("./controllers/Data"));
var mongoose_1 = __importDefault(require("mongoose"));
var authController = new Auth_1.default();
var dataController = new Data_1.default();
var port = process.env.PORT || 5000;
var app = new App_1.App(port, [authController, dataController]);
var dataBaseURI = "mongodb://mongo/dockerPhoto";
mongoose_1.default
    .connect(process.env.MONGODB_URI || dataBaseURI, { useNewUrlParser: true })
    .then(function () {
    app.listen();
});
