import { Request, Response } from "express";
import OrderService from "../services/OrderService";
import CartService from "../services/CartService";

class OrderController {

    static async create(req: Request, res: Response) {

        try {

            const { cart_id, user_id } = req.body;

            const cart = await CartService.getCart(cart_id);

            if (!cart_id) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Sua anta, é obrigatório informar o id do carrinho!" })
            }

            if (!cart) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Sua anta, esse carrinho não existe!" })
            }

            const order = await OrderService.createOrder(Number(cart_id), Number(user_id));

            if (!order) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Sua anta, deu ruim na criação do pedido!" })
            }

            return res
                .status(200)
                .json({ success: true, message: "✔️ Peido aberto!" })

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

            return res.status(200).json({
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

            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do pedido!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const order = await OrderService.getOrder(Number(id));

            if (!order) return res
                .status(500)
                .json({ success: false, message: "✖️ Pedido não encontrado para o ID informado!" });

            return res.json({
                success: true,
                result: order
            });

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }

    static async updateOrderStatus(req: Request, res: Response) {

        try {

            const { order_status } = req.body;
            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do carrinho!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const order = await CartService.updateCartStatus(Number(id), order_status)

            if (!order) return res
                .status(404)
                .json({ success: false, message: "✖️ Status de pedido não atualizado!" })

            return res.json({
                success: true,
                message: "✔️ Status de pedido atualizado!",
                result: order
            });

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }

    static async delete(req: Request, res: Response) {

        try {

            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do pedido!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const order = await OrderService.deleteOrder(Number(id));

            if (typeof order === 'string') return res
                .status(404)
                .json({ success: false, message: order });

            return res.json({
                success: true,
                message: "✔️ Pedido excluído com sucesso!"
            });

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }
}

export default OrderController;