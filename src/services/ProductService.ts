import { Product } from "@prisma/client";
import ProductRepository from "../repositories/ProductRepository";

class ProductService {

    async createProduct(product: Product): Promise<Product | string> {
        return ProductRepository.createProduct(product);
    }

    async getProducts(): Promise<Array<Product>> {
        return ProductRepository.getProducts();
    }

    async getProduct(id: number): Promise<Product | null> {
        return ProductRepository.getProduct(id);
    }

    async updateProduct(id: number, title: string | null, content: string | null, user_id: number | null, product_status_id: number | null): Promise<Product | string> {
        return ProductRepository.updateProduct(id, title, content, user_id, product_status_id);
    }

    async deleteProduct(id: number): Promise<Product | string> {
        return ProductRepository.deleteProduct(id);
    }
}

export default new ProductService();