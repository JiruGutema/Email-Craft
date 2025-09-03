import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags("Subscription")
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Add email to subscription pool' })
  AddToSubscriptionPool(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.addToSubscriptionPool(createSubscriptionDto);
  }
}
