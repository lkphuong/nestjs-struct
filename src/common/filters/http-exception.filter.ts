import { IHttpResponse } from '@interfaces/http-response.interface';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { convertString2JSON } from '@utils/string.utils';

import {
  SERVER_EXIT_CODE,
  VALIDATION_EXIT_CODE,
} from '@constants/enums/error-code.enum';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    let status = 500;
    let errorCode = SERVER_EXIT_CODE.INTERNAL_SERVER_ERROR;
    let message = null;

    if (error.response) {
      status = error.response.status ?? error.getStatus();
      errorCode = error.response.errorCode;
      message = error.response.message ?? error.message;
    } else {
      message = error.message;
    }

    const data = convertString2JSON(message);

    let response: IHttpResponse<null> = null;

    response = {
      data: null,
      error_code: errorCode ?? VALIDATION_EXIT_CODE.EMPTY,
      message: Object.keys(data).length > 0 ? null : message,
      errors: Object.keys(data).length > 0 ? data : null,
    };

    return res.status(status).json(response);
  }
}
