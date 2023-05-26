import { prisma } from "../src/database/db";
import bcrypt from "bcrypt";

async function main() {

    const salt = bcrypt.genSaltSync(10);

    await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: "Admin",
            email: "admin@mail.com",
            role: "admin",
            password: bcrypt.hashSync("123456789", salt)
        }
    });

}

//     await prisma.categoryStatus.upsert({
//         where: { title: "CADASTRAR" },
//         update: {},
//         create: {
//             title: "CADASTRAR"
//         }
//     });

//     await prisma.categoryStatus.upsert({
//         where: { title: "CADASTRADA" },
//         update: {},
//         create: {
//             title: "CADASTRADA"
//         }
//     });

//     await prisma.productStatus.upsert({
//         where: { title: "CADASTRAR" },
//         update: {},
//         create: {
//             title: "CADASTRAR"
//         }
//     });

//     await prisma.productStatus.upsert({
//         where: { title: "CADASTRADO" },
//         update: {},
//         create: {
//             title: "CADASTRADO"
//         }
//     });
// }

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit(1)
    })
