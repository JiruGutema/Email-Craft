import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const category = "Promotion";

async function seedTemplates() {
    let createdTemplate = await prisma.templateCategories.create({
      data: {
        name: category,
      },
    });
    console.log(`Created template with ID: ${createdTemplate.id}`);
  };

seedTemplates();