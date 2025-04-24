import { GroupRepository } from '../interfaces/group.repository';
import { GroupDto } from '../dto/group.dto';
import { BaseError } from '@shared/errors/BaseError';
import { validateUUID } from '@shared/utils/validateUUID';
import { getDivisionByIdUseCase } from '@modules/division/use-cases/get-division-by-id.use-case'



export const getAllGroupsByDivisionIdUseCase = async (divisionId: string): Promise<GroupDto[]> => {
    if (!divisionId) {
        throw new BaseError('Division ID is required', 400);
    }
    // Validate the divisionId
    validateUUID(divisionId)

    const division = await getDivisionByIdUseCase(divisionId);

    if (!division) {
        throw new BaseError('Division not found', 404);
    }

    const groups = await GroupRepository.findAllByDivisionId(divisionId);

    if (!groups) {
        throw new BaseError('No groups found for this division', 404);
    }

    return groups as GroupDto[];
} 