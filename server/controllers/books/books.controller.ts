import { Request, Response } from 'express';
import { Book } from '../../models/book';

export class BooksController {
  public getAllBooks = async () => {
    const books: any = await Book.find({}).exec();
    return books;
  }
}

export const booksController = new BooksController();
