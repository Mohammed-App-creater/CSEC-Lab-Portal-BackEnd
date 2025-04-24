import { Request, Response } from 'express';
import { refreshAccessToken } from '../use-cases/refreshAccessToken.use-case';

export const refreshTokenController = async (req: Request, res: Response) => {
    if (!req.cookies) {
        res.status(401).json({ message: 'Cookies not found' });
        return;
    }
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json({ message: 'Refresh token missing' });
        return;
    }

    try {
        const { accessToken, refreshToken: newRefreshToken, rememberMe } = await refreshAccessToken(refreshToken);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: rememberMe
                ? 7 * 24 * 60 * 60 * 1000
                : 1 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ accessToken });
        return;
    } catch (err) {
        res.status(403).json({
            message: err instanceof Error ? err.message : 'Invalid refresh token',
        });
        return;
    }
};
