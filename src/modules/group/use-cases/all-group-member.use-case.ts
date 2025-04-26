import { GroupRepository } from '../interfaces/group.repository'
import { AllGroupMemberDTO } from '../dto/group.dto';
import { AllGroupMemberUseCase } from '@modules/user/use-cases/all-group-members'
import { validate } from 'uuid';
import { validateUUID } from '@/shared/utils/validateUUID';



export const GroupMemberUseCase = {
  allGroupMembers: async (groupId: string, page?: number, limit?: number): Promise<AllGroupMemberDTO> => {
    validateUUID(groupId);
    if (!groupId) {
      throw new Error('Group ID is required');
    }
    
    if (page === undefined || page < 1) {
      throw new Error('Page number must be greater than 0');
    }
    if (limit === undefined || limit < 1) {
      throw new Error('Limit must be greater than 0');
    }
    const members = await GroupRepository.findById(groupId);
    return {
      groupName: members?.name ?? '',
      groupId: members?.id ?? '',
      members: await AllGroupMemberUseCase.allGroupMembers(groupId, page, limit),
    };
  },
};