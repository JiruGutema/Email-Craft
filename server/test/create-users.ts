import { PrismaClient } from "@prisma/client";

export const users = [
  {
    username: 'jiru_gutema',
    email: 'jirudagutema@gmail.com',
    password: 'password123',
  },
  {
    username: 'ephraim_debel',
    email: 'ephraimdebel@gmail.com',
    password: 'password456',
  },
  {
    username: 'ashenafi_godana',
    email: 'ashenafigodana@gmail.com',
    password: 'password789',
  },
];

const Prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    const exists = await Prisma.users.findUnique({
      where: { email: user.email },
    });
    if (!exists) {
      await Prisma.users.create({ data: user });
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});