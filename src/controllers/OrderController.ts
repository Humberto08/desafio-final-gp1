import { Order } from "@prisma/client";
import { Request, Response } from "express";
import OrderService from "../services/OrderService";

class OrderSaleController {

    static async create(req: Request, res: Response) {

        try {

            const { user_id, products_list, amount } = req.body;

            const order: Order | string = await OrderService.createOrder({
                user_id,
                products_list,
                amount,
            } as Order);

            return res.status(201).json({
                success: true,
                message: "✔️ Pedido realizado  com sucesso!",
                result: order
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false, message: "✖️ Ops, tente novamente!"
            });
        }
    }
}

export default OrderSaleController;