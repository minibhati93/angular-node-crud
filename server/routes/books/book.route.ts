import { Request, Response, Router } from 'express';
import { booksController } from '../../controllers/books/books.controller';

export class BooksRoutes {

  public router: Router = Router();

  getRouter(): Router {
    // Get All Books API
    this.router.get('/', (req: Request, res: Response) => {
      booksController.getAllBooks().then(books => {
        res.status(200).json(books);
      })
    });

    return this.router;
  }

}
