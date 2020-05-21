import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/global';

export class ValidateTokenHandler {
  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = (req.headers.authorization as string).split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: jwtConfig.tokenLife,
        issuer: jwtConfig.issuer
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        const secret = process.env.JWT_SECRET || '';
        result = jwt.verify(token, secret, options);

        // Let's pass back the decoded token to the request object
        req.cookies = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        res.status(401).send({response: err});
      }
    }
    else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
}

export const jwtMiddleware = new ValidateTokenHandler();
