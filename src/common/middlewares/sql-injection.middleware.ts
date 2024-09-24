import { VALIDATION_EXIT_CODE } from '@constants/enums/error-code.enum';
import { HandlerException } from '@exceptions/HandlerException';
import { HttpException, Injectable } from '@nestjs/common';
import { catchErrService } from '@utils/error.util';
import { validateInputObject } from '@utils/injection';

@Injectable()
export class SqlInjectionMiddleware {
  use(req: any, res: any, next: () => void) {
    try {
      const param = { ...req.body, ...req.query };

      if (param) {
        const valid = validateInputObject(param);

        if (valid) {
          throw new HandlerException(
            VALIDATION_EXIT_CODE.INVALID_CHARACTOR,
            req.url,
            valid.message,
          );
        }
      }
      next();
    } catch (error) {
      catchErrService('SqlInjectionMiddleware', error);
      if (error instanceof HttpException) throw error;
      else throw new HandlerException(6001, req.method, req.url);
    }
  }
}
