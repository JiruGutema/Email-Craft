import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Logger } from 'src/utils/utils';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }
  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req) {
    const userId = req.user.userId;
    return this.templatesService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/favourites')
  getUserFavorites(@Req() req) {
    const userId = req.user.userId;
    return this.templatesService.getUserFavorites(userId);
  }

  @UseGuards(AuthGuard)
  @Post('/favourites/:templateId')
  addUserFavorite(@Req() req, @Param('templateId') templateId: string) {
    const userId = req.user.userId;
    return this.templatesService.favoriteTemplate(userId, templateId);
  }
  @UseGuards(AuthGuard)
  @Delete('/favourites/:templateId')
  removeUserFavorite(@Req() req, @Param('templateId') templateId: string) {
    const userId = req.user.userId;
    return this.templatesService.unfavoriteTemplate(userId, templateId);
  } 
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }
  
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templatesService.update(id, updateTemplateDto);
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }

}
