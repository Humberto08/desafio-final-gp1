import { NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/db";

// se der erro, mudar id por user.id
interface DecodedToken {
    [x: string]: any;
    id: string;
}



export function authMidleware(permissions?: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token não encontrado" });
        }

        const token = authHeader.substring(7);

        try {
            const JWT_SECRET = process.env.JWT_SECRET;

            if (JWT_SECRET === undefined) {
                throw new Error("Chave secreta não encontrada");
            }
            const decodedToken = verify(token, JWT_SECRET) as DecodedToken;

            req.user = {id: decodedToken.id};

            if (permissions) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: decodedToken.id,
                    },
                    // include: {
                    //     userAccess: {
                    //         select: {
                    //             Access:{
                    //                 select:{
                    //                     name: true
                    //                 }
                    //             }
                    //         }
                    //     }
                    // }
                });
                const userPermissions = user?.id.map((na) => na.Acess?.name) ?? [];
                const hasPermission = permissions.some((p) => userPermissions.includes(p));

                if (!hasPermission) {
                    return res.status(403).json({ error: "Nao autorizado" });
                }
            }

            return next();

        } catch (error) {
            
        }
    }
};