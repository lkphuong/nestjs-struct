import { TodoEntity } from '@entities/todo.entity';
import { GetPaginationDto } from '@modules/todo/dtos/get-pagination.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchErrService } from '@utils/error.util';
import { Repository } from 'typeorm';

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

  async getTodoById(id: number): Promise<TodoEntity | null> {
    try {
      const todo = await this.todoRepository.findOne({
        where: {
          id,
          deleted: false,
        },
      });

      return todo;
    } catch (error) {
      catchErrService('TodoService.getTodoById', error);
      return null;
    }
  }

  async save(todo: TodoEntity): Promise<TodoEntity | null> {
    try {
      const newTodo = await this.todoRepository.save(todo);

      return newTodo;
    } catch (error) {
      catchErrService('TodoService.create', error);
      return null;
    }
  }

  async deleteTodoById(id: number): Promise<boolean> {
    try {
      await this.todoRepository.update(
        { id, deleted: false },
        {
          deleted: true,
        },
      );

      return true;
    } catch (error) {
      catchErrService('TodoService.deleteTodoById', error);
      return false;
    }
  }
}
