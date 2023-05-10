import { Usuario } from "@prisma/client";
import { prisma } from "../database/db";


class UsuarioRepository {


    async getUsuarios(): Promise<Array<Usuario>> {
        return await prisma.usuario.findMany();
    }
    async createUsuario(Usuario: Usuario): Promise<Usuario | string> {
        const findDuplicateUsuario = await prisma.usuario.count({
            where: {
                name: Usuario.name,
                email: Usuario.email,
                id: Usuario.id
            }
        });

        if (findDuplicateUsuario > 0) {
            return "⚠️ O Usuário não pode ser criado, porque já existe um usuário com as mesmas informações.";
        }

        return await prisma.usuario.create({
            data: {
                name: Usuario.name,
                email: Usuario.email,
                password: Usuario.password
            }
        });
    }

    async getUsuario(id: number): Promise<Usuario | null> {
        return await prisma.usuario.findFirst({
            where: {
                id
            }
        })
    }

    async updateUsuario(id: number, name: string | null, email: string | null, password: string | null): Promise<Usuario | null> {

        const findById = await prisma.usuario.findFirst({
            where: {
                id
            }
        });

        if (!findById) return null;

        const payload = {
            name: name || findById.name,
            email: email || findById.email,
            password: password || findById.password
        }


        return await prisma.usuario.update({
            where: {
                id,
            },
            data: payload
        })
    }

    async deleteUsuario(id: number): Promise<Usuario | string> {

        const findById = await prisma.usuario.findFirst({
            where: {
                id
            }
        });

        if (!findById) return "⚠️ Usuario não encontrado para o ID informado!.";

        return await prisma.usuario.delete({
            where: {
                id
            }
        });
    }
}



export default new UsuarioRepository();