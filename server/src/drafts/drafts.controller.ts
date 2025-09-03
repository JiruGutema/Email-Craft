import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { DraftsService } from './drafts.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('drafts')
export class DraftsController {
  constructor(private readonly draftsService: DraftsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createDraftDto: CreateDraftDto, @Request() req) {
    const userId = req.user.userId;
    return this.draftsService.create(createDraftDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.draftsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.draftsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDraftDto: UpdateDraftDto, @Request() req) {
    const userId = req.user.userId;
    return this.draftsService.update(id, updateDraftDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.draftsService.remove(id, userId);
  }
}
