import { Request, Response } from "express";
import { prisma } from "../database/db"

class AccessController {

    static async create(req: Request, res: Response) {

        try {

            const { name } = req.body;

            const access = await prisma.access.create({
                data: { name },
            });

            return res.json(access);

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    };

    static async index(req: Request, res: Response) {

        try {

            const accesses = await prisma.access.findMany();

            return res.json(accesses);

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }
}


export default AccessController;