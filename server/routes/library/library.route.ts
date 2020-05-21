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

    this.router.get('/count/:status/', (req: Request, res: Response, next: NextFunction) => {
      const userId = req.cookies.user;
      const status = req.params.status;
      libController.getBooksCountByStatus(userId, status).then(data => {
        res.status(200).json(data.length);
      }).catch(err => {
        next();
      });
    });

    this.router.get('/:status/', (req: Request, res: Response, next: NextFunction) => {
      const userId = req.cookies.user;
      const status = req.params.status;
      libController.getBooksByStatus(userId, status).then(data => {
        res.status(200).json({response: data});
      }).catch((err:any) => next() );
    });

    this.router.post('/update/progress', (req: Request, res: Response, next: NextFunction) => {
      const userId = req.cookies.user;
      const {id, state} = req.body;
      libController.updateInProgressStatus(userId, id, state).then(data => {
        if(data){
          res.status(200).json({response: 'success'});
        } else {
          next();
        }
      }).catch((err:any) => next() );
    });

    this.router.post('/update/status', (req: Request, res: Response, next: NextFunction) => {
      const userId = req.cookies.user;
      const {id, status} = req.body;
      libController.updateBookByState(userId, id, status).then(data => {
        if(data){
          res.status(200).json({response: 'success'});
        } else {
          next();
        }
      }).catch((err:any) => next() );
    });

    return this.router;
  }
}
