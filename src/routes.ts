import { Request, Response, Router } from "express";
import UserController from "./controllers/UserController";
import CategController from "./controllers/CategController";
import ProductController from "./controllers/ProductController";
import CartController from "./controllers/CartController";
import OrderController from "./controllers/OrderController";
import AuthController from "./controllers/AuthController";
import verifyEmailMiddleware from './middlewares/verifyEmailMiddleware';
import verifyEmailsAllMiddleware from './middlewares/VerifyEmailsAllMiddleware';
import AuthMiddleware from './middlewares/AuthMiddleware';
import verifyUserTypesMiddleware from './middlewares/verifyUserTypesMiddleware';
import upload from './middlewares/UploadImgMiddleware';

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json("🚀 Aplicação iniciada com sucesso!");
})

// USUÁRIOS E AUTENTICAÇÃO

router.post("/auth", AuthController.authenticate); // ROTA AUTHENTICATE FALTA CONCLUIR, PRECISA COLOCAR  O SECRET NO .ENV
router.post("/logout", AuthController.logout);

router.post("/admin", verifyEmailMiddleware, verifyUserTypesMiddleware, AuthMiddleware, verifyEmailsAllMiddleware, UserController.createAdmin);
router.post("/buyer", verifyEmailMiddleware, verifyEmailsAllMiddleware, UserController.createBuyer);

router.get("/users", AuthMiddleware, verifyUserTypesMiddleware, UserController.index);
router.get("/users/:id", AuthMiddleware, verifyUserTypesMiddleware, UserController.show);
router.put("/users/:id", AuthMiddleware, UserController.update);
router.delete("/users/:id", AuthMiddleware, UserController.delete);

// CATEGORIAS
router.post("/categories", AuthMiddleware, verifyUserTypesMiddleware, CategController.create);
router.get("/categories", AuthMiddleware, verifyUserTypesMiddleware, CategController.index);
router.get("/categories/:id", AuthMiddleware, verifyUserTypesMiddleware, CategController.show);
router.put("/categories/:id", AuthMiddleware, verifyUserTypesMiddleware, CategController.update);
router.delete("/categories/:id", AuthMiddleware, verifyUserTypesMiddleware, CategController.delete);

// PRODUTOS
router.post("/products", upload.single('image'), AuthMiddleware, verifyUserTypesMiddleware, ProductController.create);
router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
router.put("/products/:id", AuthMiddleware, verifyUserTypesMiddleware, ProductController.update);
router.delete("/products/:id", AuthMiddleware, verifyUserTypesMiddleware, ProductController.delete);

// PEDIDOS
router.post("/order", AuthMiddleware, OrderController.create);
router.get("/order", AuthMiddleware, OrderController.index);
router.get("/order/:user_id", AuthMiddleware, OrderController.show);
router.put("/order/:user_id/:order_id", AuthMiddleware, OrderController.updateOrderStatus);
router.delete("/order/:user_id/:order_id", AuthMiddleware, OrderController.delete);

// CARRINHO
router.post("/cart/add-to-cart", AuthMiddleware, CartController.addToCart)
router.get("/cart/:user_id", AuthMiddleware, CartController.show);
router.put("/cart/:user_id/:cart_id", AuthMiddleware, CartController.updateCartProducts);
router.put("/cartupdatestatus/:user_id/:cart_id", AuthMiddleware, CartController.updateCartStatus);
router.delete("/cart/:user_id/:cart_id", AuthMiddleware, CartController.delete);

export default router;