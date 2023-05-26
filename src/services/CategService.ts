import { Category } from "@prisma/client";
import CategRepository from "../repositories/CategRepository";

class CategService {

    async createCategory(category: Category): Promise<Category | string> {
        return CategRepository.createCategory(category);
    }

    async getCategories(): Promise<Array<Category>> {
        return CategRepository.getCategories();
    }

    async getCategory(id: number): Promise<Category | null> {
        return CategRepository.getCategory(id);
    }

    async updateCategory(id: number, title: string | null, description: string | null): Promise<Category | string> {
        return CategRepository.updateCategory(id, title, description);
    }

    async deleteCategory(id: number): Promise<Category | string> {
        return CategRepository.deleteCategory(id);
    }
}

export default new CategService();