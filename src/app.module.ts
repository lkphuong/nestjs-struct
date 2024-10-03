import { JwtConfigModule } from '@config/jwt';
import { AuthGuard } from '@guards/auth.guard';
import { RolesGuard } from '@guards/role.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { LogModule } from '@modules/log/log.module';
import { TodoModule } from '@modules/todo/todo.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigsModule } from './configs';

@Module({
  imports: [JwtConfigModule, ConfigsModule, LogModule, TodoModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
