import { Cart } from "@prisma/client";
import CartRepository from "../repositories/CartRepository";

class CartService {

    async createCart(cart: Cart): Promise<Cart | string> {
        return CartRepository.createCart(cart);
    }

    async getCarts(): Promise<Array<Cart>> {
        return CartRepository.getCarts();
    }

    async getCart(id: number): Promise<Cart | null> {
        return CartRepository.getCart(id);
    }

    async updateCart(id: number, product: string | null, quantity: number | null): Promise<Cart | string> {
        return CartRepository.updateCart(id, product, quantity);
    }

    async deleteCart(id: number): Promise<Cart | string> {
        return CartRepository.deleteCart(id);
    }
}

export default new CartService();