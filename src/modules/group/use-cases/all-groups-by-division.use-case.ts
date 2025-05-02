import { GroupRepository } from '../interfaces/group.repository'
import { GroupDto } from '../dto/group.dto';

export const getAllGroupByDivisionIdUseCase = async (divisionId: string): Promise<GroupDto[]> => {
    const Groups = (await GroupRepository.findAllByDivisionId(divisionId)).map(group => ({
        ...group,
        description: group.description ?? ''
    }));
    return Groups;
}