
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { async } from 'rxjs';
import { UpdateTemplateDto } from 'src/templates/dto/update-template.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const prisma = new PrismaClient();
@Injectable()
export class CategoriesService {
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await prisma.templateCategories.create({
      data: {
        name: createCategoryDto.name,
      },
    });

    if (!category) {
      throw new Error('Failed to create category');
    }
    return category;
  } 


  async findAll() {
    const categories = await prisma.templateCategories.findMany();
    if (!categories) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async findOne(id: string) {
    const category = await prisma.templateCategories.findUnique({
      where: { id },
    });
    return category;
  }



  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const findCategory = await prisma.templateCategories.findUnique({
      where: { id },
    });
    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }
    const category = await prisma.templateCategories.update({
      where: { id },
      data: {
        name: updateCategoryDto.name,
      },
    });
    if (!category) {
      throw new Error('Error updating category');
    }
    return category;
  }



  async remove(id: string) {
    const findCategory = await prisma.templateCategories.findUnique({
      where: { id },
    });
    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }
    const category = await prisma.templateCategories.delete({
      where: { id },
    });
    if (!category) {
      throw new Error('Error deleting category');
    }
    return category;
  }
}

