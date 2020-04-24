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

    this.router.get('/:id', (req: Request, res: Response) => {
      const id = req.params.id;
      booksController.getBookById(id).then(book => res.json(book));
    });

    this.router.put('/:id', (req: Request, res: Response) => {
      const id = req.params.id;
      const body = req.body;
      booksController.updateBookById(id, body).then(book => res.json(book) );
    });

    this.router.delete('/:id', (req: Request, res: Response) => {
      const id = req.params.id;
      booksController.deleteBookById(id).then(sucess => res.json(sucess) );
    });

    return this.router;
  }

}
