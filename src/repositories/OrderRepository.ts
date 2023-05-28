import { Order } from "@prisma/client";
import { prisma } from "../database/db";

class OrderRepository {

    // criar pedido = obrigatório carrinho (cart_id)

    async createOrder(order: Order): Promise<Order | string> {

        return await prisma.order.create({
            data: {
                buyer_id: order.buyer_id,
                total_value: order.total_value,
                cart_id: order.cart_id
                // precisa incluir order_status aqui? nope (default)
            }
        });
    }

    async getOrders(): Promise<Array<Order>> {
        return await prisma.order.findMany();
    }

    async getOrder(id: number): Promise<Order | null> {
        return await prisma.order.findFirst({ where: { id } })
    }

    async updateOrder(id: number, cart_id: number, buyer_id: number, total_value: number | null): Promise<Order | string> {

        const findById = await prisma.order.findFirst({ where: { id } });

        if (!findById) return "✖️ Pedido não encontrado para o ID informado!";

        return await prisma.order.update({
            where: { id },
            data: {
                total_value: total_value || findById?.total_value
            }
        })
    }

    async deleteOrder(id: number): Promise<Order | string> {

        const findById = await prisma.order.findFirst({ where: { id } });

        if (!findById) return "✖️ Pedido não encontrado para o ID informado!";

        return await prisma.order.delete({ where: { id } })
    }
}

export default new OrderRepository();