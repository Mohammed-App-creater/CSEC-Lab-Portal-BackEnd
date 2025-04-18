import { AllUserDTO } from "../dto/user.dto";
import { FindAllUsers } from "../interfaces/user.repository";

export const findAllUsersUseCase = async (page: number, limit: number): Promise<AllUserDTO> => {
    const result = await FindAllUsers.findAllUsers(page, limit);
    return {
        data: result.data,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
    };
};