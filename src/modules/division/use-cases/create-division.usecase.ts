import { DivisionRepository } from '../interfaces/division.repository';
import { CreateDivisionDTO } from '../dto/create-division.dto';
import { RoleType } from '@prisma/client';
import { getUserRoleUseCase } from '@modules/user/use-cases/get-user-role.use-case'


export const createDivision = async (name: string, currentHeadID: string): Promise<CreateDivisionDTO | object> => {
    const role = await getUserRoleUseCase(currentHeadID);
    if (role.role === RoleType.DivisionHead) {
        return { message: 'User is already a division head. Please choose another user.' };
    }
    return await DivisionRepository.create({ name, currentHeadID });
};
