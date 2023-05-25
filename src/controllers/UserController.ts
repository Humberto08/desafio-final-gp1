import { User } from '@prisma/client';
import { Request, Response } from 'express'
import UserService from '../services/UserService';
import { hash } from 'bcrypt';


class UserController {

    static async index(req: Request, res: Response) {

        try {
            const users = await UserService.getUsers();

            res.json({
                success: true,
                result: users
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: " Internal Server Error" })

        }
    }

    static async create(req: Request, res: Response) {

        try {

            const { name, email, password, type } = req.body;
            const hash_password = await hash(password, 10);

            if (!name || !email || !password || !type) {
                return res
                    .status(400)
                    .json({ success: false, message: "⚠️ Preencha todos os campos necessários para criação de um usuário" })
            }

            const user: string | User = await UserService.createUser({
                name,
                email,
                type,
                password: hash_password
            } as unknown as User);

            if (user) {
                return res.json({
                    success: true,
                    message: "Usuário criado com sucesso",
                    result: user
                })
            }


        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: " Internal Server Error" })
        }


    }

    static async show(req: Request, res: Response) {

        try {
            const { id } = req.params;

            const checkUserId = UserController.checkUserId(id);
            if (!checkUserId?.success) return res
                .status(500)
                .json(checkUserId);

            const user = await UserService.getUser(Number(id));

            if (!user) return res
                .status(404)
                .json({ success: false, message: "⚠️ Usuário não encontrado" })

            res.json({
                success: true,
                result: user
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: " Internal Server Error" })

        }
    }

    static async update(req: Request, res: Response) {

        try {
            const { id } = req.params;

            const checkUserId = UserController.checkUserId(id);
            if (!checkUserId?.success) return res
                .status(500)
                .json(checkUserId?.message);

            const { name, email, password, type } = req.body;

            if (!name && !email && !password && !type) {
                return res
                    .status(400)
                    .json({ success: false, message: "⚠️ Preencha pelo menos um campo para atualização do usuário" })
            }

            const user = await UserService.updateUser(Number(id), name, email, password, type);

            if (!user) return res
                .status(404)
                .json({ success: false, message: "⚠️ É necessário informar o id" })

            res.json({
                success: true,
                message: "Usuário atualizado com sucesso",
                result: user
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: " Internal Server Error" })

        }
    }

    static async delete(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const checkUserId = UserController.checkUserId(id);
            if (!checkUserId?.success) return res.status(500).json(checkUserId);

            const user = await UserService.deleteUser(Number(id));

            if (typeof user === 'string') return res
                .status(404)
                .json({ success: false, message: user });

            return res.json({
                success: true,
                message: "✅ Usuário deletado com sucesso!"
            });

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: " ⚠️ Internal Server Error" });
        }
    }

    static checkUserId(id: string) {

        if (!id) return { success: false, message: "⚠️ É necessário informar o id" };
        if (isNaN(Number(id))) return { success: false, message: "⚠️ O ID precisa ser um número!" };

        return { success: true };

    }
}



export default UserController;
