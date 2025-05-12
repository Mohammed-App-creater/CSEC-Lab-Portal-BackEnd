import { UserProfileDTO, UpdateUserProfileDTO, UserUniversityInfoDTO } from '../dto/user.dto';
import { findById, UpdateUser, UserUniversityInfo } from '../interfaces/user.repository';
import { GetAllSocialLinkByUserId, UpdateSocialLink, CreateSocialLink } from '@modules/social-link/use-cases/CRUD-social-link';
import { GetAllResourceLinkByUserId, CreateResourceLink, UpdateResourceLink } from '@/modules/resource-link/use-cases/CRUD-resource-link'
import { BaseError } from '@/shared/errors/BaseError';
import { validateUUID } from '@/shared/utils/validateUUID';


export const getUserProfile = async (userId: string): Promise<UserProfileDTO> => {
    if (!userId) {
        throw new BaseError('User ID is required', 400);
    }
    validateUUID(userId);

    const user = await findById.findById(userId);
    if (!user || !user.id) {
        throw new BaseError('User not found or invalid user data');
    }
    const socialLinks = await GetAllSocialLinkByUserId(userId);
    const resourceLinks = await GetAllResourceLinkByUserId(userId);
    const universityInfo = await UserUniversityInfo.getUserUniversityInfo(userId);
    return {
        ...user,
        socialLinks,
        resourceLinks,
        universityInfo,
    }
}


export const updateUserProfileUseCase = async (userId: string, userProfileData: UserProfileDTO): Promise<UpdateUserProfileDTO> => {
    const User = await findById.findById(userId);
    if (!User || !User.id) {
        throw new BaseError('User not found or invalid user data');
    }

    validateUUID(userId);

    // Validate the input data if necessary
    if (!userProfileData) {
        throw new BaseError('User profile data is required', 400);
    }
    if (!userProfileData.firstName || !userProfileData.lastName) {
        throw new BaseError('First Name and Last Name are required', 400);
    }
    if (userProfileData.firstName.length < 3) {
        throw new BaseError('First Name must be at least 3 characters long', 400);
    }
    if (userProfileData.lastName.length < 3) {
        throw new BaseError('Last Name must be at least 3 characters long', 400);
    }
    if (!userProfileData.email) {
        console.log(userProfileData);
        throw new BaseError('Email Is required', 400);
    }

    const { socialLinks, resourceLinks, universityInfo, ...userProfile } = userProfileData;
    const SocialLinks = socialLinks || [];
    const ResourceLinks = resourceLinks || [];
    const UniversityInfo = universityInfo || {} as UserUniversityInfoDTO;
    // userProfile is the user data without the social links and resource links
    const UserProfile = { ...userProfile };

    // Update the user profile in the database

    const updatedUserProfile = await UpdateUser.updateUser(userId, UserProfile);
    if (!updatedUserProfile) {
        throw new BaseError('Failed to update user profile');
    }

    // Update the social links
    for (const socialLink of SocialLinks) {
        if (socialLink.id) {
            await UpdateSocialLink(socialLink.id, socialLink);
        } else {
            await CreateSocialLink({ ...socialLink, userId });
        }
    }
    // Update the resource links
    for (const resourceLink of ResourceLinks) {
        if (resourceLink.id) {
            await UpdateResourceLink(resourceLink.id, resourceLink);
        } else {
            await CreateResourceLink({ ...resourceLink, userId });
        }
    }

    // Update the university info if provided
    if (universityInfo) {
        const existingUniversityInfo = await UserUniversityInfo.getUserUniversityInfo(userId);
        if (existingUniversityInfo) {
            await UserUniversityInfo.updateUserUniversityInfo(userId, universityInfo);
        } else {
            await UserUniversityInfo.createUserUniversityInfo(userId, { ...universityInfo });
        }
    }

    const updatedUser: UpdateUserProfileDTO = { userId, ...updatedUserProfile, socialLinks: SocialLinks, resourceLinks: ResourceLinks, universityInfo: UniversityInfo };

    return updatedUser;

}