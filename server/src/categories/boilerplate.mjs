import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const category = "Welcome";

async function seedTemplates() {
    let createdTemplate = await prisma.templateCategories.create({
      data: {
        name: category,
      },
    });
    console.log(`Created template with ID: ${createdTemplate.id}`);
  };

// seedTemplates();
console.log(await prisma.templateCategories.findMany());

