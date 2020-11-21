import * as mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter you title"],
    minlength: [5, "Minimun title length 5 characters"],
    unique: true,
  },
  ratingsQty: {
    type: Number,
  },
  ratingsAvg: {
    type: Number,
  },
});

movieSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

const MovieModel = mongoose.model("movie", movieSchema);
movieSchema.virtual("reviews", {
  ref: "review",
  foreignField: "movie",
  localField: "_id",
});

export default MovieModel;
