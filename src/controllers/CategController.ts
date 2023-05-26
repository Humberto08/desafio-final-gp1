import { Category } from "@prisma/client";
import { Request, Response } from "express";
import CategService from "../services/CategService";

class CategController {

    static async create(req: Request, res: Response) {

        try {

            const { title, description, published } = req.body;

            if (!title || !description || !published) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa informar todos os campos necessários para criar a Categoria!" })
            }

            const category: Category | string = await CategService.createCategory({
                title,
                description,
                published
            } as Category);

            if (typeof category === "string") return res
                .status(500)
                .json({ success: false, message: category });

            return res.json({
                success: true,
                message: "✔️ Categoria criada com sucesso!",
                result: category
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
            const categories = await CategService.getCategories();

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

            const category = await CategService.getCategory(Number(id));

            if (!category) return res
                .status(500)
                .json({ success: false, message: "✖️ Categoria não encontrada para o ID informado!" });

            return res.json({
                success: true,
                result: category
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

            const { title, description, user_id, category_status_id } = req.body;

            if (!title && !description && !user_id && !category_status_id) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa preencher pelo menos um campo para atualizar a Categoria!" });
            }

            const category: Category | string = await CategService.updateCategory(Number(id), title, description);

            if (typeof category === 'string') return res
                .status(404)
                .json({ success: false, message: category });

            return res.json({
                success: true,
                message: "✔️ Categoria atualizada com sucesso!",
                result: category
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

            const category = await CategService.deleteCategory(Number(id));

            if (typeof category === 'string') return res
                .status(404)
                .json({ success: false, message: category });

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
export default CategController;