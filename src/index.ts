import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import { prisma } from "./database/db";
import bodyParser from "body-parser";
import path from "path";

async function main() {
    const app = express();
    const port = process.env.PORT || 3333;
    app.use(cors());
    app.use(bodyParser.json());
    
    app.use(router)
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
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


