import { updateUserSettingUseCase } from "../use-cases/update-userSetting.use-case";
import { Request, Response, NextFunction } from "express";


export const updateUserSettingController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const result = await updateUserSettingUseCase(userId, updates);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}
export default updateUserSettingController;