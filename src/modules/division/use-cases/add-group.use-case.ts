import { BaseError } from '@/shared/errors/BaseError';
import { DivisionRepository } from '../interfaces/division.repository'


export const addGroupUseCase = async (divisionId: string, groupId: string) => {
    const division = await DivisionRepository.findById(divisionId);
    if (!division) {
        throw new BaseError('Division not found');
    }

    return await DivisionRepository.addGroup(divisionId, groupId);
}