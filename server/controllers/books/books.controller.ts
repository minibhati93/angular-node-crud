import { Request, Response } from 'express';

export let getAllBooks = (req: Request, res: Response) => {
  res.send('Returns all Books');
};

