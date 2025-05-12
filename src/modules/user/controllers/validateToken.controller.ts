import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@/app/middleware/JWTValidator'; 

export const validateTokenController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
