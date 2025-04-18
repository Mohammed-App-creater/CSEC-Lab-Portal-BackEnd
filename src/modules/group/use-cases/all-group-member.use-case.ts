import { GroupRepository } from '../interfaces/group.repository'
import { AllGroupMemberDTO } from '../dto/group.dto';
import { AllGroupMemberUseCase } from '@modules/user/use-cases/all-group-members'



export const GroupMemberUseCase = {
  allGroupMembers: async (groupId: string, page?: number, limit?: number): Promise<AllGroupMemberDTO> => {
    const members = await GroupRepository.findById(groupId);
    return {
      groupName: members?.name ?? '',
      groupId: members?.id ?? '',
      members: await AllGroupMemberUseCase.allGroupMembers(groupId, page, limit),
    };
  },
};