import { IHttpPagingResponse } from '@interfaces/http-paging-response.interface';
import { IHttpResponse } from '@interfaces/http-response.interface';

import { UNKNOW_EXIT_CODE } from '@constants/enums/error-code.enum';
import { BaseErrorMassage } from '@constants/enums/error-message.enum';

export const returnObjects = <T>(
  data: T | T[] | null,
  errorCode?: number,
  message?: string | null,
  errors?: [{ [key: string]: string }] | null,
): IHttpResponse<T> => {
  return {
    data: data,
    error_code: data != null ? 0 : errorCode ?? 0,
    message: data !== null ? null : message,
    errors: errors ?? null,
  };
};

export const returnObjectsWithPaging = <T>(
  amount: number,
  pages: number,
  page: number,
  data: T | T[] | null,
  errors?: [{ [key: string]: string }] | null,
): IHttpPagingResponse<T> => {
  return {
    data: {
      pages,
      page,
      amount,
      data,
    },
    error_code: data != null ? 0 : UNKNOW_EXIT_CODE.UNKNOW_ERROR,
    message: data !== null ? null : BaseErrorMassage.UNKNOW_ERROR,
    errors: errors ?? null,
  };
};
