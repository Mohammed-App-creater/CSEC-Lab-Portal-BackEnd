import { GroupRepository } from '../interfaces/group.repository'
import { GroupDto } from '../dto/group.dto'
import { addGroupUseCase } from '@modules/division/use-cases/add-group.use-case'
import { BaseError } from '@/shared/errors/BaseError';
import { DivisionRepository } from '@modules/division/interfaces/division.repository'
import { th } from '@faker-js/faker/.';

export const createGroupUseCase = async (name: string, divisionId: string): Promise<GroupDto | object> => {
    if (!name) {
        throw new BaseError( "message: Group name is required" );
    }
    if (!divisionId) {
        throw new BaseError( "message: Division ID is required" );
    }
    if (name.length < 3) {
        throw new BaseError( "message: Group name must be at least 3 characters long" );
    }
    const test = await GroupRepository.findByName(name);
    if (test) {
        throw new BaseError( "message: Group already exists");
    }
    const group = await GroupRepository.create(name);

    if (!group) {
        throw new   BaseError( "message: Group creation failed" );
    }
    const groupId = group.id;

    const Division = await DivisionRepository.findById(divisionId);
    
    if (!Division) {
        throw new BaseError("message: Division not found" );
    }
    const division = await addGroupUseCase(divisionId, groupId);
    
    return group;
}
