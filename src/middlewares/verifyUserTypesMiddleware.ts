import { Request, Response, NextFunction } from 'express';

export default function verifyUserType(req: Request, res: Response, next: NextFunction) {
    const { type } = req.body;

    if (type !== 'admin' && type !== 'owner') {
        return res.status(400).json({ message: 'Ação inválida' });
    }

    next();
}
