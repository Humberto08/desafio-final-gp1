import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const secret = "secret";

    jwt.verify(token as string, secret, (err: any | string, decoded: any) => {
        if (err) {
            return res.status(401).json({ err: "✖️ Precisa estar logado!" });
        }

        next();
    });
}