import { Usuario } from "@prisma/client";
import UsuarioRepository from "../repositories/UsuarioRepository";


class UsuarioService {
    async getUsuarios(): Promise<Array<Usuario>> {
        return UsuarioRepository.getUsuarios();
    }

    async createUsuario(Usuario: Usuario) {
        return UsuarioRepository.createUsuario(Usuario);
    }

    async getUsuario(id: number): Promise<Usuario | null> {
        return UsuarioRepository.getUsuario(id);
    }

    async updateUsuario(id: number, name: string | null, email: string | null, password: string | null): Promise<Usuario | null> {
        return UsuarioRepository.updateUsuario(id, name, email, password);
    }

    async deleteUsuario(id: number): Promise<Usuario | string> {
        return UsuarioRepository.deleteUsuario(id);
    }

}



export default new UsuarioService();



