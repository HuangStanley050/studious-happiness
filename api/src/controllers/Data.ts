import express, { Request, Response, NextFunction, IRouter } from "express";
import axios from "axios";
import Photo from "../models/Photo";
import { Controller } from "../App";
import { Error } from "../App";

declare var process: {
  env: {
    SPLASH_API_KEY: string;
  };
};
// https://api.unsplash.com/photos/random?&query=tokyo&count=2&client_id=b66dabcd8fc031f8cdbbdcd101b88f29effa08a4a232b034396faf2dd0fe24c2

class DataController implements Controller {
  public path: string = "/data";
  public router: IRouter = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router.get(`${this.path}`, this.rootRoute);
    this.router.get(`${this.path}/photos`, this.getPhotosRoute);
  };
  private rootRoute = (req: Request, res: Response) => {
    res.send("Data route");
  };
  private getPhotosRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { keywords } = req.query;
    const apiKey = process.env.SPLASH_API_KEY;
    const queryString = `https://api.unsplash.com/photos/random?&count=4&query=${keywords}&client_id=${apiKey}`;
    try {
      let result = await axios.get(queryString);

      res.json({ msg: "fetch success", result: result.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export default DataController;
