import { Request, Response, NextFunction } from "express";

export default function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  
  const usuario = email.substring(0, email.indexOf("@"));
  const dominio = email.substring(email.indexOf("@") + 1, email.length);

  if (typeof email !== "string") {
    return res.status(400).json({ message: "O campo email deve ser uma string" });
  }

  if (
    email.length > 70 ||
    usuario.length < 1 ||
    dominio.length < 3 ||
    usuario.search("@") !== -1 ||
    dominio.search("@") !== -1 ||
    usuario.search(" ") !== -1 ||
    dominio.search(" ") !== -1 ||
    dominio.search(".") === -1 ||
    dominio.indexOf(".") < 1 ||
    dominio.lastIndexOf(".") >= dominio.length - 1
  ) {
    return res.status(400).json({ message: "O campo email deve ter até 70 caracteres" });
  }

  next();
}
