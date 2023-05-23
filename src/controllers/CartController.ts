import { Cart } from "@prisma/client";
import { Request, Response } from "express";
import CartService from "../services/CartService";
import { prisma } from "../database/db";

/*

ERRO: usar PRISMA nessa camada
PROBLEMA: não tô sabendo separar essas bagaça de camada

DÚVIDA: não entendi a lógica 'carrinho de compras' + 'fechar pedido'
    O que entendi:
    - o carrinho não precisa estar atrelado a um user mas precisa gerar um id (cart_id)
    - quando o user for pagar (order) essa order vai precisar desse cart_id
    - quando a order vier pro back com o cart_id, vai vir o token do user junto
-> e como fazer essas cabaça de passos ?

DÚVIDA: o carrinho fica salvo em banco ?

*/

// ------ //

/*

TENTATIVA DE ENTENDER A LÓGICA

const cart = []; // começa com variável cart do tipo array vazio ?

Atividades relacionadas ao carrinho (funções):
1) Adicionar ao carrinho / const addToCart (ou createCart)
    Ações de adicionar ao carrinho
    a) qual produto foi clicado? (product_id)
    b) qual o tipo? (subcategory - ver outro nome = tamanho, cor, peso, etc)
    c) qual a quantidade? (como colocar default = 1 ?)
    d) ligar produto ao preço
2) Ver carrinho / const getCart
3) Ver carrinhos / const getCarts
4) Atualizar o carrinho / const updateCart
5) Esvaziar o carrinho / const deleteCart

*/

// tentativa de criar o tipo User 
type User = {
    id: number;
    name: string;
    email: string;
    user_access: [];
    password: string;
    order_buyer: [];
    Cart: []
}

class CartController {

    static async create(req: Request, res: Response) {

        try {

            const { products, quantity } = req.body;

            // produtos que vêm do banco - acesso ao banco            
            const productsFromDatabase = await prisma.product.findMany({
                where: {
                    id: { in: products.map((product: any) => product.id) }
                },
            });

            // quantidade do produto adicionada ao carrinho
            const productQuantity = productsFromDatabase.map((product) => {
                const { id, title, price } = product;
                const quantity = products.find((prod: any) => prod.id === product.id).quantity;
                return {
                    id,
                    title,
                    price,
                    quantity
                }
            });

            // ↑↑↑ como tipar esses que tão com any ? ↑↑↑

            // quantidade de itens adicionados ao carrinho
            let total = 0;
            for (const product of productQuantity) {
                total += product.price * parseInt(product.quantity);
            };

            // essa const tá chamando a tabela order ... é isso ?
            const cart = await prisma.order.create({
                data: {
                    total_value: total,
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

            return res.json({
                success: true,
                message: "✔️ Produto adicionado ao carrinho!",
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

            const cart: Cart | string = await CartService.updateCart(Number(id), products, quantity);

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