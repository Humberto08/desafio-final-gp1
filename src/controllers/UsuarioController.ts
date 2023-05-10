import { Usuario } from '@prisma/client';
import { Request, Response } from 'express'
import UsuarioService from '../services/UsuarioService';



class UsuarioController {

    static async index(req: Request, res: Response) {

        try {
            const usuarios = await UsuarioService.getUsuarios();

            res.json({
                success: true,
                result: usuarios
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: " Internal Server Error" })

        }
    }


    static async create(req: Request, res: Response) {

        try {

            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res
                    .status(400)
                    .json({ success: false, message: "⚠️ Preencha todos os campos necessários para criação de um usuário" })
            }

            const usuario: Usuario | string = await UsuarioService.createUsuario({
                name,
                email,
                password
            } as Usuario);

            if (usuario) {
                return res.json({
                    success: true,
                    message: "Usuário criado com sucesso",
                    result: usuario
                })
            }

            return res.json({
                success: true,
                message: "Usuário criado com sucesso",
                result: usuario
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: " Internal Server Error" })
        }
    }

    static async show(req: Request, res: Response) {

        try {
            const { id } = req.params;
            
            const checkUsuarioId = UsuarioController.checkUsuarioId(id);
            if (!checkUsuarioId?.success) return res
                .status(500)
                .json( checkUsuarioId);

            const usuario = await UsuarioService.getUsuario(Number(id));

            if (!usuario) return res
                .status(404)
                .json({ success: false, message: "⚠️ Usuário não encontrado" })

            res.json({
                success: true,
                result: usuario
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: " Internal Server Error" })

        }
    }

    static async update(req: Request, res: Response) {

        try {
            const { id } = req.params;

            const checkUsuarioId = UsuarioController.checkUsuarioId(id);
            if (!checkUsuarioId?.success) return res
                .status(500)
                .json( checkUsuarioId?.message);

            const { name, email, password } = req.body;

            if (!name && !email && !password) {
                return res
                    .status(400)
                    .json({ success: false, message: "⚠️ Preencha pelo menos um campo para atualização do usuário" })
            }   

            const usuario = await UsuarioService.updateUsuario(Number(id), name, email, password);

            if (!usuario) return res
                .status(404)
                .json({ success: false, message: "⚠️ É necessário informar o id" })

            res.json({
                success: true,
                message: "Usuário atualizado com sucesso",
                result: usuario
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: " Internal Server Error" })

        }
    }

    static async delete(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const checkUsuarioId = UsuarioController.checkUsuarioId(id);
            if (!checkUsuarioId?.success) return res.status(500).json(checkUsuarioId);

            const usuario = await UsuarioService.deleteUsuario(Number(id));

            if (typeof usuario === 'string') return res
                .status(404)
                .json({ success: false, message: usuario });

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

    static checkUsuarioId(id: string) {

        if (!id) return { success: false, message: "⚠️ É necessário informar o id" };
        if (isNaN(Number(id))) return { success: false, message: "⚠️ O ID precisa ser um número!" };

        return { success: true };

    }
}



export default UsuarioController;