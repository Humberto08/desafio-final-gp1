import { Order } from "@prisma/client";
import OrderRepository from "../repositories/OrderRepository";

class OrderService {

    static async createOrder(order: Order): Promise<Order | string> {
        return OrderRepository.createOrder(order);
    }

}

export default OrderService;