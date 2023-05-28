import { Order, OrderStatus } from "@prisma/client";
import OrderRepository from "../repositories/OrderRepository";

class OrderService {

    async createOrder(email: string, cart_id: number, buyer_id: number, total_value: number): Promise<Order | string | boolean | undefined> {
        return await OrderRepository.createOrder(email, cart_id, buyer_id, total_value)
    }

    async getOrders(): Promise<Array<Order | boolean>> {
        return await OrderRepository.getOrders();
    }

    async getOrder(id: number): Promise<Order | null> {
        return await OrderRepository.getOrder(id);
    }

    async updateOrderStatus(id: number, order_status: OrderStatus | null) {
        return await OrderRepository.updateOrderStatus(id, order_status)
    }

    async deleteOrder(id: number): Promise<Order | string> {
        return OrderRepository.deleteOrder(id);
    }
}

export default new OrderService();