import { NUMBER_REGEX } from '@constants/index';
import { HandlerException } from '@exceptions/handler.exception';
import { Injectable, PipeTransform } from '@nestjs/common';

import { VALIDATION_EXIT_CODE } from '@constants/enums/error-code.enum';
import { BaseErrorMassage } from '@constants/enums/error-message.enum';

@Injectable()
export class ParseNumberPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const isNumeric = NUMBER_REGEX.test(value);
    if (!isNumeric) {
      throw new HandlerException(
        VALIDATION_EXIT_CODE.INVALID_FORMAT,
        'ParseNumberPipe',
        BaseErrorMassage.NUMBER_PIPE_ERROR,
      );
    }
    return value as unknown as number;
  }
}
