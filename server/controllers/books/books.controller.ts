import { Request, Response } from 'express';
import { Book } from '../../models/book';

export class BooksController {
  public getAllBooks = async () => {
    const books: any = await Book.find({}).exec();
    return books;
  }

  public getBookById = async (id: any) => {
    return await Book.findById(id).exec();
  }

  public updateBookById = (id: any, body: any) => {
    return Book.update({ _id: id }, body).exec().then((book) => {
      return book;
    });
  }

  public deleteBookById = async (id: any) => {
    return await Book.findByIdAndRemove(id).exec();
  }
}

export const booksController = new BooksController();
