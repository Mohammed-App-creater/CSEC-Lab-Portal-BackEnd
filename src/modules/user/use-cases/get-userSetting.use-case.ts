import { getUserSettqings } from "../interfaces/user.repository";
import { UserSettingDTO } from "../dto/user.dto";
import { validateUUID } from "@/shared/utils/validateUUID";
import { findById } from "../interfaces/user.repository";
import { BaseError } from "@/shared/errors/BaseError";


export const getUserSettingUseCase = async (userId: string): Promise<UserSettingDTO> => {
    validateUUID(userId);

    const user = await findById.findById(userId);
    if (!user) {
        throw new BaseError('User not found');
    }

    const userSettings = await getUserSettqings.getUserSettings(userId);
    return userSettings;
}
export default getUserSettingUseCase;