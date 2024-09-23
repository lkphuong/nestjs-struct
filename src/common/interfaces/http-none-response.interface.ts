export type HttpNoneResponse = {
  error_code: number;
  message: string | null;
  errors:
    | { [key: string]: string | { [key: string]: string }[] }
    | { [key: string]: string | { [key: string]: string }[] }[]
    | null;
};
