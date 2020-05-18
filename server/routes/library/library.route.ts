import { Request, Response, Router, NextFunction } from 'express';
import { libController } from '../../controllers/library/library.controller';

export class LibraryRoutes {
  public router: Router = Router();

  getRouter(): Router {

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
