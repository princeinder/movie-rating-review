import express from "express";
import { MovieController } from "../controllers/movie.controller";
const route: express.Router = express.Router();
const movieController: MovieController = new MovieController();

route.post("/add", movieController.addMovie);
route.get("/get/:id", movieController.getMovie);
route.get("/get", movieController.getMovies);
route.post("/review/add", movieController.addReview);

export default route;
