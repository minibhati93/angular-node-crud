import { Request, Response } from 'express';
import { User } from '../../models/user';

export class LibraryController {
  public authenticate = ( { username, password }: any ) => {
   return User.findOne({username}).exec().then($u =>  {
     if($u != null){
      if($u.username === username && $u.password === password){
        return $u;
      }
      return false;
     }
   });
  }
}


export const libController = new LibraryController();
