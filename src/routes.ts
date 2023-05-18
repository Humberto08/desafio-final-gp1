import { Application, Request, Response } from "express";
import { Router } from "./helpers/Router";
import UserController from "./controllers/UserController";
import CategController from "./controllers/CategController";
import ProductController from "./controllers/ProductController";
import CartController from "./controllers/CartController";
import OrderController from "./controllers/OrderController";
<<<<<<< Updated upstream
import AuthController from "./controllers/AuthController";



=======
import AccessController from "./controllers/AccessController";
>>>>>>> Stashed changes

export function setupRoutes(app: Application) {



    const router = new Router(app);

    // const AuthController = new AuthController();

    router.get("/", (req: Request, res: Response) => {
        res.status(200).json("🚀 Aplicação iniciada com sucesso!");
    })

    router.post("/login", AuthController.login);
    

    router.group("/users", (router) => {
        router.get("/",  UserController.index);
        router.post("/", UserController.create);
        router.get("/:id", UserController.show);
        router.put("/:id", UserController.update);
        router.delete("/:id", UserController.delete);
    })

    router.group("/access", (router) => {
        router.post("/", AccessController.create);
        router.get("/", AccessController.index);
    })

    router.group("/categories", (router) => {
        router.post("/", CategController.create);
        router.get("/", CategController.index);
        router.get("/:id", CategController.show);
        router.put("/:id", CategController.update)
        router.delete("/:id", CategController.delete)
    });

    router.group("/products", (router) => {
        router.post("/", ProductController.create);
        router.get("/", ProductController.index);
        router.get("/:id", ProductController.show);
        router.put("/:id", ProductController.update)
        router.delete("/:id", ProductController.delete)
    });

    router.group("/order", (router) => {
        router.post("/", OrderController.create);
        router.get("/", OrderController.index);
        router.get("/:id", OrderController.show);
        router.put("/:id", OrderController.update);
        router.delete("/:id", OrderController.delete);
    })

    router.group("/cart", (router) => {
        router.post("/", CartController.create);
        router.get("/", CartController.index);
        router.get("/:id", CartController.show);
        router.put("/:id", CartController.update);
        router.delete("/:id", CartController.delete);
    })
}