import { Product } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";
import sharp from 'sharp';

class ProductController {


    static async create(req: Request, res: Response, next: NextFunction) {

        try {

            //upload de arquivo
            if (!req.file) return res.status(500).json({ message: "✖️ Você precisa enviar uma imagem!" });

            const image = process.env.APP_URL + '/uploads/' + req.file.originalname;

            await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(`./uploads/${req.file.originalname}`)


            const { title, description, price, amount, option, published, category_id } = req.body;

            // //upload de arquivo
            // if (!req.file) return res.status(500).json({ message: "✖️ Você precisa enviar uma imagem!" });

            // const image = process.env.APP_URL + '/uploads/' + req.file.originalname;

            // await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(`./uploads/${req.file.originalname}`)

            if (!title || !description || !price || !amount || !option || !published || !category_id) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa informar todos os campos para criar o Produto!" })
            }

            const product: Product | string = await ProductService.createProduct({
                title,
                description,
                price: Number(price),
                amount: Number(amount),
                option,
                category_id: Number(category_id),
                published: published === 'true'
            } as unknown as Product);

            if (product) {
                return res.status(200).json({
                    success: true,
                    message: "✔️ Produto criado com sucesso!",
                    result: product
                })
            };

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

            return res.status(200).json({
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

            const { title, description, price, amount, option, published, category_id } = req.body;

            if (!title && !description && !price && !amount && !option && !published) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa preencher pelo menos um campo para atualizar o Produto!" });
            }

            const product: Product | string = await ProductService.updateProduct(Number(id), title, description, price, amount, option, published, category_id);

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