import { CountUserDTO } from '../dto/count-user.dto';
import { UserCount } from '../interfaces/user.repository';

export const countUserUseCase = async (): Promise<CountUserDTO> => {
    const count = await UserCount.userCount();
    return {
        count
    };
};

export const countUserWhereUseCase = async (where: any): Promise<CountUserDTO> => {
    const count = await UserCount.countUserWhere(where);
    return {
        count
    };
}