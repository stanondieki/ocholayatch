import { Request, Response, NextFunction } from 'express';

// Add your middleware functions here

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Implement authentication middleware
  next();
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};
