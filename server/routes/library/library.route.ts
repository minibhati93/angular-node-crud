import { Request, Response, Router } from 'express';
import { libController } from '../../controllers/library/library.controller';

export class LibraryRoutes {
  public router: Router = Router();

  getRouter(): Router {

    this.router.post('/login', (req: Request, res: Response, next) => {
      libController.authenticate(req.body)
      .then(user => user ?
        res.json(user) : next({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
    });
    return this.router;
  }
}
