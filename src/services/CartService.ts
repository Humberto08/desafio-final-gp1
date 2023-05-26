import { Cart, CartProduct, CartStatus } from "@prisma/client";
import CartRepository from "../repositories/CartRepository";

class CartService {

    async addToCart(product_id: number, user_id: number, product_quantity: number): Promise<CartProduct | string | boolean | undefined> {
        return await CartRepository.addToCart(product_id, user_id, product_quantity)
    }

    async createCart(cart: Cart): Promise<Cart | string> {
        return await CartRepository.createCart(cart);
    }

    async getCarts(): Promise<Array<Cart>> {
        return await CartRepository.getCarts();
    }

    async getCart(id: number): Promise<Cart | null> {
        return await CartRepository.getCart(id);
    }

    async updateCartStatus(id: number, cart_status: CartStatus | null): Promise<Cart | string> {
        return await CartRepository.updateCartStatus(id, cart_status);
    }

    async updateCartProducts(id: number, cart_products: Array<CartProduct>) {
        return await CartRepository.updateCartProducts(id, cart_products);
    }

    async deleteCart(id: number): Promise<Cart | string> {
        return await CartRepository.deleteCart(id);
    }
}

export default new CartService();