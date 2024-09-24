export const PASSWORD_REGEX =
  /^(?:[0-9]+[a-z!@#$%^&*()]|[a-z!@#$%^&*()]+[0-9])[a-z0-9!@#$%^&*()]*$/i;

export const MOBILE_REGEX = /^[0-9]{10,11}$/;

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
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || 'root',
  HOST: process.env.DB_HOST || 'localhost',
  PORT: parseInt(process.env.DB_PORT) || 3306,
  NAME: process.env.DB_DATABASE || 'test',
  TYPE: process.env.DB_DATABASE_TYPE || 'mysql',
};

export const ROLES_KEY = process.env.ROLES_KEY || 'exampleRoles';

export const SENTRY_DSN = process.env.SENTRY_DSN || 'register-your-dsn';
