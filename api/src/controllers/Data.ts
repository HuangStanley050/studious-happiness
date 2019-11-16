import express, { Request, Response, NextFunction, IRouter } from "express";
import axios from "axios";
import Photo from "../models/Photo";
import User from "../models/User";
import { Controller } from "../App";
import { Error } from "../App";
import MiddleWare from "../Middlewares";

declare var process: {
  env: {
    SPLASH_API_KEY: string;
  };
};

interface PhotoData {
  photoId: string;
  photoUrl: string;
}

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
      .post(`${this.path}/photos`, this.savePhotosRoute)
      .get(`${this.path}/photos`, this.getPhotosRoute);
  };
  private rootRoute = (req: Request, res: Response) => {
    res.send("Data route");
  };
  private savePhotosRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //photoInfo is an array that contain objects that would have photoId and photoUrl
    // [{photoId:1,photoUrl:"www.stock.com"},{photoId:2,photoUrl:"www.stock2.com"}]
    const { userId, photoInfo, keyWords } = req.body;
    let photoIds: String[] = [];
    // get each photo from photonInfo array and save userId
    //save each photoId from the data base into user's model array of photos
    try {
      photoInfo.map(async (photo: PhotoData) => {
        let newPhoto = new Photo({
          user: userId,
          unSplashId: photo.photoId,
          pictureUrl: photo.photoUrl
        });
        let result = await newPhoto.save();
        photoIds.push(result.id);
      });

      let user = await User.find({ id: userId });
      user.keyWords = photoIds;

      res.send("photo save route");
    } catch (err) {
      console.log(err);
    }
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
