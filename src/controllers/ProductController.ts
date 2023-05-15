import { Product } from "@prisma/client";
import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {

    static async create(req: Request, res: Response) {

        try {

            const { title, description, published, user_id } = req.body;

            if (!title || !description || !published || !user_id) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa informar todos os campos necessários para criar o Produto!" })
            }

            const product: Product | string = await ProductService.createProduct({
                title,
                description,
                published
            } as Product);

            if (typeof product === 'string') return res.status(500).json({
                success: false,
                message: product
            });

            return res.json({
                success: true,
                message: "✔️ Produto criado com sucesso!",
                result: product
            })

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }

    static async index(req: Request, res: Response) {

        try {
            const products = await ProductService.getProducts();

            return res.json({
                success: true,
                result: products
            })

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, Tente novamente!" });
        }
    }

    static async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do produto!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const product = await ProductService.getProduct(Number(id));
            if (!product) return res
                .status(500)
                .json({ success: false, message: "✖️ Produto não encontrado para o ID informado!" });

            return res.json({
                success: true,
                result: product
            });

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do produto!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const { title, description, user_id, product_status_id } = req.body;

            if (!title && !description && !user_id && !product_status_id) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa preencher pelo menos um campo para atualizar o Produto!" });
            }

            const product: Product | string = await ProductService.updateProduct(Number(id), title, description, user_id, product_status_id);

            if (typeof product === 'string') return res
                .status(404)
                .json({ success: false, message: product });

            return res.json({
                success: true,
                message: "✔️ Produto atualizado com sucesso!",
                result: product
            });

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }

    static async delete(req: Request, res: Response) {

        try {

            const { id } = req.params;

            if (!id) return res
                .status(500)
                .json({ success: false, message: "✖️ É obrigatório informar o ID do produto!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const product = await ProductService.deleteProduct(Number(id));

            if (typeof product === 'string') return res
                .status(404)
                .json({ success: false, message: product });

            return res.json({
                success: true,
                message: "✔️ Produto deletado com sucesso!"
            });

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }
}

export default ProductController;