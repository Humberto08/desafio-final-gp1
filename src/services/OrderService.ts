import { Order } from "@prisma/client";
import OrderRepository from "../repositories/OrderRepository";

class OrderService {

    async createOrder(order: Order): Promise<Order | string> {
        return OrderRepository.createOrder(order)
    }

    async getOrders(): Promise<Array<Order | boolean>> {
        return OrderRepository.getOrders();
    }

    async getOrder(id: number): Promise<Order | null> {
        return OrderRepository.getOrder(id);
    }

    async updateOrder(id: number, cart_id: number, buyer_id: number, total_value: number | null): Promise<Order | string> {
        return OrderRepository.updateOrder(id, cart_id, buyer_id, total_value);
    }

    async deleteOrder(id: number): Promise<Order | string> {
        return OrderRepository.deleteOrder(id);
    }
}

export default new OrderService();