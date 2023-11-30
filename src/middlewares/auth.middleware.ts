import { NextFunction, Request, Response } from 'express';
import JWTTokenManager from '../manager/jwt-token.manager';
import { userType } from '../types/user.type';
import userModel from '../models/user.model';

interface JwtPayload {
  id: string;
}

declare module 'express' {
  interface Request {
    user?: userType;
  }
}

const jwtInstance = new JWTTokenManager();

export default class authMiddleware {
  constructor() {}

  public async isAuthorized(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const payload = jwtInstance.verifyToken(token) as JwtPayload;

      const user = await userModel.findById(payload.id);

      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  }

  public isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
  }
}
