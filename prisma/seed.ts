import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("tq_admin909", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@tq.com" },
    update: {},
    create: {
      name: "Admin Total Quality",
      email: "admin@tq.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Admin account created:", {
    email: admin.email,
    role: admin.role,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
