import { Product } from "@prisma/client";
import { prisma } from "../database/db";

class ProductRepository {

    async createProduct(product: Product): Promise<Product | string> {

        const findDuplicateProduct = await prisma.product.count({
            where: {
                title: product.title,
                content: product.content,
                user_id: product.user_id
            }
        });

        if (findDuplicateProduct > 0) {
            return "😬 O produto não pode ser criado porque já existe um produto com as mesmas informações.";
        }

        if (product.product_status_id) {
            const findproductStatusById = await prisma.productStatus.count({ where: { id: product.product_status_id } });
            if (!findproductStatusById) return "✖️ Status de produto não existe!"
        }

        if (product.user_id) {
            const findUserById = await prisma.user.count({ where: { id: product.user_id } });
            if (!findUserById) return "✖️ Usuário informado não existe!"
        }

        return await prisma.product.create({
            data: {
                title: product.title,
                content: product.content,
                price: product.price,
                amount: product.amount,
                image: product.image,
                subcategory: product.subcategory,
                published: product.published,
                user_id: product.user_id,
                product_status_id: product.product_status_id
            },
        });
    }

    async getProducts(): Promise<Array<Product>> {
        return await prisma.product.findMany();
    }

    async getProduct(id: number): Promise<Product | null> {
        return await prisma.product.findFirst({ where: { id } })
    }

    async updateProduct(id: number, title: string | null, content: string | null, user_id: number | null, product_status_id: number | null): Promise<Product | string> {

        const findById = await prisma.product.findFirst({ where: { id } });

        if (!findById) return "✖️ Produto não encontrado para o ID informado!";

        if (product_status_id) {
            const findProductStatusById = await prisma.productStatus.count({ where: { id: product_status_id } });
            if (!findProductStatusById) return "✖️ Status de produto não existe!"
        }

        if (user_id) {
            const findUserById = await prisma.user.count({ where: { id: user_id } });
            if (!findUserById) return "✖️ Usuário informado não existe!"
        }

        return await prisma.product.update({
            where: { id, },
            data: {
                title: title || findById.title,
                content: content || findById.content,
                user_id: user_id || findById.user_id,
                product_status_id: product_status_id || findById.product_status_id
            }
        })
    }

    async deleteProduct(id: number): Promise<Product | string> {

        const findById = await prisma.product.findFirst({ where: { id } });

        if (!findById) return "✖️ Produto não encontrado para o ID informado!";

        return await prisma.product.delete({ where: { id, } })
    }
}

export default new ProductRepository();