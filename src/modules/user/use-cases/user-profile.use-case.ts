import { UserProfileDTO } from '../dto/user.dto';
import { findById } from '../interfaces/user.repository';
import { GetAllSocialLinkByUserId } from '@modules/social-link/use-cases/CRUD-social-link';
import { GetAllResourceLinkByUserId } from '@modules/resource-link/use-cases/CRUD-resource-link'


export const getUserProfile = async (userId: string): Promise<UserProfileDTO> => {
    const user = await findById.findById(userId);
    if (!user || !user.id) {
        throw new Error('User not found or invalid user data');
    }
    const socialLinks = await GetAllSocialLinkByUserId(userId);
    const resourceLinks = await GetAllResourceLinkByUserId(userId);
    return {
        ...user,
        socialLinks,
        resourceLinks
    }
}