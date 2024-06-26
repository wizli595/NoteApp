import { PrismaClient, User } from "@prisma/client";

import colors from "colors";
import users from "../../data/users";
import notes from "../../data/notes";
const prisma = new PrismaClient();

async function main() {
  try {
    // Delete all the data in the database
    await prisma.note.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    // start seeding the database
    for (let i = 0; i < users.length; i++) {
      const user: User = await prisma.user.create({ data: users[i] });
      await prisma.note.create({
        data: {
          ...notes[i],
          userId: user.id,
        },
      });
    }
    console.log(colors.green("DATABASE GOT SEEDED"));
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
main();
