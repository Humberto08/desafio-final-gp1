import { Order } from "@prisma/client";
import OrderRepository from "../repositories/OrderRepository";

class OrderService {

    async createOrder(order: Order): Promise<Order | string> {
        return OrderRepository.createOrder(order)
    }

    async getOrders(): Promise<Array<Order>> {
        return OrderRepository.getOrders();
    }

    async getOrder(id: number): Promise<Order | null> {
        return OrderRepository.getOrder(id);
    }

}

export default new OrderService();