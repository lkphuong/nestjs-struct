import { HandlerException } from '@exceptions/handler.exception';
import { returnObjectsWithPaging } from '@utils/response';
import { Request } from 'express';

import { GetPaginationDto } from '../dtos/get-pagination.dto';
import { ITodoResponse } from '../interfaces';
import { TodoService } from '../services/todo/todo.service';

import { DATABASE_EXIT_CODE } from '@constants/enums/error-code.enum';
import { BaseErrorMassage } from '@constants/enums/error-message.enum';

export const getTodoPagination = async (
  param: GetPaginationDto,
  todoService: TodoService,
  req: Request,
) => {
  const [todos, count] = await Promise.all([
    todoService.getTodoPagination(param),
    todoService.count(),
  ]);

  if (!todos?.length || !count) {
    return new HandlerException(
      DATABASE_EXIT_CODE.NO_CONTENT,
      req.url,
      BaseErrorMassage.NO_CONTENT,
    );
  }

  const totalPage = Math.ceil(count / param.limit);

  const todosFormatted = todos.map((todo) => {
    return <ITodoResponse>{
      id: todo.id,
      title: todo.title,
      description: todo.description,
      created_at: todo.createdAt,
    };
  });

  return returnObjectsWithPaging(count, totalPage, param.page, todosFormatted);
};
