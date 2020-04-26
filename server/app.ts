import express, {  Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './connect';
import { BooksRoutes } from './routes/books/book.route';
import { LibraryRoutes } from './routes/library/library.route';
import { errorMiddleware } from './helpers/error-middleware';

const app: Application = express();
const bookRoutes = new BooksRoutes();
const libRoutes = new LibraryRoutes();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes.getRouter());
app.use('/api/library', libRoutes.getRouter());

connect();

app.use(errorMiddleware.errorHandler);

const server = app.listen(PORT, () => {
  return console.log(`Server is listening on ${PORT}`);
});
