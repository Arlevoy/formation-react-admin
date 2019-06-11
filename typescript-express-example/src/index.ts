import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
const cors = require("cors");

import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(function(req, res, next) {
      res.setHeader("Access-Control-Expose-Headers", "Content-Range");
      // res.setHeader("Content-Range", "posts 0-24/319");

      next();
    });

    // register all application routes
    AppRoutes.forEach(route => {
      app[route.method](
        route.path,
        (request: Request, response: Response, next: Function) => {
          console.log("request", request);
          response.set({
            "Access-Control-Expose-Headers": "Content-Range",
            "Content-Range": 0 - 4 / 4,
          });
          return route
            .action(request, response)
            .then(() => next)
            .catch(err => next(err));
        },
      );
    });

    // run app
    app.listen(5000);

    console.log("Express application is up and running on port 5000");
  })
  .catch(error => console.log("TypeORM connection error: ", error));
