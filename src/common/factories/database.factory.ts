import { DATABASE } from '@constants/index';
import { ISOLATION_LEVEL } from 'tedious';

export const databaseFactory = () => ({
  type: DATABASE.TYPE,
  host: DATABASE.HOST,
  port: DATABASE.PORT,
  database: DATABASE.NAME,
  username: DATABASE.USER,
  password: DATABASE.PASSWORD,
  maxQueryExecutionTime: 3000,
  entities: [`${__dirname}/../entities/**/*.entity{.ts,.js}`],
  synchronize: false,
  options: {
    isolation: ISOLATION_LEVEL.SNAPSHOT,
    connectionIsolationLevel: ISOLATION_LEVEL.SNAPSHOT,
    encrypt: false,
  },
});
