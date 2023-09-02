import path from 'path';
import { DataSourceOptions } from 'typeorm';
import { __TEST__ } from '../constants';

export default {
  name: 'default',
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || ':memory:',
  synchronize: true,
  logging: false,
  migrationsRun: true,
  dropSchema: __TEST__,
  entities: [
    path.join(__dirname, '..', 'entity', '**', '*.{ts,js}'),
    path.join(__dirname, '..', 'entity', '*.{ts,js}'),
  ],
  migrations: [
    path.join(__dirname, '..', 'database', 'migrations', '*.{ts,js}'),
  ],
  cli: {
    entitiesDir: path.join(__dirname, '..', 'entity'),
    migrationsDir: path.join(__dirname, '..', 'database', 'migrations'),
  },
} as DataSourceOptions;
