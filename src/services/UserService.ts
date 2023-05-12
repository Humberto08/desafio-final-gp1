import { User } from "@prisma/client";
import UserRepository from "../repositories/UserRepository";
// import { type } from "os";


class UserService {
    async getUsers(): Promise<Array<User>> {
        return UserRepository.getUsers();
    }

    async createUser(User: User) {
        return UserRepository.createUser(User);
    }

    async getUser(id: number): Promise<User | null> {
        return UserRepository.getUser(id);
    }

    async updateUser(id: number, name: string | null, email: string | null, password: string | null | null, type: string | null): Promise<User | null> {
        return UserRepository.updateUser(id, name, email, password, type);
    }

    async deleteUser(id: number): Promise<User | string> {
        return UserRepository.deleteUser(id);
    }

}



export default new UserService();



