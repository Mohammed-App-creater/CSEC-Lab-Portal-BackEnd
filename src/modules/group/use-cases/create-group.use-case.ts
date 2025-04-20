import { GroupRepository } from  '../interfaces/group.repository'
import { GroupDto } from '../dto/group.dto'
import { addGroupUseCase } from '@modules/division/use-cases/add-group.use-case'

export const createGroupUseCase = async (name: string, divisionId: string ): Promise<GroupDto | object> => {
    const test = await GroupRepository.findByName(name);
    if (test) {
        return { "message": "Group already exists" };
    }
    const group = await GroupRepository.create(name);

    if (!group) {
        return { "message": "Group creation failed" };
    }
    const groupId = group.id;
    const division = await addGroupUseCase(divisionId, groupId);
    
    if (!division) {
        return { "message": "Division not found" };
    }

    return group;
}
