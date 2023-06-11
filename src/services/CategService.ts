import { Category } from "@prisma/client";
import CategRepository from "../repositories/CategRepository";

class CategService {

    async createCategory(category: Category): Promise<Category | string> {
        return await CategRepository.createCategory(category);
    }

    async getCategories(): Promise<Array<Category>> {
        return await CategRepository.getCategories();
    }

    async getCategory(id: number): Promise<Category | null> {
        return await CategRepository.getCategory(id);
    }

    async updateCategory(id: number, title: string | null, description: string | null): Promise<Category | string> {
        return await CategRepository.updateCategory(id, title, description);
    }

    async deleteCategory(id: number): Promise<Category | string> {
        return await CategRepository.deleteCategory(id);
    }
}

export default new CategService();