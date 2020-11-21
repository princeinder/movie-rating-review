import { Request, Response } from "express";
import MovieModel from "../models/movie.model";
import ReviewModel from "../models/review.model";

export class MovieController {
  public async addMovie(req: Request, res: Response) {
    try {
      let movieModel = new MovieModel(req.body);
      await movieModel.save((err, doc) =>
        err
          ? res.status(401).send(err)
          : res.send({ message: "Movie added successfully" })
      );
    } catch (err) {
      return res.status(401).send(err);
    }
  }

  public async getMovie(req: any, res: Response) {
    try {
      const { page, limit, sort } = req.query;
      await MovieModel.findById(req.params.id)
        .populate("reviews", null, null, {
          limit,
          skip: parseInt(page) * parseInt(limit) - parseInt(limit),
          sort: { rating: parseInt(sort) },
        })
        .exec(function (err, data) {
          if (err) {
            res.status(401).send(err);
          } else {
            data
              ? res.send(data)
              : res.status(401).send("Movie with id not found");
          }
        });
    } catch (err) {
      return res.status(401).send(err);
    }
  }
  public async getMovies(req: any, res: Response) {
    try {
      const { page, limit, sort } = req.query;
      await MovieModel.find({})
        .sort({ title: parseInt(sort) })
        .limit(parseInt(limit))
        .skip(parseInt(page) * parseInt(limit) - parseInt(limit))
        .populate("reviews")
        .exec(function (err, data) {
          if (err) {
            return res.status(401).send(err);
          } else {
            data ? res.send(data) : res.status(401).send("No Movies found");
          }
        });
    } catch (err) {
      return res.status(401).send(err);
    }
  }

  public async addReview(req: Request, res: Response) {
    try {
      let reviewModel = new ReviewModel(req.body);
      await reviewModel.save(function (err) {
        err
          ? res.status(401).send({ message: err.message })
          : res.send({ message: "Thanks for your review" });
      });
    } catch (err) {
      return res.status(401).send(err);
    }
  }
}
