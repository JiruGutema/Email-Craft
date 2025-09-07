import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { PrismaClient } from '@prisma/client';
import { Logger } from 'src/utils/utils';

const prisma = new PrismaClient();

@Injectable()
export class DraftsService {
  async create(createDraftDto: CreateDraftDto, userId: string) {
    const  subject = createDraftDto.subject;
    const to = createDraftDto.to;

    const user = await prisma.users.findUnique({ where: { id: userId } });
    const draft_Exist = await prisma.drafts.findFirst({ where: { subject, to } });
    if (!user) {
      throw new UnauthorizedException(`User with id ${userId} not found`);
    }

    if (draft_Exist) {
      throw new ForbiddenException(`Draft with subject "${subject}" and to "${to}" already exists`);
    }

    const draft = await prisma.drafts.create({
      data: { ...createDraftDto, userId },
    });
    if (draft) {
      return draft;
    } else {
      throw new NotFoundException(`Failed to create draft`);
    }
  }

  async findAll() { //! Add Pagination to this page
    const res = await prisma.drafts.findMany();
    if (res) {
      return res;
    } else {
      throw new NotFoundException(`No drafts found`);
    }
  }

  async findOne(id: string) {
    const draft = await prisma.drafts.findUnique({ where: { id } });
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
      throw new ForbiddenException(`You do not have permission to update this draft`);
    }
    const res =  await prisma.drafts.update({
      where: { id },
      data: updateDraftDto,
    });
    if(res){
      return res;
    }
    else {
      throw new NotFoundException(`Failed to update draft with id ${id}`);
    }
  }

  async remove(id: string, userId: string) {
    const draft = await prisma.drafts.findUnique({ where: { id } });
    if (!draft) {
      throw new NotFoundException(`Draft with id ${id} not found`);
    }
    if (draft.userId !== userId) {
      throw new ForbiddenException(`You do not have permission to delete this draft`);
    }
    const res = await prisma.drafts.delete({ where: { id } });
    if (res) {
      return { message: 'Draft deleted successfully' };
    } else {
      throw new NotFoundException(`Failed to delete draft with id ${id}`);
    }
  }
}
