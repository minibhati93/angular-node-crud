import { Request, Response, Router, NextFunction } from 'express';
import { libController } from '../../controllers/library/library.controller';

export class LibraryRoutes {
  public router: Router = Router();

  getRouter(): Router {

    this.router.get('/login', (req: Request, res: Response, next: NextFunction) => {
      const headers = req.headers.authorization || '';
      const token = headers.split(/\s+/).pop()||'';
      const auth = Buffer.from(token, 'base64').toString();
      const parts=auth.split(/:/);                         // split on colon
      const username=parts[0];
      const password=parts[1];
      libController.authenticate(username, password)
      .then(response => response ?
        res.status(200).json(response) : next({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
    });

    this.router.post('/books/unread', (req: Request, res: Response) => {
      const {books, userId} = req.body;
      libController.addBooksToUnreadStack(books, userId).then(data => {
        res.status(200).json({response : data});
      }).catch(err => {
        console.log(' error in route ', err);
      });
    });

    return this.router;
  }
}
