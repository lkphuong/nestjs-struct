import { HttpException, HttpStatus } from '@nestjs/common';
import { writeLog } from '@utils/log.utils';

import { AUTHENTICATION_EXIT_CODE } from '@constants/enums/error-code.enum';

export class UnauthorizedException extends HttpException {
  constructor(path?: string, message?: string, status?: HttpStatus) {
    super(
      {
        status_code: AUTHENTICATION_EXIT_CODE.NO_TOKEN ?? 0,
        message: 'No token provided.',
        data: null,
        errors: null,
      },
      status || HttpStatus.UNAUTHORIZED,
    );

    writeLog(path, message ?? 'No token provided.');
  }
}
