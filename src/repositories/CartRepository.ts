import { prisma } from "../database/db";
import { Cart, CartProduct, CartStatus } from "@prisma/client";

class CartRepository {

    async addToCart(user_id: number, product_id: number, product_quantity: number): Promise<CartProduct | string | boolean | undefined> {

        const searchCart = await prisma.cart.findMany({
            where: {
                user_id,
                cart_status: "Pending"
            }
        })

        const product = await prisma.product.findFirst({
            where: { id: product_id }
        })

        if (!product) {
            return false
        };

        let cart: Cart | null = null;

        let total = 0;

        if (searchCart.length > 0) {

            cart = searchCart[0];

            total = searchCart[0].total_value + (product.price * product_quantity);

        } else {

            cart = await prisma.cart.create({
                data: {
                    user_id: user_id,
                    cart_status: "Pending",
                    total_value: total,
                    cart_products: {
                        create: {
                            product: { connect: { id: product.id } },
                            product_quantity
                        }
                    }
                },
                include: {
                    cart_products: true
                },
            });

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
                cart_products: {
                    create: {
                        product: { connect: { id: product.id } },
                        product_quantity,
                        product_price: product.price
                    }
                }
            },
            include: {
                cart_products: true
            }
        })

        return await prisma.cartProduct.create({
            data: {
                cart_id: cart.id,
                product_id: product_id,
                product_quantity,
                product_price: product?.price,
            },
            include: {
                cart: true,
                product: true,
            }
        })
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
                    product_price: element.product_price,
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

    async getCarts(): Promise<Array<Cart>> {
        return await prisma.cart.findMany();
    }

    async getUserCart(user_id: number): Promise<Array<Cart>> {
        return await prisma.cart.findMany({ where: { user_id } });
    }

    async deleteCart(id: number): Promise<Cart | string> {

        const findById = await prisma.cart.findUnique({ where: { id } });

        if (!findById) return "✖️ Carrinho não encontrado para o ID informado!";

        // await prisma.cartProduct.deleteMany();
        // await prisma.cartProduct.deleteMany({ where: { id } });
        await prisma.cart.deleteMany();
        // await prisma.cartProduct.delete({ where: {} });
        // await prisma.cartProduct.delete(cart_id);
        // await prisma.cartProduct.delete({ where: { product_id: id } });

        return await prisma.cart.delete({ where: { id } })
    }
}

export default new CartRepository();