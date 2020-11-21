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
exports.__esModule = true;
var mongoose = require("mongoose");
var movie_model_1 = require("../models/movie.model");
var user_model_1 = require("../models/user.model");
var reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Comment cannot be empty!"]
    },
    rating: {
        type: Number,
        min: [1, "Rating cannot be below 1.0"],
        max: [5, "Rating cannot be above 5.0"],
        required: [true, "Rating cannot be empty!"]
    },
    createdAt: {
        type: Date,
        "default": Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"]
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
        required: [true, "Movie is required"]
    }
});
reviewSchema.index({ movie: 1, user: 1 }, { unique: true });
reviewSchema.statics.calcAverageRatings = function (movieId) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.aggregate([
                        {
                            $match: { movie: movieId }
                        },
                        {
                            $group: {
                                _id: "$movie",
                                numberOfRating: { $sum: 1 },
                                avgRating: { $avg: "$rating" }
                            }
                        },
                    ])];
                case 1:
                    stats = _a.sent();
                    return [4 /*yield*/, movie_model_1["default"].findByIdAndUpdate(movieId, {
                            ratingsQty: stats[0].numberOfRating,
                            ratingsAvg: stats[0].avgRating
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
reviewSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            this.constructor.calcAverageRatings(this.movie);
            return [2 /*return*/];
        });
    });
});
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "username email"
    });
    next();
});
reviewSchema.pre("save", function (next) {
    var _this = this;
    movie_model_1["default"].findById(this.movie).then(function (movie) {
        if (!movie)
            next(new Error("movie with " + _this.movie + " not found"));
        user_model_1["default"].findById(_this.user).then(function (user) {
            if (!user)
                next(new Error("user with " + _this.user + " not found"));
            next();
        });
    });
});
var ReviewModel = mongoose.model("review", reviewSchema);
exports["default"] = ReviewModel;
