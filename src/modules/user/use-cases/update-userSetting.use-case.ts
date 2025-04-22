import { validateUUID } from "@/shared/utils/validateUUID";
import { UserSettingDTO } from "../dto/user.dto";
import { findById, UserSettings } from "../interfaces/user.repository";
import { BaseError } from "@/shared/errors/BaseError";

export const updateUserSettingUseCase = async (userId: string, updates: Partial<UserSettingDTO>) => {
    validateUUID(userId);

    const user = await findById.findById(userId);
    if (!user) {
        throw new BaseError('User not found');
    }

    const updatedSettings = await UserSettings.update(userId, updates);
    return updatedSettings;
};
