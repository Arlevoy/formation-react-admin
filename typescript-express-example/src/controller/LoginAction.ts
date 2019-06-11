import { getManager } from "typeorm";
import { Request, Response } from "express";

import { compare } from "bcrypt";

import { User } from "../entity/User";
import { sign } from "jsonwebtoken";

export const login = async (request, response) => {
  const { email, password } = request.body;

  const userRepository = getManager().getRepository(User);

  const userFound = await userRepository.find({ email });

  if (userFound) {
    const match = await compare(password, userFound[0].password);
    if (!match) {
      response.sendStatus(403);
    }
    const roles = userFound[0].isAdmin ? ["ADMIN"] : ["USER"];
    const token = sign(
      { id: userFound[0].id, email: userFound[0].email, roles },
      "SECRET",
    );
    const result = {
      token,
    };
    response.send(result);
  }
  response.sendStatus(404);
};
