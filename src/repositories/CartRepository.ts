import { Cart } from "@prisma/client";
import { prisma } from "../database/db";

// checar linha 26

class CartRepository {

    async createCart(cart: Cart): Promise<Cart | string> {

        return await prisma.cart.create({
            data: {
                products: cart.products,
                quantity: cart.quantity
            }
        });
    }

    async getCarts(): Promise<Array<Cart>> {
        return await prisma.cart.findMany();
    }

    async getCart(id: number): Promise<Cart | null> {
        return await prisma.cart.findFirst({ where: { id } })
    }

    async updateCart(id: number, products: string | null, quantity: number | null): Promise<Cart | string> {

        await prisma.category.findFirst({ where: { id } });

        return await prisma.cart.update({
            where: { id },
            data: {} // faltando dados dentro de data
        })
    }

    async deleteCart(id: number): Promise<Cart | string> {

        await prisma.cart.findFirst({ where: { id } });

        return await prisma.cart.delete({ where: { id, } })

    }
}

export default new CartRepository();