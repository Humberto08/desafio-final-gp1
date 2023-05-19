import { Order } from "@prisma/client";
import { Request, Response } from "express";
import OrderService from "../services/OrderService";
import { prisma } from "../database/db";

class OrderController {

    static async create(req: Request, res: Response) {

        try {

            const { products } = req.body;
            const { id } = req.body;

            const productsFromDatabase = await prisma.product.findMany({
                where: {
                    id: { in: products.map((product: any) => product.id) }
                },
            });

            const productQuantity = productsFromDatabase.map((product) => {
                const { id, title, price } = product;
                const quantity = products.find((p: any) => p.id === product.id).quantity;
                return {
                    id,
                    title,
                    price,
                    quantity,
                }
            });

            // return res.json(productQuantity) 
            // ↑ até aqui, ele me retorna todos os campos (id, title, price, quantity), mas o preço é o preço da unidade, eu quero o valor total

            let total = 0;
            for (const product of productQuantity) {
                total += product.price * parseInt(product.quantity);
            };

            // return res.json(total) 
            // ↑ aqui ele me retorna só o valor total, mas ainda quero tudo junto

            // parte que vai mostrar no console os dados do pedido: produto, quantidade e valor total
            // não tá funfando
            // se ficar comentada, recebe a mensagem de compra realizada com sucesso / se descomentar, dá erro
            const order = await prisma.order.create({
                data: {
                    total_value: total,
                    // Buyer: { connect: { id } }, // Comentei essa linha e deu certo! Mas resultou numa puta bagunça
                    order_products: {
                        create: productQuantity.map((product) => ({
                            Product: { connect: { id: product.id } },
                            quantity: product.quantity,
                        })),
                    },
                },
                include: {
                    order_products: true,
                },
            });

            productQuantity.map(async (product) => {
                await prisma.product.updateMany({
                    where: { id: product.id },
                    data: {
                        amount: {
                            decrement: parseInt(product.quantity),
                        },
                    },
                });
            });

            return res
                .status(201)
                .json({ order, message: "✔️ Compra realizada com sucesso!" })

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }

    static async index(req: Request, res: Response) {

        try {

            const orders = await OrderService.getOrders();

            return res.json({
                success: true,
                result: orders
            })

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, Tente novamente!" });
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