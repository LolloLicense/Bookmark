import { NextFunction, Response } from 'express';
import { AuthRequest } from './verifyToken';

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.is_admin !== true) {
    res.status(403).json({
      message: 'Admin Access required',
    });
    return;
  }

  next();
};
