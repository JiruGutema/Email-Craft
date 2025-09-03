import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PrismaClient } from '@prisma/client';

const Prisma  = new PrismaClient()
@Injectable()
export class SubscriptionService {
  async addToSubscriptionPool(createSubscriptionDto: CreateSubscriptionDto) {
    const user_email = createSubscriptionDto;
    const existingEmail = await Prisma.subscription.findUnique({
      where: { email: user_email.email },
    });
    if (existingEmail) {
      return { message: 'Email already subscribed' };

    }
    const addEmailToSubscriptionPool = await Prisma.subscription.create({
      data: user_email,
    });
    if (addEmailToSubscriptionPool) {
      return { message: 'You have been subscribed successfully. Thank you!' };
    }
    else {
      return { message: 'Failed to add email to subscription pool' };
    }
  }

  async getAllSubscribers() {
    const subscribers = await Prisma.subscription.findMany();
    return subscribers;
  }
}
