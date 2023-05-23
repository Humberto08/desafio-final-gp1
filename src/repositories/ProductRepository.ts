import { Product } from "@prisma/client";
import { prisma } from "../database/db";

class ProductRepository {

    async createProduct(product: Product): Promise<Product | string> {

        const findDuplicateProduct = await prisma.product.count({
            where: {
                title: product.title,
                description: product.description,
                price: product.price,
                amount: product.amount,
                subcategory: product.subcategory,
                image: product.image,
                published: product.published
            }
        });

        if (findDuplicateProduct > 0) {
            return "😬 O produto não pode ser criado porque já existe um produto com as mesmas informações.";
        }

        return await prisma.product.create({
            data: {
                title: product.title,
                description: product.description,
                price: product.price,
                amount: product.amount,
                subcategory: product.subcategory,
                image: product.image,
                published: product.published
            },
        });
    }

    async getProducts(): Promise<Array<Product>> {
        return await prisma.product.findMany();
    }

    async getProduct(id: number): Promise<Product | null> {
        return await prisma.product.findFirst({ where: { id } })
    }

    async updateProduct(id: number, title: string | null, description: string | null, price: number | null, amount: number | null, subcategory: string | null, image: string | null, published: boolean | null): Promise<Product | string> {

        const findById = await prisma.product.findFirst({ where: { id } });

        if (!findById) return "✖️ Produto não encontrado para o ID informado!";

        return await prisma.product.update({
            where: { id, },
            data: {
                title: title || findById.title,
                description: description || findById.description,
                price: price || findById.price,
                amount: amount || findById.amount,
                subcategory: subcategory || findById.subcategory,
                image: image || findById.image,
                published: published || findById.published
            }
        })
    }

    async deleteProduct(id: number): Promise<Product | string> {

        const findById = await prisma.product.findFirst({ where: { id } });

        if (!findById) return "✖️ Produto não encontrado para o ID informado!";

        return await prisma.product.delete({ where: { id } })
    }
}

export default new ProductRepository();