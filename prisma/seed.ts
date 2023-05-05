import { prisma } from "../src/database/db";

async function main() {

    await prisma.categoryStatus.upsert({
        where: { title: "CADASTRAR" },
        update: {},
        create: {
            title: "CADASTRAR"
        }
    });

    await prisma.categoryStatus.upsert({
        where: { title: "CADASTRADA" },
        update: {},
        create: {
            title: "CADASTRADA"
        }
    });

    await prisma.categoryStatus.upsert({
        where: { title: "CADASTRAR" },
        update: {},
        create: {
            title: "CADASTRAR"
        }
    });

    await prisma.categoryStatus.upsert({
        where: { title: "CADASTRADO" },
        update: {},
        create: {
            title: "CADASTRADO"
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit(1)
    })