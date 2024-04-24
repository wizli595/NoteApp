import { PrismaClient } from "@prisma/client";
import colors from "colors";
const prisma = new PrismaClient();

async function main() {
  await prisma.note.deleteMany({});
  await prisma.user.deleteMany({});

  console.log(colors.bgRed("Database has been emptied."));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
