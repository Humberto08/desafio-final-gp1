import {Request, Response, NextFunction } from "express";

export default function validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    
    if (!regex.test(email)){
        return res.status(400).json({ message: "Email invalido" });
    }

    next();
}
