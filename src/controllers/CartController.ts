import { Cart, CartProduct, CartStatus } from "@prisma/client";
import { Request, Response } from "express";
import CartService from "../services/CartService";

class CartController {

    static async addToCart(req: Request, res: Response) {

        const { user_id, product_id, product_quantity } = req.body;

        const addedProduct = await CartService.addToCart(product_id, user_id, product_quantity);

        if (!addedProduct) return res
            .status(404)
            .json({ success: false, message: "✖️ Produto não inserido no carrinho!" })

        return res.json({
            success: true,
            message: "✔️ Produto adicionado ao carrinho!",
            result: addedProduct
        });
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
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }

    static async updateCartProducts(req: Request, res: Response) {

        try {

            const { cart_products } = req.body;
            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do carrinho!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const cart = await CartService.updateCartProducts(Number(id), cart_products);
            if (!cart) {
                return res.status(404).json({ success: false, message: "✖️ Carrinho não encontrado!" });
            }

            return res.json({
                success: true,
                result: cart
            })

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }

    static async updateCartStatus(req: Request, res: Response) {

        try {

            const { cart_status } = req.body;
            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do carrinho!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const cart = await CartService.updateCartStatus(Number(id), cart_status)

            if (!cart) return res
                .status(404)
                .json({ success: false, message: "✖️ Status de carrinho não atualizado!" })

            return res.json({
                success: true,
                message: "✔️ Status de carrinho atualizado!",
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
                message: "✔️ Carrinho esvaziado com sucesso!"
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