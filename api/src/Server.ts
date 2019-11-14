import { App } from "./App";
import AuthController from "./controllers/Auth";
import mongoose from "mongoose";
const authController = new AuthController();

declare var process: {
  env: {
    PORT: number;
    MONGODB_URI: string;
  };
};

const port: number = process.env.PORT || 5000;
const app = new App(port, [authController]);
const dataBaseURI = "mongodb://mongo/users";
mongoose.connect(process.env.MONGODB_URI || dataBaseURI).then(() => {
  app.listen();
});
