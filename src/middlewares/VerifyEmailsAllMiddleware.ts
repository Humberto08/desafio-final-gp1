import { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/UserRepository";


export default async function verifyEmailsAll(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  const { url } = req;

  const user = await UserRepository.getUserByEmail(email);

  console.log(user)

  if (user) {
    return res.status(409).json({ message: `O email já existe!` });
  }

  next();
}
