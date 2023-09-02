import 'dotenv/config';
import express from 'express';
import { DataSource } from 'typeorm/data-source/DataSource';
import userRoutes from './routes/user';

if (process.env.DB_TYPE !== 'postgres') {
  throw new Error("Invalid DB_TYPE: Only 'postgres' is supported.");
}

const dataBase = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
});

dataBase
  .initialize()
  .then(() => {
    const app = express();

    // Middleware setup
    app.use(express.json());

    // Use routes
    app.use('/user', userRoutes);

    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000/');
    });
  })
  .catch((error) => console.log(error));
