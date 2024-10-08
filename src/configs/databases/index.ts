import { DATABASE } from '@constants/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: DATABASE.HOST,
      port: DATABASE.PORT,
      database: DATABASE.NAME,
      username: DATABASE.USER,
      password: DATABASE.PASSWORD,
      maxQueryExecutionTime: 3000,
      autoLoadEntities: true,
      synchronize: false,
      options: {
        encrypt: false,
      },
    }),
  ],
})
export class DatabaseModule {}
