import { Router } from "express";
import CategController from "../controllers/CategController";
import ProductController from "../controllers/ProductController";
import UserController from "../controllers/UserController";

const router = Router();

// ROTA TESTE 
router.get('/', (req, res) => {
    return res.status(200).json("🚀 Aplicação rodando com sucesso!");
});

// ROTAS USUARIOS
router.post("/users", UserController.create);
router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

// ROTAS CATEGORIAS
router.post("/categorias", CategController.create);
router.get("/categorias", CategController.index);
router.get("/categorias/:id", CategController.show);
router.put("/categorias/:id", CategController.update)
router.delete("/categorias/:id", CategController.delete)

// ROTAS PRODUTOS
router.post("/produtos", ProductController.create);
router.get("/produtos", ProductController.index);
router.get("/produtos/:id", ProductController.show);
router.put("/produtos/:id", ProductController.update)
router.delete("/produtos/:id", ProductController.delete)

export default router;