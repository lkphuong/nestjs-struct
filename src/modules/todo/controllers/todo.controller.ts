import { Request } from 'express';
import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TodoService } from '../services/todo/todo.service';

import { catchErrController } from '@utils/error.util';

import { GetPaginationDto } from '../dtos/get-pagination.dto';

import { getTodoPagination } from '../funcs';

import { HandlerException } from '@exceptions/HandlerException';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: 'Lấy danh sách todos phân trang' })
  @Get()
  async getTodoPagination(
    @Query() param: GetPaginationDto,
    @Req() req: Request,
  ) {
    try {
      const todos = await getTodoPagination(param, this.todoService, req);

      if (todos instanceof HandlerException) {
        throw todos;
      }

      return todos;
    } catch (error) {
      catchErrController(error, req);
    }
  }

  // TODO: Thêm các API khác
}
