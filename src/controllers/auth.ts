import { Request, Response } from "express";
import User from "../controllers/UserController";
import Product from "../controllers/ProductController";
import Cart from "../controllers/CartController";
import Coupon from "../controllers/CouponController";
import Order from "../controllers/OrderController";
import uniqid from "uniqid";
import asyncHandler from "express-async-handler";
import { generateToken, generateRefreshToken } from "../config/tokenUtils";
import { validateMysqlId } from "../utils/validateMysqlId";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getConnection } from "../config/database";

// Criar usuário
const createUser = asyncHandler(async (req: Request, res: Response) => {
    const email: string = req.body.email;

    const findUser = await User.findOne({ email });

    if (!findUser) {
        const newUser = new User(req.body);
        await newUser.save();
        res.json(newUser);
    } else {
        throw new Error("Usuário já existe");
    }
});

// Login Usuário
const loginUserCtrl = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser && findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser.id);
        findUser.refreshToken = refreshToken;
        await findUser.save();
        const token = generateToken(findUser.id);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            id: findUser.id,
            email: findUser.email,
            token: token,
        });
    } else {
        throw new Error("Credenciais inválidas");
    }
});

// Admin login
const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const findAdmin = await User.findOne({ email });

    if (!findAdmin || findAdmin.role !== "admin") {
        throw new Error("Não autorizado");
    }

    if (findAdmin && findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin.id);
        findAdmin.refreshToken = refreshToken;
        await findAdmin.save();
        const token = generateToken(findAdmin.id);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            id: findAdmin.id,
            email: findAdmin.email,
            token: token,
        });
    } else {
        throw new Error("Credenciais Inválidas");
    }
});

// Atualização do Token
const handleRefreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new Error("Nenhum token de atualização em cookies");
    }

    // Verificar e decodificar o token de atualização
    const decodedToken: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Obter o ID do usuário do token decodificado
    const userId = decodedToken.userId;

    // Verificar se o ID do usuário é válido
    if (!validateMysqlId(userId)) {
        throw new Error("ID de usuário inválido");
    }

    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ id: userId });

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    // Gerar um novo token de acesso
    const token = generateToken(userId);

    res.json({
        token: token,
    });
});

export { createUser, loginUserCtrl, loginAdmin, handleRefreshToken };
