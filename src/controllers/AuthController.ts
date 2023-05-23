import { compare } from "bcrypt";
import { prisma } from "../database/db";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";



export class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.json({ error: "⚠️ Usuário não encontrado" });
        }

        const isValuePassword = await compare(password, user.password);

        if (!isValuePassword) {
            return res.json({ error: "⚠️ Senha incorreta" });
        }

        const token = sign({ id: user.id }, "secret", {
            expiresIn: "48h",
        })

        const { id } = user;


        return res.json({user: {id, email}, token});
    
}
}

export default new AuthController();