import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyUserType(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] || '';

    // verify token
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({ success: false, message: 'Token inválido' });
        } else {
            const { type } = decoded as any;
            if (type !== 'admin' && type !== 'owner') {
                return res.status(400).json({ message: '✖️ Acesso exclusivo para administradores!' });
            }
            next();
        }
    });
}
