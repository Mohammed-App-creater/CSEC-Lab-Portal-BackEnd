import { getUserProfile, updateUserProfileUseCase } from '../use-cases/user-profile.use-case'
import { Request, Response, NextFunction } from 'express';
import { UserProfileDTO } from '../dto/user.dto';

export const getUserProfileController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = req.body.userId;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        const userProfile: UserProfileDTO = await getUserProfile(userId);
        res.status(200).json(userProfile);
        return;
    } catch (error) {
        next(error);
    }
}


export const updateUserProfileController = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const userId = req.body.id;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
        }
        const userProfileData: UserProfileDTO = req.body;
        const updatedUserProfile = await updateUserProfileUseCase(userId, userProfileData);
        res.status(200).json(updatedUserProfile);
        return;
    } catch (error) {
        next(error);
    }
}