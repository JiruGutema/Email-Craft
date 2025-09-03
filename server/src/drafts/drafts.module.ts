import { Module } from '@nestjs/common';
import { DraftsService } from './drafts.service';
import { DraftsController } from './drafts.controller';
import { Auth } from 'googleapis';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  controllers: [DraftsController],
  providers: [DraftsService, AuthGuard],
})
export class DraftsModule {}
