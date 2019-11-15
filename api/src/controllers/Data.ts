import express, { Request, Response, NextFunction, IRouter } from "express";
import Photo from "../models/Photo";
import { Controller } from "../App";
import { Error } from "../App";

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
    this.router.get(`${this.path}`, this.rootRoute);
  };
  private rootRoute = (req: Request, res: Response) => {
    res.send("Data route");
  };
}

export default DataController;
