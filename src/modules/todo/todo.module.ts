import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoService } from './services/todo/todo.service';

import { TodoController } from './controllers/todo.controller';

import { TodoEntity } from '@entities/todo.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
