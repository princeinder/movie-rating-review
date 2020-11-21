import * as mongoose from "mongoose";
import MovieModel from "../models/movie.model";
import UserModel from "../models/user.model";
const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Comment cannot be empty!"],
  },
  rating: {
    type: Number,
    min: [1, "Rating cannot be below 1.0"],
    max: [5, "Rating cannot be above 5.0"],
    required: [true, "Rating cannot be empty!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User is required"],
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
    required: [true, "Movie is required"],
  },
});
reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (movieId: String) {
  const stats = await this.aggregate([
    {
      $match: { movie: movieId },
    },
    {
      $group: {
        _id: "$movie",
        numberOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await MovieModel.findByIdAndUpdate(movieId, {
    ratingsQty: stats[0].numberOfRating,
    ratingsAvg: stats[0].avgRating,
  });
};

reviewSchema.post("save", async function (this: any) {
  this.constructor.calcAverageRatings(this.movie);
});
reviewSchema.pre(/^find/, function (this: any, next) {
  this.populate({
    path: "user",
    select: "username email",
  });
  next();
});

reviewSchema.pre("save", function (this: any, next) {
  MovieModel.findById(this.movie).then((movie) => {
    if (!movie) next(new Error(`movie with ${this.movie} not found`));
    UserModel.findById(this.user).then((user) => {
      if (!user) next(new Error(`user with ${this.user} not found`));
      next();
    });
  });
});

const ReviewModel = mongoose.model("review", reviewSchema);
export default ReviewModel;
