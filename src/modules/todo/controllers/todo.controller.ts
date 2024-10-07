import { Public, Roles } from '@decorator/roles.decorator';
import { TodoEntity } from '@entities/todo.entity';
import { HandlerException } from '@exceptions/handler.exception';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseNumberPipe } from '@pipes/parse-number.pipe';
import { catchErrController } from '@utils/error.util';
import { returnObjects } from '@utils/response';
import { Request } from 'express';

import { CreateTodoDto } from '../dtos/create.dto';
import { GetPaginationDto } from '../dtos/get-pagination.dto';
import { getTodoPagination } from '../funcs';
import { ITodoResponse } from '../interfaces';
import { TodoService } from '../services/todo/todo.service';

import { ErrorMessage } from '../constants/enums/error-message.enum';
import { DATABASE_EXIT_CODE } from '@constants/enums/error-code.enum';
import { BaseErrorMassage } from '@constants/enums/error-message.enum';
import { ROLE } from '@constants/enums/role.enum';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: 'Lấy danh sách todos phân trang' })
  @Public()
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

  @ApiOperation({ summary: 'Xem chi tiết todo' })
  @Roles(ROLE.ADMIN, ROLE.USER)
  @Get(':id')
  async getTodoById(
    @Param('id', ParseNumberPipe) id: number,
    @Req() req: Request,
  ) {
    try {
      const todo = await this.todoService.getTodoById(id);

      if (!todo) {
        throw new HandlerException(
          DATABASE_EXIT_CODE.NO_CONTENT,
          req.path,
          BaseErrorMassage.NO_CONTENT,
        );
      }

      const todoFormatted: ITodoResponse = {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        created_at: todo.createdAt,
      };

      return returnObjects(todoFormatted);
    } catch (error) {
      catchErrController(error, req);
    }
  }

  @ApiOperation({ summary: 'Thêm mới todo' })
  @Post()
  async createTodo(@Body() param: CreateTodoDto, @Req() req: Request) {
    try {
      const { title, description, is_completed } = param;

      let newTodo = new TodoEntity();
      newTodo.title = title;
      newTodo.description = description;
      newTodo.isCompleted = is_completed;

      newTodo = await this.todoService.save(newTodo);

      if (!newTodo) {
        throw new HandlerException(
          DATABASE_EXIT_CODE.OPERATOR_ERROR,
          req.path,
          ErrorMessage.CREATE_FAILED,
        );
      }

      return returnObjects({ id: newTodo.id });
    } catch (error) {
      catchErrController(error, req);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Upload file' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      const { originalname, filename, destination } = file;

      console.log('destination', destination);
      console.log('file: ', file);

      return returnObjects({ originalname, filename });
    } catch (error) {
      catchErrController(error, req);
    }
  }

  @ApiOperation({ summary: 'Cập nhật todo' })
  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() param: CreateTodoDto,
    @Req() req: Request,
  ) {
    try {
      const { title, description, is_completed } = param;

      let todo = await this.todoService.getTodoById(id);

      if (!todo) {
        throw new HandlerException(
          DATABASE_EXIT_CODE.NO_CONTENT,
          req.path,
          BaseErrorMassage.NO_CONTENT,
        );
      }

      todo.title = title;
      todo.description = description;
      todo.isCompleted = is_completed;

      todo = await this.todoService.save(todo);

      if (!todo) {
        throw new HandlerException(
          DATABASE_EXIT_CODE.OPERATOR_ERROR,
          req.path,
          ErrorMessage.UPDATE_FAILED,
        );
      }

      return returnObjects({ id: todo.id });
    } catch (error) {
      catchErrController(error, req);
    }
  }

  @ApiOperation({ summary: 'Xóa todo' })
  @Delete(':id')
  async deleteTodo(
    @Param('id', ParseNumberPipe) id: number,
    @Req() req: Request,
  ) {
    try {
      const todo = await this.todoService.getTodoById(id);

      if (!todo) {
        throw new HandlerException(
          DATABASE_EXIT_CODE.NO_CONTENT,
          req.path,
          BaseErrorMassage.NO_CONTENT,
        );
      }

      todo.deleted = true;

      const result = await this.todoService.save(todo);

      if (!result) {
        throw new HandlerException(
          DATABASE_EXIT_CODE.OPERATOR_ERROR,
          req.path,
          ErrorMessage.UPDATE_FAILED,
        );
      }

      return returnObjects({ id: todo.id });
    } catch (error) {
      catchErrController(error, req);
    }
  }
}
