import { HttpException, HttpStatus } from '@nestjs/common';
import { writeLog } from '@utils/log.utils';

export class HandlerException extends HttpException {
  constructor(
    errorCode?: number,
    path?: string,
    message?: string,
    status?: HttpStatus,
  ) {
    super(
      {
        status_code: errorCode ?? 0,
        message: message ?? `Internal Server Error.`,
        data: null,
        errors: null,
      },
      status || HttpStatus.BAD_REQUEST,
    );

    writeLog(path, message ?? `Internal Server Error.`);
  }
}
