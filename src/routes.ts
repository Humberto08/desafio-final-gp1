import { Application, Request, Response } from "express";
import { Router } from "./helpers/Router";
import UserController from "./controllers/UserController";
import CategController from "./controllers/CategController";
import ProductController from "./controllers/ProductController";

export function setupRoutes(app: Application) {

    const router = new Router(app);

    router.get("/", (req: Request, res: Response) => {
        res.status(200).json("🚀 Aplicação iniciada com sucesso!");
    })

    router.group("/users", (router) => {
        router.get("/", UserController.index);
        router.post("/", UserController.create);
        router.get("/:id", UserController.show);
        router.put("/:id", UserController.update);
        router.delete("/:id", UserController.delete);
    })

    router.group("/categorias", (router) => {
        router.post("/", CategController.create);
        router.get("/", CategController.index);
        router.get("/:id", CategController.show);
        router.put("/:id", CategController.update)
        router.delete("/:id", CategController.delete)
    });

    router.group("/produtos", (router) => {
        router.post("/", ProductController.create);
        router.get("/", ProductController.index);
        router.get("/:id", ProductController.show);
        router.put("/:id", ProductController.update)
        router.delete("/:id", ProductController.delete)
    });
}