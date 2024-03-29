import express, { Request, Response, NextFunction, IRouter } from "express";
import axios from "axios";
import mongoose from "mongoose";
import Photo from "../models/Photo";
import User from "../models/User";
import { Controller } from "../App";
import { Error } from "../App";
import { RequestCustom } from "../Middlewares";
import Middlewares from "../Middlewares";

declare var process: {
  env: {
    SPLASH_API_KEY: string;
  };
};
interface PhotoData {
  id: string;
  imageUrl: string;
}

class DataController implements Controller {
  public path: string = "/data";
  public router: IRouter = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router
      .all(`${this.path}/*`, Middlewares.checkAuth)
      .get(`${this.path}/collections`, this.getCollectionRoute)
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
    const { id, photos } = req.body;
    let photoIds: mongoose.Schema.Types.ObjectId[] = [];
    // get each photo from photonInfo array and save userId
    //save each photoId from the data base into user's model array of photos
    // console.log(id);
    // console.log(photos);
    try {
      photos.map(async (photo: PhotoData) => {
        let newPhoto = new Photo({
          user: id,
          unSplashId: photo.id,
          pictureUrl: photo.imageUrl
        });
        let result = await newPhoto.save();
        photoIds.push(result._id);
      });
    } catch (err) {
      let error = { message: "Unable to save photos", status: 500 };
      return next(error);
    }

    try {
      let user = await User.findOne({ _id: id });
      if (!user) {
        throw new Error();
      }
      if (user !== null) {
        //user.keyWords.push(keyWords);
        user.photos = [...user.photos, ...photoIds];
        await user.save();
        res.send("saving photos completed");
      }
    } catch (err) {
      console.log(err);
      let error = {
        message: "Unable to save photos to user model",
        status: 500
      };
      return next(error);
    }
  };
  private getCollectionRoute = async (
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId;
    let result = await User.findOne({ _id: userId })
      .populate("photos")
      .exec();

    res.json({
      msg: "Able to fetch collections",
      data: result !== null ? result.photos : null
    });
  };
  private getPhotosRoute = async (
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) => {
    const { keywords } = req.query;
    const userId = req.userId;
    const apiKey = process.env.SPLASH_API_KEY;
    let currentUser: typeof User;
    let searchResults: string[] = [];
    const queryString = `https://api.unsplash.com/photos/random?&count=4&query=${keywords}&client_id=${apiKey}`;
    try {
      let currentUser = await User.findOne({ _id: userId });
      if (currentUser) {
        //saving the keyword that user used to search for photos
        currentUser.keyWords.push(keywords);

        //console.log(searchResults);
        await currentUser.save();
      }
    } catch (err) {
      console.log(err);
    }
    try {
      let result = await axios.get(queryString);

      res.json({
        msg: "fetch success",
        result: result.data
      });
    } catch (err) {
      console.log(err);
      let error: Error = { message: "Unable to fetch photos", status: 500 };
      return next(error);
    }
  };
}

export default DataController;
