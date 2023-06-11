import { Cart, CartProduct, CartStatus } from "@prisma/client";
import CartRepository from "../repositories/CartRepository";

class CartService {

    async addToCart(user_id: number, product_id: number, product_quantity: number): Promise<CartProduct | string | boolean | undefined> {
        return await CartRepository.addToCart(user_id, product_id, product_quantity)
    }

    async removeProductFromCart(product_id: number) {
        return await CartRepository.removeProductFromCart(product_id);
    }

    async getCarts(): Promise<Array<Cart>> {
        return await CartRepository.getCarts();
    }

    async getUserCart(user_id: number): Promise<Array<Cart>> {
        return await CartRepository.getUserCart(user_id);
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