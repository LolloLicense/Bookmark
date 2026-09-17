import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  //console.log(req.cookies.accessToken)
  if (req.cookies.accessToken === undefined) {
    res.status(401).send();
    return;
  }

  jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET || '', (error: jwt.VerifyErrors | null, decoded: any) => {
    if (error) {
      res.status(403).send();
      return;
    }

    req.user = decoded;
    next();
  });
};
