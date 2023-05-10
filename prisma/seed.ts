import { prisma } from "../src/database/db";
import bcrypt from "bcrypt";

async function main() {

    const salt = bcrypt.genSaltSync(10);
    const user = await prisma.usuario.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: "User",
            email: "usuario_teste@gmail.com",
            password: bcrypt.hashSync("123456789", salt),
        }
    });


}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });