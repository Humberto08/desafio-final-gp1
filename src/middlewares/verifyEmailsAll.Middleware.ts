import { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/UserRepository";
//import { findPacienteByEmail } from "../repositories/paciente.repository";
//import { findOnePsiByEmail } from "../repositories/psicologo.repository";

export default async function verifyEmailsAll(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  const { url } = req;

  if (url === "/users") {
    const user = await UserRepository.getUserByEmail(email);

    if (user) {
      return res.status(409).json({ message: `✖️ O e-mail ${email} já existe!` });
    }
  }

  next();
}
