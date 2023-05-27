import { Cart, CartProduct, CartStatus } from "@prisma/client";
import { prisma } from "../database/db";

class CartRepository {

    async addToCart(product_id: number, buyer_id: number, product_quantity: number): Promise<CartProduct | string | boolean | undefined> {

        const searchCart = await prisma.cart.findMany({
            where: {
                buyer_id,
                cart_status: "Pending"
            }
        })

        const product = await prisma.product.findFirst({
            where: { id: product_id }
        })

        if (!product) {
            return false
        }

        let cart: Cart | null = null;

        let total = 0;

        if (searchCart.length > 0) {

            cart = searchCart[0];

            total = searchCart[0].total_value + (product.price * product_quantity);

        } else {

            cart = await prisma.cart.create({
                data: {
                    buyer_id,
                    cart_status: "Pending",
                    total_value: 0
                }
            })

            total = product.price * product_quantity
        }

        if (!cart) {
            return false
        }

        await prisma.cart.update({
            where: {
                id: cart.id,
            },
            data: {
                total_value: total,
            }
        })

        return await prisma.cartProduct.create({
            data: {
                product_quantity,
                product_price: product?.price,
                cart_id: cart.id,
                product_id: product_id
            }
        })
    }

    async getCarts(): Promise<Array<Cart>> {
        return await prisma.cart.findMany();
    }

    async getCart(id: number): Promise<Cart | null> {
        return await prisma.cart.findFirst({ where: { id } })
    }

    async updateCartProducts(id: number, cart_products: Array<CartProduct>) {

        const findById = await prisma.cart.findFirst({ where: { id } });

        if (!findById) return "✖️ Carrinho não encontrado para o ID informado!";

        for (let index = 0; index < cart_products.length; index++) {
            const element = cart_products[index];

            const cart_product = await prisma.cartProduct.findFirst({
                where: { id: element.id }
            })

            if (!cart_product) continue

            return await prisma.cartProduct.update({
                where: { id: cart_product.id },
                data: {
                    product_price: element.product_price, // pq element ?
                    product_quantity: element.product_quantity
                }
            })
        }
    }

    async updateCartStatus(id: number, cart_status: CartStatus | null): Promise<Cart | string> {

        const findById = await prisma.cart.findFirst({ where: { id } });

        if (!findById) return "✖️ Carrinho não encontrado para o ID informado!";

        return await prisma.cart.update({
            where: { id },
            data: { cart_status: cart_status || findById.cart_status }
        })
    }

    async deleteCart(id: number): Promise<Cart | string> {

        await prisma.cart.findFirst({ where: { id } });

        return await prisma.cart.delete({ where: { id, } })

    }
}

export default new CartRepository();