import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import { connect } from "mongoose";
import morgan from "morgan";
import { vars } from "./constants/vars";
import { Routes } from "./interfaces/routes.interface";
import errorMiddleware from "./middlewares/error.middleware";
import { logger, stream } from "./utils/logger";

class App {
  public app: express.Application;

  constructor(routes: Routes[]) {
    this.app = express();

    this.app.use(express.static("public"));


    this.connectToMongoDB();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(vars.port, () => {
      logger.info(`=================================`);
      logger.info(`======== ENV: ${vars.env} ========`);
      logger.info(`🚀 App listening on the port ${vars.port}`);

    });
  }

  public getServer() {
    return this.app;
  }

  private connectToMongoDB() {
    connect(vars.mongoUri);
  }

  private initializeMiddlewares() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(
      express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
      })
    );
    this.app.use(compression());
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(morgan("dev", { stream }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;