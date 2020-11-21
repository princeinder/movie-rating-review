import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import user from "./routes/user.route";
import movie from "./routes/movie.route";

class App {
  public app: express.Application = express();
  public mongoUrl: any = process.env.MONGOURL;

  constructor() {
    this.config();
    this.mongoSetup();
    this.initRoutes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static("public"));
    this.app.set("port", process.env.PORT || 8000);
  }

  private initRoutes(): void {
    this.app.use("/api/user", user);
    this.app.use("/api/movie", movie);
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully connected to the database");
      })
      .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
      });
  }
}

export default new App().app;
