import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoEntity } from '@entities/todo.entity';

import { GetPaginationDto } from '@modules/todo/dtos/get-pagination.dto';

import { catchErrService } from '@utils/error.util';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async getTodoPagination(param: GetPaginationDto): Promise<TodoEntity[]> {
    try {
      const { page, limit } = param;

      const todos = await this.todoRepository
        .createQueryBuilder()
        .where('deleted = false')
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      return todos;
    } catch (error) {
      catchErrService('TodoService.getTodoPagination', error);
      return null;
    }
  }

  async count(): Promise<number | null> {
    try {
      const count = await this.todoRepository
        .createQueryBuilder()
        .where('deleted = false')
        .getCount();

      return count;
    } catch (error) {
      catchErrService('TodoService.count', error);
      return null;
    }
  }
}
