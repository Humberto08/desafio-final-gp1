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

    async updateProduct(id: number, title: string | null, description: string | null, price: number | null, amount: number | null, subcategory: string | null, image: string | null, published: boolean | null): Promise<Product | string> {
        return ProductRepository.updateProduct(id, title, description, price, amount, subcategory, image, published);
    }

    async deleteProduct(id: number): Promise<Product | string> {
        return ProductRepository.deleteProduct(id);
    }
}

export default new ProductService();