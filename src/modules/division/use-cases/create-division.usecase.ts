import { DivisionRepository } from '../interfaces/division.repository';
import { CreateDivisionDTO } from '../dto/create-division.dto';
import { RoleType } from '@prisma/client';
import { getUserRoleUseCase } from '@modules/user/use-cases/get-user-role.use-case'
import { BaseError } from '@/shared/errors/BaseError';


export const createDivision = async (name: string, currentHeadID: string): Promise<CreateDivisionDTO | object> => {
    const role = await getUserRoleUseCase(currentHeadID);
    if (role.role === RoleType.DivisionHead) {
        throw new BaseError('User is already a division head. Please choose another user.', 400);
    }
    return await DivisionRepository.create({ name, currentHeadID });
};
