import { Request } from 'express';

import { TodoService } from '../services/todo/todo.service';

import { GetPaginationDto } from '../dtos/get-pagination.dto';

import { HandlerException } from '@exceptions/HandlerException';

import { returnObjectsWithPaging } from '@utils/response';

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
    return {
      id: todo.id,
      title: todo.title,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  });

  return returnObjectsWithPaging(count, totalPage, param.page, todosFormatted);
};
