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

    this.router.post('/add/unread', (req: Request, res: Response, next: NextFunction) => {
      const {books, userId} = req.body;
      libController.addBooksToUnreadStack(books, userId).then(data => {
        res.status(200).json({response : data});
      }).catch(err => {
        next();
      });
    });

    this.router.get('/count/:status/:userId', (req: Request, res: Response, next: NextFunction) => {
      const userId = req.params.userId;
      const status = req.params.status;
      libController.getBooksCountByStatus(userId, status).then(data => {
        res.status(200).json(data.length);
      }).catch(err => {
        next();
      });
    });

    this.router.get('/:status/:userId', (req: Request, res: Response, next: NextFunction) => {
      const userId = req.params.userId;
      const status = req.params.status;
      libController.getBooksByStatus(userId, status).then(data => {
        res.status(200).json({response: data});
      }).catch((err:any) => next() );
    });

    return this.router;
  }
}
