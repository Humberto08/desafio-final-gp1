import { Cart } from "@prisma/client";
import { Request, Response } from "express";
import CartService from "../services/CartService";
import { prisma } from "../database/db";
import UserService from "../services/UserService";

/*

ERRO: usar PRISMA nessa camada
PROBLEMA: não tô sabendo separar essas bagaça de camada

*/

class CartController {

    static async createUserCart(req: Request, res: Response) {
        // res.send("Hello from Cart") // linha teste

        try {

            const { products, email } = req.body;

            // check se o user existe

            const userEmail = await UserService.getUser(email);

            if (!userEmail) return res
                .status(404)
                .json({ success: false, message: "✖️ E-mail não cadastrado!" })

            // check se o user já tem produtos no carrinho
            // se sim, update
            // se não, create

            let newCart = null;

            if (newCart) { // cart not null: update


            } else { // cart null: create

                newCart = { products: [], totalPrice: 0 }

                // produtos que vêm do banco - acesso ao banco  
                const productsFromDatabase = await prisma.product.findMany({
                    where: {
                        id: { in: products.map((product: any) => product.id) } // pra cada produto, dentre os mapeados, retorno um product.id - esses serão os product.ids retornados pelo comprador
                    },
                });

                // quantidade do produto adicionada ao carrinho
                const productQuantity = productsFromDatabase.map((product) => {
                    const { id, title, price } = product;
                    const quantity = products.find((prod: any) => prod.id === product.id).quantity; // pra cada prod encontrado (find), retorna um prod.id que for igual a product.id
                    return {
                        id,
                        title,
                        price,
                        quantity
                    }
                    // pra cada produto "clicado" pelo comprador, retorna: id, title, price e quantity
                });

                // cálculo do valor total dos produtos adicionados
                let total = 0;
                for (const product of productQuantity) {
                    total += product.price * parseInt(product.quantity)
                }

                // carrinho tomando forma: produtos + quantidade + valor
                const cart = await prisma.order.create({
                    data: {
                        total_value: total,
                        order_products: {
                            create: productQuantity.map((product) => ({ // pego os produtos com a quantidade e faço um map
                                Product: { connect: { id: product.id } }, // pra cada produto, retorno um Product que vai fazer uma conexão com o id do produto que o usuário escolheu pra comprar
                                quantity: product.quantity,
                            })),
                        },
                    },
                    include: {
                        order_products: true,
                    },
                });
                return res.json({
                    success: true,
                    message: "✔️ Produto adicionado ao carrinho!",
                    result: cart
                });
            }
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

            const { user_id, product_id, quantity, product_price } = req.body;
            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do carrinho!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const cart: Cart | string = await CartService.updateCart(Number(id), product_id, quantity);

            if (typeof cart === 'string') return res
                .status(404)
                .json({ success: false, message: cart });

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