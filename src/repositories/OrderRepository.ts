import { Order } from "@prisma/client";
import { prisma } from "../database/db";

class OrderRepository {

    async createOrder(order: Order): Promise<Order | string> {

        return await prisma.order.create({
            data: {
                amount: order.amount,
                total_value: order.total_value
                // como incluir o array de order_products aqui?
            }
        });
    }

    async getOrders(): Promise<Array<Order>> {
        return await prisma.order.findMany();
    }

    async getOrder(id: number): Promise<Order | null> {
        return await prisma.order.findFirst({ where: { id } })
    }

    async updateOrder(id: number, products: string | null, amount: number | null, address: string | null): Promise<Order | string> {

        const findById = await prisma.order.findFirst({ where: { id } });

        if (!findById) return "✖️ Pedido não encontrado para o ID informado!";

        return await prisma.order.update({
            where: { id },
            data: {
                amount: amount || findById?.amount
                // como editar arrays de endereço e produtos?
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