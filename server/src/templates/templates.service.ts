import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from 'rxjs';

const prisma = new PrismaClient();
@Injectable()
export class TemplatesService {
  async create(createTemplateDto: CreateTemplateDto) {
    const template = await prisma.emailTemplates.create({
      data: {
        title: createTemplateDto.title,
        description: createTemplateDto.description,
        categoryId: createTemplateDto.categoryId,
        htmlContent: createTemplateDto.htmlContent,
        tags: createTemplateDto.tags,
      },
    });

    if (!template) {
      throw new Error('Failed to create template');
    }
    return template;
  }

  async findAll() {
    const templates = await prisma.emailTemplates.findMany();
    if (!templates) {
      throw new NotFoundException('No templates found');
    }
    return templates;
  }

  async findOne(id: string) {
    const template = await prisma.emailTemplates.findUnique({
      where: { id },
    });
    return template;
  }



  async update(id: string, updateTemplateDto: UpdateTemplateDto) {
    const findTemplate = await prisma.emailTemplates.findUnique({
      where: { id },
    });
    if (!findTemplate) {
      throw new NotFoundException('Template not found');
    }
    const template = await prisma.emailTemplates.update({
      where: { id },
      data: {
        title: updateTemplateDto.title,
        description: updateTemplateDto.description,
        categoryId: updateTemplateDto.categoryId,
        htmlContent: updateTemplateDto.htmlContent,
        tags: updateTemplateDto.tags,
      },
    });
    if (!template) {
      throw new Error('Error updating template');
    }
    return template;
  }

  async remove(id: string) {
    const findTemplate = await prisma.emailTemplates.findUnique({
      where: { id },
    });
    if (!findTemplate) {
      throw new NotFoundException('Template not found');
    }
    const template = await prisma.emailTemplates.delete({
      where: { id },
    });
    if (!template) {
      throw new Error('Error deleting template');
    }
    return template;
  }
}
