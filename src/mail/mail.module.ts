import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { Auth } from 'googleapis';
import { SendEmailGuard } from './guards/sendEmail.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [AuthModule]
  
})
export class MailModule {}
