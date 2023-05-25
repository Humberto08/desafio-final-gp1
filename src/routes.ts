import multer from 'multer';
import { Application, Request, Response } from "express";
import { Router } from "./helpers/Router";
import UserController from "./controllers/UserController";
import CategController from "./controllers/CategController";
import ProductController from "./controllers/ProductController";
import CartController from "./controllers/CartController";
import OrderController from "./controllers/OrderController";
import AuthController from "./controllers/AuthController";
import AccessController from "./controllers/AccessController";
import path from 'path';
import fs = require('fs');

export function setupRoutes(app: Application) {

    const router = new Router(app);

    // const AuthController = new AuthController();

    router.get("/", (req: Request, res: Response) => {
        res.status(200).json("🚀 Aplicação iniciada com sucesso!");
    })

    router.post("/login", AuthController.login);

    router.group("/users", (router) => {
        router.get("/", UserController.index);
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

    const upload = multer({
        limits: {
            fileSize: 1000000
        },
        fileFilter(req: any, file: any, cb: any) {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Favor enviar uma imagem válida!'))
            }
            cb(null, true)
        }
    });

    app.post("/products", upload.single('image'), ProductController.create);

    router.group("/products", (router) => {
        //router.post("/", ProductController.create); // 
       
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

        router.post("/:user_id", CartController.createUserCart)
        router.get("/:user_id", CartController.index);
        router.get("/:user_id/:cart_id", CartController.show);
        router.put("/:user_id/:cart_id", CartController.update);
        router.delete("/:user_id/:cart_id", CartController.delete);
    })
}