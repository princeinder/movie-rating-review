import { Request, Response } from "express";
import UserModel from "../models/user.model";

export class UserController {
  public async signUp(req: Request, res: Response) {
    try {
      let userModel = new UserModel(req.body);
      userModel.save((err, doc) =>
        err
          ? res.status(401).send(err)
          : res.send({ message: "User registered successfully" })
      );
    } catch (err) {
      return res.status(401).send(err);
    }
  }
}
