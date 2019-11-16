import express, { Request, Response, NextFunction, IRouter } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Controller } from "../App";
import { Error } from "../App";
declare var process: {
  env: {
    JWT_SECRET: string;
  };
};

const jwtSecret = process.env.JWT_SECRET;
class AuthController implements Controller {
  public path: string = "/auth";
  public router: IRouter = express.Router();

  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router.get(`${this.path}`, this.rootRoute);
    this.router.post(`${this.path}/login`, this.loginRoute);
    this.router.post(
      `${this.path}/register`,
      [
        check("name").isLength({ min: 3, max: 255 }),
        check("email")
          .isEmail()
          .withMessage("Not a valid email address"),
        check("password")
          .isLength({ min: 8 })
          .withMessage("password not long enough")
          .isAlphanumeric()
          .withMessage("password must container letters and numbers")
      ],
      this.registerRoute
    );
  };
  private rootRoute = (req: Request, res: Response) => {
    res.send("Auth route");
  };
  private loginRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        console.log(user);
        throw new Error();
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        let error = { status: 401, message: "Password doesn't match" };
        return next(error);
      }
      const payload = {
        id: user.id,
        email: user.email
      };
      const userInfo = {
        name: user.name,
        email: user.email,
        id: user.id
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
      return res.json({ login: "success", token, userInfo });
    } catch (err) {
      let error = { status: 400, message: "User doesn't exists" };
      return next(error);
    }
  };
  private registerRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    if (!errors.isEmpty()) {
      let error: Error = { status: 400, message: "Unable to register" };
      return next(error);
    }

    let result = await User.find({ email });
    console.log(result);
    if (result.length !== 0) {
      let error: Error = { status: 400, message: "User already registered" };
      return next(error);
    }
    const newUser = new User({
      name,
      password: hash,
      email
    });
    try {
      await newUser.save();
      return res.send("User have registered!!");
    } catch (err) {
      let error = { status: 500, message: "Unable to save user" };
      return next(error);
    }
  };
}

export default AuthController;
