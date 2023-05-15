import { Cart } from "@prisma/client";
import { Request, Response } from "express";
import CartService from "../services/CartService";

class CartController {

    static async create(req: Request, res: Response) {

        try {

            const { products, quantity } = req.body;

            if (!products || !quantity) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa informar todos os campos necessários para iniciar um Carrinho de Compras!" })
            }

            const cart: Cart | String = await CartService.createCart({
                products,
                quantity
            } as Cart);

            if (typeof cart === 'string') return res
                .status(500)
                .json({ success: false, message: cart });

            return res.json({
                success: true,
                message: "✔️ Carrinho iniciado com sucesso!",
                result: cart
            })

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }

    static async index(req: Request, res: Response) {

        try {
            const carts = await CartService.getCarts();

            return res.json({
                success: true,
                result: carts
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
                .json({ success: false, message: "✖️ É obrigatório informar o ID do carrinho!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const cart = await CartService.getCart(Number(id));

            if (!cart) return res
                .status(500)
                .json({ success: false, message: "✖️ Carrinho não encontrado para o ID informado!" });

            return res.json({
                success: true,
                result: cart
            });

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async update(req: Request, res: Response) {

        try {

            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do carrinho!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const { products, quantity } = req.body;

            if (!products && !quantity) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa preencher pelo menos um campo para atualizar o Carrinho de Compras!" });
            }

            const cart: Cart | string = await CartService.updateCart(Number(id), products, quantity);

            if (typeof cart === 'string') return res
                .status(404)
                .json({ success: false, message: cart });

            return res.json({
                success: true,
                message: "✔️ Carrinho de Compras atualizada com sucesso!",
                result: cart
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
                .json({ success: false, message: "✖️ É obrigatório informar o ID do carrinho!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const cart = await CartService.deleteCart(Number(id));

            if (typeof cart === 'string') return res
                .status(404)
                .json({ success: false, message: cart });

            return res.json({
                success: true,
                message: "✔️ Carrinho de Compras esvaziado com sucesso!"
            });

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }
}

export default CartController;