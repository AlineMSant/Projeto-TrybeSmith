import { NextFunction, Request, Response } from 'express';

async function nameMiddleware(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;

  if (name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }

  if (name.length < 3) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }
   
  next();
}

export default nameMiddleware;