"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    checkAuth: function (req, res, next) {
        //check if request header has a token field if not throw error to next
        var token;
        var decodedToken;
        var jwtSecret = process.env.JWT_SECRET;
        if (!req.headers.authorization) {
            var error = { message: "No token attached", status: 401 };
            return next(error);
        }
        token = req.headers.authorization.split(" ")[1];
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, jwtSecret);
        }
        catch (err) {
            console.log("Token verify failed");
            var error = { message: "Unable to decode token", status: 401 };
            return next(error);
        }
        if (!decodedToken) {
            var error = { message: "Unable to decode token", status: 401 };
            return next(error);
        }
        var userId = decodedToken.id;
        req.userId = userId;
        return next();
    }
};
