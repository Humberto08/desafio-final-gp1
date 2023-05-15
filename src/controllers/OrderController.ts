import { Order } from "@prisma/client";
import { Request, Response } from "express";
import OrderService from "../services/OrderService";

class OrderController {

    static async create(req: Request, res: Response) {

        try {

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async index(req: Request, res: Response) {

        try {

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async show(req: Request, res: Response) {

        try {

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async update(req: Request, res: Response) {

        try {

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async delete(req: Request, res: Response) {

        try {

        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default OrderController;