import { Application, Request, Response } from "express";
import { Router } from "./helpers/Router";
import UsuarioController from "./controllers/UsuarioController";

export function setupRoutes(app: Application) {
    const router = new Router(app);

    router.get("/", (req: Request, res: Response) => {
        res.send(" 🚀 Aplicação iniciada com sucesso!");
    })

    router.group("/usuarios", (router) => {
        router.get("/", UsuarioController.index);
        router.post("/", UsuarioController.create);
        router.get("/:id", UsuarioController.show);
        router.put("/:id", UsuarioController.update);
        router.delete("/:id", UsuarioController.delete);
    })
}