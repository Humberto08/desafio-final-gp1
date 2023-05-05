import { Router } from "express";

const routers = Router();

routers.get('/', (_, res) => {
    return res.status(200).json("🚀 Aplicação rodando com sucesso!");
});

export default routers;