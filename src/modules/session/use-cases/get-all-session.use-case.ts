import { BaseError } from '@/shared/errors/BaseError';
import { SessionGroupsAndTimeSlotDto } from '../dto/session.dto';
import { sessionRepository } from '../interfaces/session.repository';
import { getAllGroupsBySessionIdUseCase } from '@modules/group/use-cases/get-all-groups-by-sessionId.use-case'
import { AllGroupMemberUseCase } from '@/modules/user/use-cases/all-group-members';


export const getAllSessionsUseCase = async (
    limit: number,
    page: number
  ): Promise<SessionGroupsAndTimeSlotDto[]> => {
    // Validate limit and page
    if (limit <= 0 || page <= 0) {
      throw new BaseError('Limit and page must be greater than 0', 400);
    }
  
    if (!Number.isInteger(limit) || !Number.isInteger(page)) {
      throw new BaseError('Limit and page must be integers', 400);
    }
  
    const sessions = await sessionRepository.getAllSessions(limit, page);
  
    const sessionPromises = sessions.map(async (session) => {
      const groups = await getAllGroupsBySessionIdUseCase(session.id);
  
      const groupsWithMembers = await Promise.all(
        groups.map(async (group) => {
          const groupMembers = await AllGroupMemberUseCase.allGroupMembers(group.id, 1, 10);
          return {
            ...group,
            members: groupMembers, // Dynamically add the members property
          };
        })
      );
  
      return {
        ...session,
        groups: groupsWithMembers,
        timeSlots: session.timeSlot,
      };
    });
  
    return await Promise.all(sessionPromises);
  };
  
