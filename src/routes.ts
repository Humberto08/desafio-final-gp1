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

router.post("/auth", AuthController.authenticate); 
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
router.get("/order/:id", AuthMiddleware, OrderController.show);
router.put("/order/:id", AuthMiddleware, OrderController.updateOrderStatus);
router.delete("/order/:id", AuthMiddleware, OrderController.delete);

// CARRINHO
router.post("/cart/add-to-cart", AuthMiddleware, CartController.addToCart)
router.get("/cart/:id", AuthMiddleware, CartController.show);
router.put("/cart/:id", AuthMiddleware, CartController.updateCartProducts);
router.put("/cartupdatestatus/:id/:id", AuthMiddleware, CartController.updateCartStatus);
router.delete("/cart/:id", AuthMiddleware, CartController.delete);

export default router;

/*

ANOTAÇÕES MENTORIA

Listar carrinho: só uma rota GET com o carrinho do usuário (listar carrinho por user_id)
quando for mostrar o carrinho (rota GET) mostrar os itens adicionados (array de produtos - pode ser só o id mas melhor que apareça o nome)
(pesquisar tipos de rotas de carrinho no youtube - shopping cart backend node - pode ser qualquer tecnologia, só quero saber a lógica das rotas)

Documentação: tem que remover uma das rotas GET de carrinho, mantém só a get by id.

JÁ MEXIDO

Alterado o middleware de verifyUserTypes pra que tanto admin quanto owner consigam acessos.
O tipo do usuário tava vindo do body, tá errado pois eu posso me colocar como admin quando eu quiser, essa permissão tem que vir do token

Banco de dados conectado: o problema tava no root, criou um usuário admin e conectou.
Mas agora o usuário admin não tá dando certo.

*/