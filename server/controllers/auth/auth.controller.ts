import { User } from '../../models/user';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthController {
  public authenticate = (username: string, password: string ) => {
  return User.findOne({username}).exec().then($u =>  {
    if($u != null){
     return bcrypt.compare(password, $u.password).then(match => {
       if (match) {

         // Create a token
         const payload = { user: $u.username };
         const options = { expiresIn: '2d', issuer: 'mylibrary.org' };
         const secret = process.env.JWT_SECRET || 'abc';
         const token = jwt.sign(payload, secret, options);
         let response: any = {};
         response = { status: 200, user: $u.username, token };
         return response;
       } else {
         let response: any = {};
         response = { error: `Authentication error`, status: 401 };
         return response;
       }
     });
    }
  });
 }

 public createUser = (username: string,email: string, password: string, role: string,
                      firstName: string, lastName: string) => {
   const user = new User({ username, email, password, role, firstName, lastName });
   return User.findOne({email}).exec().then(async $model => {
     if(!$model) {
       return await user.save().then(data => data).catch(err => false);
     }
   });
 }
}

export const authController = new AuthController();
