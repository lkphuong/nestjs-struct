import { UNKNOW_EXIT_CODE } from '@constants/enums/error-code.enum';
import { BaseErrorMassage } from '@constants/enums/error-message.enum';
import { HttpPagingResponse } from '@interfaces/http-paging-response.interface';
import { HttpResponse } from '@interfaces/http-response.interface';

export const returnObjects = <T>(
  data: T | T[] | null,
  errorCode?: number,
  message?: string | null,
  errors?: [{ [key: string]: string }] | null,
): HttpResponse<T> => {
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
  errorCode?: number,
  message?: string | null,
  errors?: [{ [key: string]: string }] | null,
): HttpPagingResponse<T> => {
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
