import express from "express";
import cors from "cors";
import { setupRoutes } from "./routes";
import { prisma } from "./database/db";
import bodyParser from "body-parser";

async function main() {
    const app = express();
    const port = 3333;
    app.use(cors());
    app.use(bodyParser.json());
    setupRoutes(app);

    app.listen(port, async () => {
        console.log(`🚀 Aplicação iniciada na porta: http://127.0.0.1:${port}`);

        try {
            await prisma.$connect();
            console.log("😄 Conectado ao banco de dados");
        } catch (error) {
            console.log(error); {
                console.log("😕 Erro ao conectar ao banco de dados");
            }
        }
    })
}

main().catch((error) => {
    console.error("🥵 Errro!");
    console.log(error);
})


