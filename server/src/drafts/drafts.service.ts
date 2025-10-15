import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DraftsService {
  async create(createDraftDto: CreateDraftDto, userId: string) {
    const { subject, to } = createDraftDto;

    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException(`User with id ${userId} not found`);
    }

    const existingDraft = await prisma.drafts.findFirst({
      where: {
        subject,
        to: { equals: to }, 
        userId,
      },
    });
    if (existingDraft) {
      throw new ForbiddenException(
        `Draft with subject "${subject}" and to "${to}" already exists`,
      );
    }

    try {
      return await prisma.drafts.create({
        data: { ...createDraftDto, userId },
      });
    } catch (error) {
      console.error('Error creating draft:', error);
      throw new InternalServerErrorException('Failed to create draft');
    }
  }

  async findAll(userId: string) {
    const drafts = await prisma.drafts.findMany({ where: { userId } });
    if (drafts.length === 0) {
      throw new NotFoundException('No drafts found');
    }
    return drafts;
  }

  async findOne(id: string, userId: string) {
    const draft = await prisma.drafts.findFirst({ where: { id, userId } });
    if (!draft) {
      throw new NotFoundException(`Draft with id ${id} not found`);
    }
    return draft;
  }

  async update(id: string, updateDraftDto: UpdateDraftDto, userId: string) {
    const draft = await prisma.drafts.findUnique({ where: { id } });
    if (!draft) {
      throw new NotFoundException(`Draft with id ${id} not found`);
    }
    if (draft.userId !== userId) {
      throw new ForbiddenException(
        `You do not have permission to update this draft`,
      );
    }

    try {
      return await prisma.drafts.update({
        where: { id },
        data: updateDraftDto,
      });
    } catch (error) {
      console.error('Error updating draft:', error);
      throw new InternalServerErrorException(
        `Failed to update draft with id ${id}`,
      );
    }
  }

  async remove(id: string, userId: string) {
    const draft = await prisma.drafts.findUnique({ where: { id } });
    if (!draft) {
      throw new NotFoundException(`Draft with id ${id} not found`);
    }
    if (draft.userId !== userId) {
      throw new ForbiddenException(
        `You do not have permission to delete this draft`,
      );
    }

    try {
      await prisma.drafts.delete({ where: { id } });
      return { message: 'Draft deleted successfully' };
    } catch (error) {
      console.error('Error deleting draft:', error);
      throw new InternalServerErrorException(
        `Failed to delete draft with id ${id}`,
      );
    }
  }
}
