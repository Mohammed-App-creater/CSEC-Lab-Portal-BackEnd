import { FindAllUsers } from '../interfaces/user.repository';
import { AllUserDTOWithGroup } from '../dto/user.dto';


export const AllGroupMemberUseCase = {
  allGroupMembers: async (groupId: string, page: number = 1, limit: number = 5): Promise<AllUserDTOWithGroup> => {
    const groupMembers = await FindAllUsers.findAllUsersByGroupId(groupId, page=1, limit=5);
    return groupMembers;
  },
};




