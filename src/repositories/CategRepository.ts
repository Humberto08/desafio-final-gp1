import { Category } from "@prisma/client";
import { prisma } from "../database/db";

class CategRepository {

    async createCategory(category: Category): Promise<Category | string> {

        const findDuplicateCategory = await prisma.category.count({
            where: {
                title: category.title,
                description: category.description,
                published: category.published
            }
        });

        if (findDuplicateCategory > 0) {
            return "😬 A categoria não pode ser criada porque já existe uma categoria com as mesmas informações.";
        }

        return await prisma.category.create({
            data: {
                title: category.title,
                description: category.description,
                published: category.published
            }
        });
    }

    async getCategories(): Promise<Array<Category>> {
        return await prisma.category.findMany();
    }

    async getCategory(id: number): Promise<Category | null> {
        return await prisma.category.findFirst({ where: { id } })
    }

    async updateCategory(id: number, title: string | null, description: string | null, user_id: number | null, category_status_id: number | null): Promise<Category | string> {

        const findById = await prisma.category.findFirst({ where: { id } });

        if (!findById) return "✖️ Categoria não encontrada para o ID informado!";

        if (user_id) {
            const findUserById = await prisma.user.count({ where: { id: user_id } });
            if (!findUserById) return "✖️ Usuário informado não existe!"
        }

        return await prisma.category.update({
            where: { id },
            data: {
                title: title || findById.title,
                description: description || findById.description
            }
        })
    }

    async deleteCategory(id: number): Promise<Category | string> {

        const findById = await prisma.category.findFirst({ where: { id } });

        if (!findById) return "✖️ Categoria não encontrada para o ID informado!";

        return await prisma.category.delete({ where: { id, } })
    }
}

export default new CategRepository();