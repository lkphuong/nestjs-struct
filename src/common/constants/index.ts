import * as dotenv from 'dotenv';

dotenv.config();

export const PASSWORD_REGEX =
  /^(?:[0-9]+[a-z!@#$%^&*()]|[a-z!@#$%^&*()]+[0-9])[a-z0-9!@#$%^&*()]*$/i;

export const MOBILE_REGEX = /^[0-9]{10,11}$/;

export const NUMBER_REGEX = /^\d+$/;

export const SQL_KEYWORD_REGEX =
  /(\b(SELECT|UPDATE|DELETE|INSERT|FROM|WHERE|DROP|ALTER)\b)/i;

export const SQL_LOGIC_REGEX = /(\b(UNION|ALL|ANY|EXISTS|IN|LIKE|OR|AND)\b)/i;

export const SQL_SPECIAL_CHARACTERS_REGEX = /(--|\/\*|\*\/|;)/;

export const SQL_QUOTES_REGEX = /('|")/;

export const SQL_REGEX = [
  SQL_KEYWORD_REGEX,
  SQL_LOGIC_REGEX,
  SQL_SPECIAL_CHARACTERS_REGEX,
  SQL_QUOTES_REGEX,
];

export const DATABASE = {
  USER: process.env.DB_USERNAME || '',
  PASSWORD: process.env.DB_PASSWORD || '',
  HOST: process.env.DB_HOST || '',
  PORT: parseInt(process.env.DB_PORT) || 6543,
  NAME: process.env.DB_DATABASE || '',
  TYPE: process.env.DB_DATABASE_TYPE || '',
};

export const JWT = {
  SECRET: process.env.JWT_SECRET || 'exampleSecret',
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
};

export const SALT = parseInt(process.env.SALT) || 10;

export const IS_PUBLIC_KEY = process.env.IS_PUBLIC_KEY || 'isPublic';

export const ROLES_KEY = process.env.ROLES_KEY || 'exampleRoles';

export const SENTRY_DSN = process.env.SENTRY_DSN || 'register-your-dsn';
