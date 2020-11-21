"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var mongoose_unique_validator_1 = require("mongoose-unique-validator");
var movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter you title"],
        minlength: [5, "Minimun title length 5 characters"],
        unique: true
    },
    ratingsQty: {
        type: Number
    },
    ratingsAvg: {
        type: Number
    }
});
movieSchema.plugin(mongoose_unique_validator_1["default"], {
    message: "Error, expected {PATH} to be unique."
});
var MovieModel = mongoose.model("movie", movieSchema);
movieSchema.virtual("reviews", {
    ref: "review",
    foreignField: "movie",
    localField: "_id"
});
exports["default"] = MovieModel;
