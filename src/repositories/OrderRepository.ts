import { Cart, Order, OrderStatus } from "@prisma/client";
import { prisma } from "../database/db";

class OrderRepository {

    async createOrder(cart_id: number): Promise<Order | string | boolean | undefined> {

        const getUserCart = await prisma.order.findMany({
            where: {
                cart_id,
                order_status: "Placed"
            }
        })

        const userCart = await prisma.cart.findFirst({
            where: { id: cart_id }
        })

        if (!userCart) {
            return false
        }

        let order: Order | Cart | null = null;

        let total = getUserCart[0].total_value;

        if (getUserCart.length > 0) {

            order = getUserCart[0];

        } else {

            order = await prisma.order.create({
                data: {
                    user_id: cart_id,
                    cart_id: cart_id,
                    order_status: "Placed",
                    total_value: total
                }
            })
        }

        if (!order) {
            return false
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                total_value: getUserCart[0].total_value,
            }
        })

        return await prisma.order.create({
            data: {
                user_id: cart_id,
                cart_id: cart_id,
                total_value: getUserCart[0].total_value
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