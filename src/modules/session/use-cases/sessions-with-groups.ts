  import { SessionWithTimeSlotsDto } from '../dto/session.dto';
  import { sessionRepository } from '../interfaces/session.repository';



  export const getSessionsWithGroups = async (groupId: string): Promise<SessionWithTimeSlotsDto[]> => {

    const sessions = await sessionRepository.getSessionsByGroupId(groupId);
    return sessions.map(session => ({
      ...session,
      timeSlots: session.timeSlot
    }));

}