import { Module } from '@nestjs/common';

import { SentryService } from './services/sentry/sentry.service';

@Module({
  providers: [SentryService],
})
export class LogModule {}
