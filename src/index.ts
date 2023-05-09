import { prisma } from './database/db';
import app from './server/server';

const PORT = 3333;

app.listen(PORT, async () => {
    console.log(`✔️ Server running in localhost:${PORT}!`);

    try {
        await prisma.$connect();
        console.log(`😄 Conectado com sucesso à base de dados!`);

    } catch (error) {
        console.log(`😕 Aconteceu um erro ao tentar conectar à base de dados.`);
    }
})