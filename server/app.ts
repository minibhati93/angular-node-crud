import express, {  Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './connect';
import { errorMiddleware } from './helpers/error-middleware';
import { jwtMiddleware } from './helpers/validate-token-middleware';
import { BooksRoutes } from './routes/books/book.route';
import { LibraryRoutes } from './routes/library/library.route';
import { UserRoutes } from './routes/users/users.route';
import path from 'path';

const app: Application = express();
const bookRoutes = new BooksRoutes();
const libRoutes = new LibraryRoutes();
const userRoutes = new UserRoutes();

dotenv.config({ path :__dirname+'/.env'});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', userRoutes.getRouter());
app.use('/api/books', jwtMiddleware.validateToken, bookRoutes.getRouter());
app.use('/api/library', jwtMiddleware.validateToken,libRoutes.getRouter());

connect();

app.use(errorMiddleware.errorHandler);

const server = app.listen(PORT, () => {
  return console.log(`Server is listening on ${PORT}`);
});
