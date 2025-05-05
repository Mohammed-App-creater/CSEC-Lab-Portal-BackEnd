import { DivisionRepository } from '../interfaces/division.repository';
import { CreateDivisionDTO } from '../dto/create-division.dto';
import { getUserRoleUseCase } from '@modules/user/use-cases/get-user-role.use-case'
import { BaseError } from '@/shared/errors/BaseError';
import { validateUUID } from '@/shared/utils/validateUUID';


export const createDivision = async (name: string, currentHeadID: string): Promise<CreateDivisionDTO | object> => {
    if (!name || !currentHeadID) {
        throw new BaseError('Name and current head ID are required.', 400);
    }
    validateUUID(currentHeadID);
    const role = await getUserRoleUseCase(currentHeadID);
    if (role.role === 'DivisionHead') {
        throw new BaseError('User is already a division head. Please choose another user.', 400);
    }
    const existingDivision = await DivisionRepository.findByName(name);
    if (existingDivision) {
        throw new BaseError('Division with this name already exists.', 400);
    }
    return await DivisionRepository.create({ name, currentHeadID });
};
