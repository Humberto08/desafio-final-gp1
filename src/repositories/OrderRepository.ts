import { Order } from "@prisma/client";
import { prisma } from "../database/db";

class OrderRepository {

    async createOrder(order: Order): Promise<Order | string> {
        return await prisma.order.create({
            data: {
                products: order.products,
                amount: order.amount,
                address: order.address
            }
        });
    }

    async getOrder(id: number): Promise<Order | null> {
        return await prisma.order.findFirst({ where: { id } })
    }

    async updateOrder(id: number, products: string | null, amount: number | null, address: string | null): Promise<Order | string> {

        const findById = await prisma.order.findFirst({ where: { id } });

        return await prisma.order.update({
            where: { id },
            data: {
                products: products || findById.products,
                amount: amount || findById.amount,
                address: address || findById.address
            }
        })
    }

    async deleteOrder(id: number): Promise<Order | string> {

        await prisma.order.findFirst({ where: { id } });

        return await prisma.order.delete({ where: { id, } })

    }

}

export default OrderRepository;