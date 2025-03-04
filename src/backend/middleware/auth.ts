import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface SessionData {
    user?: string;
  }
}

const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session.user) {
    res.status(403).json({ ok: false, error: 'forbidden' });
  } else {
    next();
  }
};

export default checkAuth;
