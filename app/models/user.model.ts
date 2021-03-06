import * as mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter you username"],
    minlength: [5, "Minimun username length 5 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Enter you email"],
    unique: [true, "Please enter a valid email"],
  },
});
userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

const UserModel = mongoose.model("user", userSchema);
userSchema.virtual("reviews", {
  ref: "review",
  foreignField: "user",
  localField: "_id",
});

export default UserModel;
