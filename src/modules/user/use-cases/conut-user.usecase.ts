import { CountUserDTO } from '../dto/count-user.dto';
import { UserCount } from '../interfaces/user.repository';

export const countUserUseCase = async (): Promise<CountUserDTO> => {
    const count = await UserCount.userCount();
    return {
        count
    };
};