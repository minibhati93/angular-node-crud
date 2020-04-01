import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class BooksController {
  public getAllBooks = () => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '../../stubs/books.json'), 'utf-8' , (err, contents)=> {
        if (err) reject(err); // we'll not consider error handling for now
        resolve(contents);
      });
    });
  }
}

export const booksController = new BooksController();
