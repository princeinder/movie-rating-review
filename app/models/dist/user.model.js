"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var mongoose_unique_validator_1 = require("mongoose-unique-validator");
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter you username"],
        minlength: [5, "Minimun username length 5 characters"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Enter you email"],
        unique: [true, "Please enter a valid email"]
    }
});
userSchema.plugin(mongoose_unique_validator_1["default"], {
    message: "Error, expected {PATH} to be unique."
});
var UserModel = mongoose.model("user", userSchema);
userSchema.virtual("reviews", {
    ref: "review",
    foreignField: "user",
    localField: "_id"
});
exports["default"] = UserModel;
