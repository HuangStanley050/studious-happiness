import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

export interface Controller {
  path: string;
  router: express.IRouter;
}
export interface Error {
  status: number;
  message: string;
}

export class App {
  public app: express.Application;
  public port: number;

  constructor(port: number, controllers: Controller[]) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.intializeControllers(controllers);
    this.errorHandler();
  }
  private errorHandler = () => {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message || "Something went wrong";
        res.status(status).send({
          status,
          message
        });
      }
    );
  };

  private initializeMiddleware = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  };
  private intializeControllers = (controllers: Controller[]) => {
    controllers.forEach(controller => {
      this.app.use("/api", controller.router);
    });
  };
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`server running on ${this.port}`);
    });
  }
}
