import { getManager } from "typeorm";
import { Request, Response } from "express";
import { hash } from "bcrypt";

import { User } from "../entity/User";

export const userSaveAction = async (request: Request, response: Response) => {
  const userRepository = getManager().getRepository(User);
  const password = request.body.password;

  const hashPassword = await hash(password, 10);

  const newUser = userRepository.create({
    email: request.body.email,
    password: hashPassword,
    isAdmin: request.body.isAdmin,
  });

  const user = await userRepository.save(newUser);

  response.send(user);
};
