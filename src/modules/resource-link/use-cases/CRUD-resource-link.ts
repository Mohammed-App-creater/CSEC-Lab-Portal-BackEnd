import { ResourceLinkRepository } from '../interfaces/resource-link.repository';
import { ResourceLinkCreateDTO, ResourceLinkDeleteDTO, ResourceLinkUpdateDTO, ResourceLinkDTO } from '../dto/resource-link.dto'; 


export const CreateResourceLink = async (resourceLink: ResourceLinkCreateDTO): Promise<ResourceLinkDTO> => {
    const ResourceLinkCreated = await ResourceLinkRepository.createSocialLink(resourceLink);
    return ResourceLinkCreated;
}

export const GetResourceLinks = async (userId: string): Promise<ResourceLinkDTO[]>  => {
    const ResourceLinks = await ResourceLinkRepository.getResourceLinks(userId);
    return ResourceLinks;
}

export const GetResourceLinkById = async (id: string) => {
    const ResourceLink = await ResourceLinkRepository.getResourceLinkById(id);
    return ResourceLink;
}

export const GetAllResourceLinkByUserId = async (userId: string): Promise<ResourceLinkDTO[]> => {
    const ResourceLink = await ResourceLinkRepository.getAllResourceLinkByUserId(userId);
    return ResourceLink;
}

export const UpdateResourceLink = async (id: string, resourceLink: ResourceLinkUpdateDTO): Promise<ResourceLinkDTO>  => {
    const ResourceLinkUpdated = await ResourceLinkRepository.updateResourceLink(id, resourceLink);
    return ResourceLinkUpdated;
}

export const DeleteResourceLink = async (id: string): Promise<ResourceLinkDeleteDTO>  => {
    const ResourceLinkDeleted = await ResourceLinkRepository.deleteResourceLink(id);
    return ResourceLinkDeleted;
}