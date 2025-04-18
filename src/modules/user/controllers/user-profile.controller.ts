import { getUserProfile } from '../use-cases/user-profile.use-case'
import { Request, Response } from 'express';
import { UserProfileDTO } from '../dto/user.dto';

export const getUserProfileController = async (req: Request, res: Response) => {

    try {
        const userId = req.body.userId;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
        }
        const userProfile: UserProfileDTO = await getUserProfile(userId);
        res.status(200).json(userProfile);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

