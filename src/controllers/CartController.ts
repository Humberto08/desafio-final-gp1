import { Cart, CartProduct, CartStatus } from "@prisma/client";
import { Request, Response } from "express";
import CartService from "../services/CartService";
import { prisma } from "../database/db";
import UserService from "../services/UserService";

class CartController {

    static async addToCart(req: Request, res: Response) {

        const { user_id, product_id, product_quantity } = req.body;

        const addedProduct = await CartService.addToCart(product_id, user_id, product_quantity);

        // validações

        if (!addedProduct) return res
            .status(404)
            .json({ success: false, message: "✖️ Produto não inserido no carrinho!" })

        return res.json({
            success: true,
            message: "✔️ Produto adicionado ao carrinho!",
            result: addedProduct
        });
    }

    static async create(req: Request, res: Response) {
        // res.send("Hello from Cart") // linha teste

        try {

            const { products, email } = req.body;

            // check se o user existe

            const userEmail = await UserService.getUser(email);

            if (!userEmail) return res
                .status(404)
                .json({ success: false, message: "✖️ E-mail não cadastrado!" })

            // check se já existe carrinho pra esse user
            // se sim, update
            // se não, create

            let newCart = null;

            if (newCart) { // cart not null: update

                // direcionar para rota update ?

            } else { // cart null: create

                newCart = { products: [], totalPrice: 0 }

                // produtos que vêm do banco - acesso ao banco (estoque)
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
                newCart = await prisma.cart.create({ // 'newCart' em vez de 'const cart' ? (linha 43)
                    data: {
                        total_value: total,
                        cart_products: {
                            create: productQuantity.map((product) => ({ // pego os produtos com a quantidade e faço um map
                                product: { connect: { id: product.id } }, // pra cada produto, retorno um Product que vai fazer uma conexão com o id do produto que o usuário escolheu pra comprar
                                product_quantity: product.quantity,
                                product_price: product.price
                            })),
                        },
                    },
                    include: {
                        cart_products: true,
                    },
                });

                return res.json({
                    success: true,
                    message: "✔️ Carrinho aberto!",
                    result: newCart
                });

                // e agora papai... como passar pra rota update ?

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
                .json({ success: false, message: "✖️ Produto não inserido no carrinho!" })

            return res.json({
                success: true,
                message: "✔️ Produto adicionado ao carrinho!",
                result: cart
            });

            // const cart_status = 'Pending';

            // if (cart_status === ) {
            //     console.log('Carrinho aberto.')
            // } else if ('') {
            //     console.log('Compra cancelada.')
            // } else {
            //     console.log('Compra fechada.')
            // }

            // cart_status = 'Paid';

            // if (cart_status == 'Pending') {


            // } else if (cart_status == 'Cancelled') {
            //     return res.json({
            //         success: false,
            //         message: "✖️ Ops, tente novamente!",
            //         result: newCart
            //     });

            // } else {
            //     return res.json({
            //         success: true,
            //         message: "✔️ Pedido realizado com sucesso!",
            //         result: newCart // como ir daqui pra Order ? // aliás .. como ir daqui pra Terra de volta?
            //     })
            // }

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