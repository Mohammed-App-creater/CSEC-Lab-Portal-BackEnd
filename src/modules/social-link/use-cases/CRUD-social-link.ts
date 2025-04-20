import { SocialLinkRepository } from '../interfaces/social-link.repository';
import { SocialLinkCreateDTO, SocialLinkDeleteDTO, SocialLinkUpdateDTO, SocialLinkDTO } from '../dto/social-link.dto'; 


export const CreateSocialLink = async (socialLink: SocialLinkCreateDTO): Promise<SocialLinkDTO> => {
    const socialLinkCreated = await SocialLinkRepository.createSocialLink(socialLink);
    return socialLinkCreated;
}

export const GetSocialLinks = async (userId: string): Promise<SocialLinkDTO[]>  => {
    const socialLinks = await SocialLinkRepository.getSocialLinks(userId);
    return socialLinks;
}

export const GetSocialLinkById = async (id: string) => {
    const socialLink = await SocialLinkRepository.getSocialLinkById(id);
    return socialLink;
}

export const GetAllSocialLinkByUserId = async (userId: string): Promise<SocialLinkDTO[]> => {
    const socialLink = await SocialLinkRepository.getAllSocialLinkByUserId(userId);
    return socialLink;
}

export const UpdateSocialLink = async (id: string, socialLink: SocialLinkUpdateDTO): Promise<SocialLinkDTO>  => {
    const socialLinkUpdated = await SocialLinkRepository.updateSocialLink(id, socialLink);
    return socialLinkUpdated;
}

export const DeleteSocialLink = async (id: string): Promise<SocialLinkDeleteDTO>  => {
    const socialLinkDeleted = await SocialLinkRepository.deleteSocialLink(id);
    return socialLinkDeleted;
}