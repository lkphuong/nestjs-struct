import { SALT } from '@constants/index';
import { Public } from '@decorator/roles.decorator';
import { UserEntity } from '@entities/user.entity';
import { HandlerException } from '@exceptions/handler.exception';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchErrController } from '@utils/error.util';
import { returnObjects } from '@utils/response';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { ILoginResponse, IRegisterResponse } from '../interfaces';
import { AuthService } from '../services/auth.service';

import { ErrorMessage } from '../constants/enums/error-message.enum';
import {
  DATABASE_EXIT_CODE,
  VALIDATION_EXIT_CODE,
} from '@constants/enums/error-code.enum';
import { ROLE } from '@constants/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() param: RegisterDto, @Req() req: Request) {
    try {
      const { username, password } = param;

      const user = await this.authService.getUserByUsername(username);

      if (user) {
        throw new HandlerException(
          DATABASE_EXIT_CODE.UNIQUE_FIELD_VALUE,
          req.path,
          ErrorMessage.USER_ALREADY_EXISTS,
        );
      }

      const hash = await bcrypt.hash(password, SALT);

      let newUser = new UserEntity();
      newUser.username = username;
      newUser.password = hash;
      newUser.role = ROLE.USER;

      newUser = await this.authService.save(newUser);

      if (!newUser) {
        throw new HandlerException(
          DATABASE_EXIT_CODE.OPERATOR_ERROR,
          req.path,
          ErrorMessage.CREATE_USER_FAILED,
        );
      }

      //#region create jwt token
      const accessToken = await this.jwtService.signAsync({
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      });
      //#endregion

      const response: IRegisterResponse = {
        id: newUser.id,
        access_token: accessToken,
      };

      return returnObjects(response);
    } catch (error) {
      catchErrController(error, req);
    }
  }

  @Public()
  @Post('login')
  async login(@Body() param: LoginDto, @Req() req: Request) {
    try {
      const { username, password } = param;

      const user = await this.authService.getUserByUsername(username);

      if (!user) {
        throw new HandlerException(
          DATABASE_EXIT_CODE.NO_CONTENT,
          req.path,
          ErrorMessage.USER_NOT_FOUND,
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new HandlerException(
          VALIDATION_EXIT_CODE.NO_MATCHING,
          req.path,
          ErrorMessage.INVALID_PASSWORD,
        );
      }

      //#region create jwt token
      const accessToken = await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
        role: user.role,
      });
      //#endregion

      const response: ILoginResponse = {
        id: user.id,
        access_token: accessToken,
      };

      return returnObjects(response);
    } catch (error) {
      catchErrController(error, req);
    }
  }
}
