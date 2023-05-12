import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
    console.log(` 🚀 O ip: ${req.ip} acessou a rota: ${req.originalUrl}`);
}



