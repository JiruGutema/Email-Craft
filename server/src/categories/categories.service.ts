// src/categories/categories.service.ts
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class CategoriesService {
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await prisma.templateCategories.create({
        data: { name: createCategoryDto.name },
      });
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new ConflictException('Category already exists');
      }
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll() {
    const categories = await prisma.templateCategories.findMany();
    if (categories.length === 0) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async findOne(id: string) {
    const category = await prisma.templateCategories.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await prisma.templateCategories.update({
        where: { id },
        data: { name: updateCategoryDto.name },
      });
    } catch (err: any) {
      if (err.code === 'P2025') {
        throw new NotFoundException('Category not found');
      }
      if (err.code === 'P2002') {
        throw new ConflictException('Category with this name already exists');
      }
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async remove(id: string) {
    try {
      return await prisma.templateCategories.delete({
        where: { id },
      });
    } catch (err: any) {
      if (err.code === 'P2025') {
        throw new NotFoundException('Category not found');
      }
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
