import { NextFunction, Request, Response } from 'express'
import { compare } from 'bcrypt';
import { prisma } from '../database/db';
import { sign } from 'jsonwebtoken';


class AuthController {


    static async authenticate(req: Request, res: Response, next: NextFunction) {

        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.json({ error: "Usuário não encontrado" })
        }


        const isValuePasssword = await compare(password, user.password)

        if (!isValuePasssword) {
            return res.json({ error: "Senha incorreta" })
        }

        const token = sign({ id: user.id }, "secret", { expiresIn: "1h" });


        return res.json({ user, token })


    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("jsonwebtoken");
            res.clearCookie("refreshtoken");
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
}



export default AuthController;