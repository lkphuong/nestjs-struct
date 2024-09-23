import { Module } from '@nestjs/common';

import { LogModule } from '@modules/log/log.module';
import { TodoModule } from '@modules/todo/todo.module';

@Module({
  imports: [LogModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
