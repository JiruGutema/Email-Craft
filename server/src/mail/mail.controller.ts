import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { SendEmailGuard } from './guards/sendEmail.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @UseGuards(AuthGuard, SendEmailGuard)
  @ApiOperation({ summary: 'Send an email' })
  @Post('send')
  async sendEmail(@Request() req, @Body() body: CreateMailDto) {
    return this.mailService.sendEmail(req.user.userId, body);
  }
}
