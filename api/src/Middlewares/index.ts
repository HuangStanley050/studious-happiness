import { Request, Response, NextFunction } from "express";
import { Error } from "../App";
import jwt from "jsonwebtoken";

declare var process: {
  env: {
    JWT_SECRET: string;
  };
};

export interface RequestCustom extends Request {
  userId: string;
}

export default {
  checkAuth: (req: RequestCustom, res: Response, next: NextFunction) => {
    //check if request header has a token field if not throw error to next
    let token: string;
    let decodedToken: any;
    const jwtSecret = process.env.JWT_SECRET;
    if (!req.headers.authorization) {
      const error: Error = { message: "No token attached", status: 401 };
      return next(error);
    }
    token = req.headers.authorization.split(" ")[1];

    try {
      decodedToken = jwt.verify(token, jwtSecret);
    } catch (err) {
      console.log("Token verify failed");
      const error: Error = { message: "Unable to decode token", status: 401 };
      return next(error);
    }
    if (!decodedToken) {
      const error: Error = { message: "Unable to decode token", status: 401 };
      return next(error);
    }
    let userId = decodedToken.id;
    req.userId = userId;
    return next();
  }
};
