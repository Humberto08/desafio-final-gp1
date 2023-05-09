import { Category } from "@prisma/client";
import { prisma } from "../database/db";

class CategRepository {

    async createCategory(category: Category): Promise<Category | string> {

        const findDuplicateCategory = await prisma.category.count({
            where: {
                title: category.title,
                content: category.content,
                user_id: category.user_id
            }
        });

        if (findDuplicateCategory > 0) {
            return "😬 A categoria não pode ser criada porque já existe uma categoria com as mesmas informações.";
        }

        if (category.category_status_id) {
            const findCategoryStatusById = await prisma.categoryStatus.count({ where: { id: category.category_status_id } });
            if (!findCategoryStatusById) return "✖️ Status de categoria não existe!"
        }

        if (category.user_id) {
            const findUserById = await prisma.user.count({ where: { id: category.user_id } });
            if (!findUserById) return "✖️ Usuário informado não existe!"
        }

        return await prisma.category.create({
            data: {
                title: category.title,
                content: category.content,
                user_id: category.user_id,
                category_status_id: category.category_status_id
            }
        });
    }

    async getCategories(): Promise<Array<Category>> {
        return await prisma.category.findMany();
    }

    async getCategory(id: number): Promise<Category | null> {
        return await prisma.category.findFirst({ where: { id } })
    }

    async updateCategory(id: number, title: string | null, content: string | null, user_id: number | null, category_status_id: number | null): Promise<Category | string> {

        const findById = await prisma.category.findFirst({ where: { id } });

        if (!findById) return "✖️ Categoria não encontrada para o ID informado!";

        if (category_status_id) {
            const findCategoryStatusById = await prisma.categoryStatus.count({ where: { id: category_status_id } });
            if (!findCategoryStatusById) return "✖️ Status de categoria não existe!"
        }

        if (user_id) {
            const findUserById = await prisma.user.count({ where: { id: user_id } });
            if (!findUserById) return "✖️ Usuário informado não existe!"
        }

        return await prisma.category.update({
            where: { id, },
            data: {
                title: title || findById.title,
                content: content || findById.content,
                user_id: user_id || findById.user_id,
                category_status_id: category_status_id || findById.category_status_id
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