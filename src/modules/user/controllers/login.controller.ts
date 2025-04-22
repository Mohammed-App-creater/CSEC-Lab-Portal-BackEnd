import { loginUserUseCase } from '../use-cases/login-user.usecase';
import { Request, Response } from 'express';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { remember, email, password } = req.body;
    const result = await loginUserUseCase({ rememberMe: remember, email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err instanceof Error ? err.message : 'An unknown error occurred' });
  }
};
