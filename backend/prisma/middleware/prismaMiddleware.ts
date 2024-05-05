import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { OperationalError } from "../../src/utils/errors/operationalError";
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      //   async create({ args, query }) {
      //     const { password } = args.data;
      //     const salt = await bcryptjs.genSalt(10);
      //     const hashPassword = await bcryptjs.hash(password, salt);
      //     return query({ ...args, hashPassword });
      //   },
      async findUniqueOrThrow({ args, query }) {
        const { password, email } = args.where;

        const user = await query({
          ...args,
          where: { email },
        });

        const isMatch =
          user &&
          (await bcryptjs.compare(
            password as string,
            user?.password as string
          ));

        if (!isMatch) throw new OperationalError("Invalid Credentionels", 400);
        return user;
      },
      async update({ args, query }) {
        const { password } = args.data;
        if (password) {
          const salt = await bcryptjs.genSalt(10);
          const hashPassword = await bcryptjs.hash(password as string, salt);
          return query({
            ...args,
            data: { ...args.data, password: hashPassword },
          });
        }
        return query(args);
      },
    },
  },
});

export default prisma;
