import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
const cors = require("cors");

import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import { verify } from "jsonwebtoken";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests

import { login } from "./controller/LoginAction";

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.sendStatus(403);
    next();
  }
  const token = bearerHeader.split(" ")[1];
  try {
    const verifyToken = await verify(token, "SECRET");
    req.token = verifyToken;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

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
        verifyToken,
        (request: Request, response: Response, next: Function) => {
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

    app.post(
      "/login",
      async (request: Request, response: Response, next: Function) => {
        try {
          await login(request, response);
          next();
        } catch (error) {
          next(error);
        }
      },
    );

    // run app
    app.listen(5000);

    console.log("Express application is up and running on port 5000");
  })
  .catch(error => console.log("TypeORM connection error: ", error));
