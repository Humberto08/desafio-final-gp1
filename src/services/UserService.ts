import { User } from "@prisma/client";
import UserRepository from "../repositories/UserRepository";
// import { role } from "os";


class UserService {
    async getUsers(): Promise<Array<User>> {
        return UserRepository.getUsers();
    }

    async createUser(User: User): Promise<User | string> {
        return UserRepository.createUser(User);
    }

    async getUser(id: number): Promise<User | null> {
        return UserRepository.getUser(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return UserRepository.getUserByEmail(email);
    }

    async updateUser(id: number, name: string | null, email: string | null, password: string | null | null, role: string | null): Promise<User | null> {
        return UserRepository.updateUser(id, name, email, password, role);
    }

    async deleteUser(id: number): Promise<User | string> {
        return UserRepository.deleteUser(id);
    }

}



export default new UserService();



