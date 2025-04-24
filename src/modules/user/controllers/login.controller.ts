import { loginUserUseCase } from '../use-cases/login-user.usecase';
import { Request, Response } from 'express';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { remember, email, password } = req.body;
    const { accessToken, refreshToken, user } = await loginUserUseCase({ rememberMe: remember, email, password });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : 1 * 24 * 60 * 60 * 1000, // 7d or 1d
    });
    res.status(200).json({ accessToken, user });
  } catch (err) {
    res.status(401).json({
      message: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
};

