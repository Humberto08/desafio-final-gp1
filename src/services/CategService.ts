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

    async updateCategory(id: number, title: string | null, content: string | null, user_id: number | null, category_status_id: number | null): Promise<Category | string> {
        return CategRepository.updateCategory(id, title, content, user_id, category_status_id);
    }

    async deleteCategory(id: number): Promise<Category | string> {
        return CategRepository.deleteCategory(id);
    }
}

export default new CategService();