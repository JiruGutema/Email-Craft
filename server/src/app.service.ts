import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly startTime: Date;

  constructor() {
    this.startTime = new Date();
  }

  health(): { status: string; uptime: number; timestamp: string } {
    const uptime = Math.floor((Date.now() - this.startTime.getTime()) / 1000);
    return {
      status: 'OK',
      uptime,
      timestamp: new Date().toISOString(),
    };
  }
}