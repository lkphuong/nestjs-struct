import { Module } from '@nestjs/common';

import { DatabaseModule } from './databases';
import { JwtConfigModule } from './jwt';

@Module({
  imports: [DatabaseModule, JwtConfigModule],
})
export class ConfigsModule {}
