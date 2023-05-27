import { Order, OrderStatus } from "@prisma/client";
import { prisma } from "../database/db";

class OrderRepository {

    async createOrder(email: string, cart_id: number, buyer_id: number, total_value: number): Promise<Order | string | boolean | undefined> {

        await prisma.order.findMany({
            where: {
                buyer_id,
                order_status: "Placed"
            }
        })

        const getUserCart = await prisma.cart.findFirst({
            where: { id: cart_id }
        })

        if (!getUserCart) {
            return false
        }

        const order = await prisma.order.create({
            data: {
                cart_id,
                buyer_id,
                order_status: "Placed",
                total_value: total_value
            }
        })

        if (!order) {
            return false
        }

        return await prisma.order.create({
            data: {
                cart_id: cart_id,
                buyer_id: buyer_id,
                total_value: total_value
            }
        })
    }

    async getOrders(): Promise<Array<Order>> {
        return await prisma.order.findMany();
    }

    async getOrder(id: number): Promise<Order | null> {
        return await prisma.order.findFirst({ where: { id } })
    }

    async updateOrderStatus(id: number, order_status: OrderStatus | null): Promise<Order | string> {

        const findById = await prisma.order.findFirst({ where: { id } });

        if (!findById) return "✖️ Pedido não encontrado para o ID informado!";

        return await prisma.order.update({
            where: { id },
            data: { order_status: order_status || findById.order_status }
        })
    }

    async deleteOrder(id: number): Promise<Order | string> {

        const findById = await prisma.order.findFirst({ where: { id } });

        if (!findById) return "✖️ Pedido não encontrado para o ID informado!";

        return await prisma.order.delete({ where: { id } })
    }
}

export default new OrderRepository();