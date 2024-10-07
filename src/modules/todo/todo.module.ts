import { TodoEntity } from '@entities/todo.entity';
import { multerFactory } from '@factories/multer.factory';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo/todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    MulterModule.registerAsync({
      imports: [],
      useFactory: multerFactory,
      inject: [],
    }),
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
