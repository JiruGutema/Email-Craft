import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { Logger } from 'src/utils/utils';

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

  async findAll(userId: string) {
    const templates = await prisma.emailTemplates.findMany({
      include: {
        favorites: {
          where: { userId },
          select: { id: true },
        },
      },
    });

    if (!templates || templates.length === 0) {
      throw new NotFoundException('No templates found');
    }
    return templates.map((template) => ({
      ...template,
      isFavorite:
        Array.isArray(template.favorites) && template.favorites?.length > 0,
      favorites: template.favorites ?? [],
    }));
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

  async favoriteTemplate(userId: string, templateId: string) {
    // Check if template exists
    const template = await prisma.emailTemplates.findUnique({
      where: { id: templateId },
    });
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    // Check if already favorited
    const alreadyFavorited = await prisma.favorites.findFirst({
      where: { userId, templateId },
    });
    if (alreadyFavorited) {
      await prisma.favorites.deleteMany({
      where: { userId, templateId },
      });
    return {
      message: 'Template unfavorited successfully',
    };
    }

    // Create favorite
    const favorite = await prisma.favorites.create({
      data: {
        templateId,
        userId,
      },
      include: { template: true },
    });

    if (!favorite) {
      throw new Error('Error favoriting template');
    }

    return {
      message: 'Template favorited successfully',
    };
  }

  async unfavoriteTemplate(userId: string, templateId: string) {
    const findTemplate = await prisma.emailTemplates.findUnique({
      where: { id: templateId },
    });
    if (!findTemplate) {
      throw new NotFoundException('Template not found');
    }

    const alreadyFavorited = await prisma.favorites.findFirst({
      where: {
        userId,
        templateId,
      },
    });

    if (!alreadyFavorited) {
      throw new Error('Template not favorited');
    }

    const unfavorite = await prisma.favorites.deleteMany({
      where: {
        userId,
        templateId,
      },
    });

    if (!unfavorite) {
      throw new Error('Error unfavoriting template');
    }

    return { message: 'Template unfavorited successfully' };
  }

  async getUserFavorites(userId: string) {
    const favorites = await prisma.favorites.findMany({
      where: { userId },
      include: { template: true },
    });
    // Extract only the templates from the favorites
    const favoriteTemplates = favorites
      .map(fav => fav.template)
      .filter(template => !!template);
    return favoriteTemplates;

  }
}
