
import { Role, User } from "@prisma/client";
import { prisma } from "../database/db";

class UserRepository {
    [x: string]: any;

    async getUsers(): Promise<Array<User>> {
        return await prisma.user.findMany();
    }
    async createUser(User: User): Promise<User | string> {
        const findDuplicateUser = await prisma.user.count({
            where: {
                name: User.name,
                email: User.email,
                id: User.id,
                role: User.role
            }
        });

        if (findDuplicateUser > 0) {
            return "⚠️ O Usuário não pode ser criado, porque já existe um usuário com as mesmas informações.";
        }

        return await prisma.user.create({
            data: {
                name: User.name,
                email: User.email,
                password: User.password,
                role: User.role
            }
        });
    }

    async getUser(id: number): Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                id
            }
        })
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                email
            }
        })
    }

    async updateUser(id: number, name: string | null, email: string | null, password: string | null, role: string | null): Promise<User | null> {

        const findById = await prisma.user.findFirst({
            where: {
                id
            }
        });

        if (!findById) return null;

        // const payload = {
        //     name: name || findById.name,
        //     email: email || findById.email,
        //     password: password || findById.password,
        //     role: role || findById.role
        // }

        return await prisma.user.update({
            where: { id },
            data: {
                name: name || findById.name,
                email: email || findById.email,
                password: password || findById.password,
                role: undefined || findById.role
            }
        })
    }

    async deleteUser(id: number): Promise<User | string> {

        const findById = await prisma.user.findFirst({
            where: {
                id
            }
        });

        if (!findById) return "⚠️ User não encontrado para o ID informado!.";

        return await prisma.user.delete({
            where: {
                id
            }
        });
    }
}



export default new UserRepository();