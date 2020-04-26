import { NextFunction, Request, Response } from 'express';

export class ErrorHandler {
  public errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('error middleware' , err.stack);
    res.status(500).send({Error : err.stack});
  }
}

export const errorMiddleware = new ErrorHandler();
