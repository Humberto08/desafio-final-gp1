import { Product } from "@prisma/client";
import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {

    static async create(req: Request, res: Response) {

        try {

            const { title, content, user_id, product_status_id } = req.body;

            if (!title || !content || !user_id || !product_status_id) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa informar todos os campos necessários para criar a Categoria!" })
            }

            const product: Product | string = await ProductService.createProduct({
                title,
                content,
                user_id,
                product_status_id
            } as Product); // forçando um objeto a ser do tipo 'Product'

            if (typeof product === 'string') return res.status(500).json({
                success: false,
                message: product // o retorno vai ser a própria product 
            });

            return res.json({
                success: true,
                message: "🎉 Categoria criada com sucesso!",
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
            const categories = await ProductService.getProducts();

            return res.json({
                success: true,
                result: categories
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
                .json({ success: false, message: "✖️ É obrigatório informar o ID da categoria!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const product = await ProductService.getProduct(Number(id));
            if (!product) return res
                .status(500)
                .json({ success: false, message: "✖️ Categoria não encontrada para o ID informado!" });

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
                .json({ success: false, message: "✖️ É obrigatório informar o ID da categoria!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const { title, content, user_id, product_status_id } = req.body;

            if (!title && !content && !user_id && !product_status_id) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa preencher pelo menos um campo para atualizar a Categoria!" });
            }

            const product: Product | string = await ProductService.updateProduct(Number(id), title, content, user_id, product_status_id);

            if (typeof product === 'string') return res
                .status(404)
                .json({ success: false, message: product });

            return res.json({
                success: true,
                message: "Categoria atualizada com sucesso!",
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
                .json({ success: false, message: "✖️ É obrigatório informar o ID da categoria!" });

            if (isNaN(Number(id))) return res
                .status(500)
                .json({ success: false, message: "✖️ O ID precisa ser um número!" });

            const product = await ProductService.deleteProduct(Number(id));

            if (typeof product === 'string') return res
                .status(404)
                .json({ success: false, message: product });

            return res.json({
                success: true,
                message: "✔️ Categoria deletada com sucesso!"
            });

        } catch (error) {
            console.log(error);

            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, tente novamente!" });
        }
    }
}
export default new ProductController();