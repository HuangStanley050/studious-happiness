"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var photoSchema = new Schema({
    unSplashId: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: String,
        required: true
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    }
});
exports.default = mongoose_1.default.model("Photo", photoSchema);
