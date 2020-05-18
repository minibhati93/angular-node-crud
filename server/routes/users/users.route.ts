import { Request, Response, Router, NextFunction } from 'express';
import { libController } from '../../controllers/library/library.controller';

export class UserRoutes {
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
    .then(data => {
      if(data){
        res.status(data.status).json(data);
      } else {
        res.status(401).json({response: `User doesn't exist. Please register.`})
      }
    })
    .catch(err => next(err));
  });

  this.router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    const {username, password, email, role, firstName, lastName} = req.body;
    libController.createUser(username, email, password, role, firstName, lastName).then((data:any) => {
      if(data){
        res.status(200).json({response: 'success'});
      } else {
        res.status(500).json({response: 'Account with this email address already exists.'});
      }
    })
  });

  return this.router;
  }
}
