import express from "express";
import http from "http";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {
  userErrorHandler,
  serverErrorHandler,
  unknownErrorHandler,
} from "./utils/errors/handler";
import cors from "cors";
import { AppRouter } from "./router";

export class Server {
  public app: express.Application;
  private server: http.Server;

  constructor(config: { port: string | number }) {
    this.app = express();
    this.configureMiddlewares();
    this.app.use(function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      console.log("Upcoming request");
      console.log({
        method: req.method,
        url: req.url,
        query: req.query,
        headers: req.headers,
        body: req.body,
      });
      next();
    });
    this.app.use("/api", AppRouter);
    this.initializeErrorHandler();
    this.server = http.createServer(this.app);
    this.server.listen(config.port, () =>
      console.log(
        `Server running in ${
          process.env.NODE_ENV || "development"
        } environment on port ${config.port}`
      )
    );
  }

  public close() {
    this.server.close();
  }

  private configureMiddlewares() {
    this.app.use(helmet());

    this.app.get("/isalive", function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.status(200).send("Server Is Up");
    });

    this.app.use(cors());

    this.app.use(function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type"
      );
      res.setHeader("Access-Control-Allow-Origin", "*");

      return next();
    });

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeErrorHandler() {
    this.app.use(function (
      error: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      console.error(error);
      next();
    });

    this.app.use(userErrorHandler);
    this.app.use(serverErrorHandler);
    this.app.use(unknownErrorHandler);
  }
}
