import express, { Request, Response, NextFunction, IRouter } from "express";
import axios from "axios";
import Photo from "../models/Photo";
import { Controller } from "../App";
import { Error } from "../App";
import MiddleWare from "../Middlewares";

declare var process: {
  env: {
    SPLASH_API_KEY: string;
  };
};

class DataController implements Controller {
  public path: string = "/data";
  public router: IRouter = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router
      .all(`${this.path}/*`, MiddleWare.checkAuth)
      .get(`${this.path}`, this.rootRoute)
      .get(`${this.path}/photos`, this.getPhotosRoute);
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
      let error: Error = { message: "Unable to fetch photos", status: 500 };
      return next(error);
    }
  };
}

export default DataController;
