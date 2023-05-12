import { Order } from "@prisma/client";
import { prisma } from "../database/db";

class OrderRepository {

    static async createOrder(order: Order): Promise<Order | string> {

        return await prisma.order.create({
            data: {
                products_list: order.products_list,
                amount: order.amount,
                user_id: order.user_id,
                order_status_id: order.order_status_id
            }
        });
    }

}

export default OrderRepository;