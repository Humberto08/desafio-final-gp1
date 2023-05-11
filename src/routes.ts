import { Application, Request, Response } from "express";
import { Router } from "./helpers/Router";
import UserController from "./controllers/UserController";

export function setupRoutes(app: Application) {
    const router = new Router(app);

    router.get("/", (req: Request, res: Response) => {
        res.send(" 🚀 Aplicação iniciada com sucesso!");
    })

    router.group("/users", (router) => {
        router.get("/", UserController.index);
        router.post("/", UserController.create);
        router.get("/:id", UserController.show);
        router.put("/:id", UserController.update);
        router.delete("/:id", UserController.delete);
    })
}