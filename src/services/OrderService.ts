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

    async updateOrder(id: number, amount: string | null, total_value: number | null, address: string | null): Promise<Order | string> {
        return OrderRepository.updateOrder(id, amount, total_value, address);
    }
    // aqui aceitou amount como string e não number... pq ?

    async deleteOrder(id: number): Promise<Order | string> {
        return OrderRepository.deleteOrder(id);
    }
}

export default new OrderService();