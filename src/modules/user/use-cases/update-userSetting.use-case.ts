import { validateUUID } from "@/shared/utils/validateUUID";
import { UserSettingDTO } from "../dto/user.dto";
import { findById, UserSettings } from "../interfaces/user.repository";
import { BaseError } from "@/shared/errors/BaseError";
import { Theme } from "@prisma/client"

export const updateUserSettingUseCase = async (userId: string, updates: Partial<UserSettingDTO>) => {
    validateUUID(userId);

    const user = await findById.findById(userId);
    if (!user) {
        throw new BaseError('User not found');
    }
    if (!updates || Object.keys(updates).length === 0) {
        throw new BaseError('No updates provided');
    }
    
    if ( updates.theme && !Object.values(Theme).includes(updates.theme as Theme)) {
        throw new BaseError('Invalid theme value. Must be one of: Light, Dark, System');
    }
    const updatedSettings = await UserSettings.update(userId, updates);
    return updatedSettings;
};
