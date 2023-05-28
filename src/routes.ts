import { Request, Response, Router } from "express";
import UserController from "./controllers/UserController";
import CategController from "./controllers/CategController";
import ProductController from "./controllers/ProductController";
import CartController from "./controllers/CartController";
import OrderController from "./controllers/OrderController";
import AuthController from "./controllers/AuthController";
import verifyEmailMiddleware from './middlewares/verifyEmailMiddleware';
import verifyEmailsAllMiddleware from './middlewares/VerifyEmailsAllMiddleware';
import AuthMiddleware from './middlewares/AuthMiddleware'
import upload from './middlewares/UploadImgMiddleware';

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json("🚀 Aplicação iniciada com sucesso!");
})

router.post("/auth", AuthController.authenticate); // ROTA AUTHENTICATE FALTA CONCLUIR, PRECISA COLOCAR  O SECRET NO .ENV
router.post("/logout", AuthController.logout);

router.post("/admin", verifyEmailMiddleware, AuthMiddleware, verifyEmailsAllMiddleware, UserController.createAdmin);
router.post("/buyer", verifyEmailMiddleware, AuthMiddleware, verifyEmailsAllMiddleware, UserController.createBuyer);

router.get("/users", AuthMiddleware,UserController.index);
router.get("/users/:id",AuthMiddleware, UserController.show);
router.put("/users/:id",AuthMiddleware, UserController.update);
router.delete("/users/:id", AuthMiddleware, UserController.delete);

router.post("/categories", AuthMiddleware, CategController.create);
router.get("/categories", AuthMiddleware, CategController.index);
router.get("/categories/:id", AuthMiddleware, CategController.show);
router.put("/categories/:id", AuthMiddleware, CategController.update);
router.delete("/categories/:id", AuthMiddleware, CategController.delete);

router.post("/products", upload.single('image'),AuthMiddleware, ProductController.create);

router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
router.put("/products/:id", AuthMiddleware, ProductController.update);
router.delete("/products/:id", AuthMiddleware, ProductController.delete);

router.post("/order", AuthMiddleware, OrderController.create);
router.get("/order", AuthMiddleware, OrderController.index);
router.get("/order/:id",AuthMiddleware, OrderController.show);
router.put("/order/:id", AuthMiddleware, OrderController.update);
router.delete("/order/:id", AuthMiddleware, OrderController.delete);

router.post("/cart/add-to-cart", AuthMiddleware, CartController.addToCart)
router.get("/cart/:user_id", AuthMiddleware, CartController.index);
router.get("/cart/:user_id/:cart_id", AuthMiddleware, CartController.show);
router.put("/cart/:user_id/:cart_id", AuthMiddleware, CartController.updateCartProducts);
router.delete("/cart/:user_id/:cart_id", AuthMiddleware, CartController.delete);

export default router;