import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  sendEmail(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.emailNotify();
  }

}
