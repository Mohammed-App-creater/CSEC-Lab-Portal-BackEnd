import { ResourceLinkRepository } from '../interfaces/resource-link.repository';
import { ResourceLinkCreateDTO, ResourceLinkDeleteDTO, ResourceLinkUpdateDTO, ResourceLinkDTO, AllDivisionResourceDto } from '../dto/resource-link.dto';
import { BaseError } from '@/shared/errors/BaseError';
import { validateUUID } from '@/shared/utils/validateUUID';
import { getAllDivisionId } from '@/modules/division/use-cases/get-all-divisions-id.use-case';
import { forEachChild } from 'typescript';
import { error } from 'console';
import { DivisionIdDto } from '@/modules/division/dto/division-group.dto';


export const CreateResourceLink = async (DivisionResourceLink: ResourceLinkCreateDTO): Promise<ResourceLinkDTO> => {
    // Validate the input data if necessary

    if (!DivisionResourceLink.resourceLinkName || !DivisionResourceLink.resourceLinkUrl) {
        throw new BaseError('Resource Link Name and URL are required', 400);
    }
    if (DivisionResourceLink.resourceLinkName.length < 3) {
        throw new BaseError('Resource Link Name must be at least 3 characters long', 400);
    }

    if (DivisionResourceLink.resourceLinkUrl.length < 5) {
        throw new BaseError('Resource Link URL must be at least 5 characters long', 400);
    }

    if (!DivisionResourceLink.divisionId) {
        throw new BaseError('Division ID is required', 400);
    }

    validateUUID(DivisionResourceLink.divisionId);


    const ResourceLinkCreated = await ResourceLinkRepository.createDivisionResourceLink(DivisionResourceLink);
    return ResourceLinkCreated;
}

export const GetResourceLinks = async (divisionId: string): Promise<ResourceLinkDTO[]> => {

    // Validate the input data if necessary
    if (!divisionId) {
        throw new BaseError("divisionId is required ", 400);
    }
    validateUUID(divisionId)


    validateUUID(divisionId);

    const ResourceLinks = await ResourceLinkRepository.getDivisionResourceLinks(divisionId);
    return ResourceLinks;
}

export const GetResourceLinkById = async (id: string) => {

    // Validate the input data if necessary
    if (!id) {
        throw new BaseError('Division ID is required', 400);
    }


    if (!id) {
        throw new BaseError('Resource Link ID is required', 400);
    }

    validateUUID(id);

    const ResourceLink = await ResourceLinkRepository.getResourceLinkById(id);
    return ResourceLink;
}

export const GetAllResourceLinkByDivisionId = async (divisionId: string): Promise<ResourceLinkDTO[]> => {

    // Validate the input data if necessary

    if (!divisionId) {
        throw new BaseError('Division ID is required', 400);
    }

    validateUUID(divisionId);

    const ResourceLink = await ResourceLinkRepository.getAllResourceLinkByDivisionId(divisionId);
    return ResourceLink;
}

export const UpdateResourceLink = async (id: string, resourceLink: ResourceLinkUpdateDTO): Promise<ResourceLinkDTO> => {

    // Validate the input data if necessary

    if (!id) {
        throw new BaseError('Resource Link ID is required', 400);
    }

    validateUUID(id);

    if (!resourceLink.resourceLinkName || !resourceLink.resourceLinkUrl) {
        throw new BaseError('Resource Link Name and URL are required', 400);
    }
    if (resourceLink.resourceLinkName.length < 3) {
        throw new BaseError('Resource Link Name must be at least 3 characters long', 400);
    }

    if (resourceLink.resourceLinkUrl.length < 5) {
        throw new BaseError('Resource Link URL must be at least 5 characters long', 400);
    }


    const ResourceLinkUpdated = await ResourceLinkRepository.updateDivisionResourceLink(id, resourceLink);
    return ResourceLinkUpdated;
}

export const DeleteResourceLink = async (id: string): Promise<ResourceLinkDeleteDTO> => {
    // Validate the input data if necessary

    if (!id) {
        throw new BaseError('Resource Link ID is required', 400);
    }

    validateUUID(id);

    const ResourceLink = await ResourceLinkRepository.getResourceLinkById(id);

    if (!ResourceLink) {
        throw new BaseError('Resource Link not found', 404);
    }



    const ResourceLinkDeleted = await ResourceLinkRepository.deleteDivisionResourceLink(id);
    return ResourceLinkDeleted;
}


export const getAllDivisionsResource = async () => {
    const divisionId = await getAllDivisionId();

    if (!divisionId || divisionId.length === 0) {
        throw new BaseError('There is no Divisions, please create a division first', 400);
    }

    const allDivisionsResource: AllDivisionResourceDto[] = await Promise.all(
        divisionId.map(async (div: DivisionIdDto) => {
            const resource: ResourceLinkDTO[] = await GetAllResourceLinkByDivisionId(div.id);
            return { name: div.name, id: div.id, resourceLink: resource };
        })
    );

    return allDivisionsResource;
};
