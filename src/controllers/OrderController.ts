import { Order } from "@prisma/client";
import { Request, Response } from "express";
import OrderService from "../services/OrderService";
import { prisma } from "../database/db";

/*

ERRO: usar PRISMA nessa camada
PROBLEMA: não tô sabendo separar essas bagaça de camada

DÚVIDA: não entendi a lógica da finalização do pedido 😓
    O que acho que pode ser que seja:
    - order tem que receber o return da const addToCart (o que tem no carrinho tem que ir também pra página de pagto)
    - 
-> e como fazer essas cabaça de passos?

Atividades relacionadas ao pedido final (funções):
1) Ir para pagamento / const checkout 
2) Só depois que pagou é que recebe a mensagem "compra realizada com sucesso"
-> e como fazer esses passo from hell?

*/


class OrderController {

    static async create(req: Request, res: Response) {
        // não sei criar essa fucking rota de create 

        try {

            const { email, products } = req.body;

            const user = await prisma.user.findUnique({
                where: { email: email },
                select: { id: true }, // não lembro pq essa linha ... ?
            });

            if (!user) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa fazer login para efetuar a compra!" }) // mensagem certa ?
            }

            // produtos que vêm do carrinho
            // como trazer dados de lá pra cá?

            // acho que conseguindo trazer pra cá os produtos adicionados lá, o resto da lógica já tá certa ... ??

            // const productsFromCart = await
            // preciso da variável productQuantity

            // ↓↓↓ essa próxima função é o que vai retornar os dados no insomnia

            // const order = await prisma.order.create({
            //     data: {
            //         total_value: total,
            //         order_products: {
            //             create: productQuantity.map((product) => ({
            //                 Product: { connect: { id: product.id } },
            //                 quantity: product.quantity,
            //             })),
            //         },
            //     },
            //     include: {
            //         order_products: true,
            //     },
            // });

            // ↓↓↓ essa próxima função é a que vai remover quantidade comprada do estoque da loja

            // productQuantity.map(async (product) => {
            //     await prisma.product.updateMany({
            //         where: { id: product.id },
            //         data: {
            //             amount: {
            //                 decrement: parseInt(product.quantity),
            //             },
            //         },
            //     });
            // });

            return res
                .status(201)
                .json({ message: "✔️ Compra realizada com sucesso!" })

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
                .json({ success: false, message: "✖️ É obrigatório informar o ID do produto!" });

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

    static async update(req: Request, res: Response) {

        try {

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async delete(req: Request, res: Response) {

        try {

            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do produto!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const order = await OrderService.deleteOrder(Number(id));

            if (typeof order === 'string') return res
                .status(404)
                .json({ success: false, message: order });

            return res.json({
                success: true,
                message: "✔️ Pedido deletado com sucesso!"
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