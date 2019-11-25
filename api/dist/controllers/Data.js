"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var Photo_1 = __importDefault(require("../models/Photo"));
var User_1 = __importDefault(require("../models/User"));
var Middlewares_1 = __importDefault(require("../Middlewares"));
var DataController = /** @class */ (function () {
    function DataController() {
        var _this = this;
        this.path = "/data";
        this.router = express_1.default.Router();
        this.initializeRoutes = function () {
            _this.router
                .all(_this.path + "/*", Middlewares_1.default.checkAuth)
                .get("" + _this.path, _this.rootRoute)
                .post(_this.path + "/photos", _this.savePhotosRoute)
                .get(_this.path + "/photos", _this.getPhotosRoute);
        };
        this.rootRoute = function (req, res) {
            res.send("Data route");
        };
        this.savePhotosRoute = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, photoInfo, keyWords, photoIds, error, user, err_1, error;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userId = _a.userId, photoInfo = _a.photoInfo, keyWords = _a.keyWords;
                        photoIds = [];
                        // get each photo from photonInfo array and save userId
                        //save each photoId from the data base into user's model array of photos
                        try {
                            photoInfo.map(function (photo) { return __awaiter(_this, void 0, void 0, function () {
                                var newPhoto, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            newPhoto = new Photo_1.default({
                                                user: userId,
                                                unSplashId: photo.photoId,
                                                pictureUrl: photo.photoUrl
                                            });
                                            return [4 /*yield*/, newPhoto.save()];
                                        case 1:
                                            result = _a.sent();
                                            photoIds.push(result._id);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        catch (err) {
                            error = { message: "Unable to save photos", status: 500 };
                            return [2 /*return*/, next(error)];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, User_1.default.findOne({ _id: userId })];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            throw new Error();
                        }
                        if (!(user !== null)) return [3 /*break*/, 4];
                        user.keyWords.push(keyWords);
                        user.photos = __spread(user.photos, photoIds);
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _b.sent();
                        res.send("op completed");
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        console.log(err_1);
                        error = {
                            message: "Unable to save photos to user model",
                            status: 500
                        };
                        return [2 /*return*/, next(error)];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getPhotosRoute = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var keywords, userId, apiKey, currentUser, searchResults, queryString, currentUser_1, err_2, result, err_3, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keywords = req.query.keywords;
                        userId = req.userId;
                        apiKey = process.env.SPLASH_API_KEY;
                        searchResults = [];
                        queryString = "https://api.unsplash.com/photos/random?&count=4&query=" + keywords + "&client_id=" + apiKey;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, User_1.default.findOne({ _id: userId })];
                    case 2:
                        currentUser_1 = _a.sent();
                        if (!currentUser_1) return [3 /*break*/, 4];
                        //saving the keyword that user used to search for photos
                        currentUser_1.keyWords.push(keywords);
                        //console.log(searchResults);
                        return [4 /*yield*/, currentUser_1.save()];
                    case 3:
                        //console.log(searchResults);
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, axios_1.default.get(queryString)];
                    case 7:
                        result = _a.sent();
                        res.json({
                            msg: "fetch success",
                            result: result.data
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        err_3 = _a.sent();
                        console.log(err_3);
                        error = { message: "Unable to fetch photos", status: 500 };
                        return [2 /*return*/, next(error)];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    return DataController;
}());
exports.default = DataController;
