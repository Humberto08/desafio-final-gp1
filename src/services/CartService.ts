import { Cart, CartProduct, CartStatus } from "@prisma/client";
import CartRepository from "../repositories/CartRepository";

class CartService {

    async addToCart(user_id: number, product_id: number, product_quantity: number): Promise<CartProduct | string | boolean | undefined> {
        return await CartRepository.addToCart(user_id, product_id, product_quantity)
    }

    async getCartsByUser(user_id: number): Promise<Array<Cart>> {
        return await CartRepository.getCartsByUser(user_id);
    }

    async getCart(id: number): Promise<Cart | null> {
        return await CartRepository.getCart(id);
    }

    async updateCartProducts(id: number, cart_products: Array<CartProduct>) {
        return await CartRepository.updateCartProducts(id, cart_products);
    }

    async updateCartStatus(id: number, cart_status: CartStatus | null): Promise<Cart | string> {
        return await CartRepository.updateCartStatus(id, cart_status);
    }

    async deleteCart(id: number): Promise<Cart | string> {
        return await CartRepository.deleteCart(id);
    }
}

export default new CartService();