import { BaseError } from "@/shared/errors/BaseError";
import { AttendanceDto } from "../dto/attendance.dto";
import { AttendanceRepository } from "../interfaces/attendance.repositry";
import { validateUUID } from "@/shared/utils/validateUUID";
import { getSessionByIdUseCase } from "@/modules/session/use-cases/get-session-byId.usecase";
import { GroupMemberUseCase } from "@/modules/group/use-cases/all-group-member.use-case"; 
import { getGroupByIdUseCase } from "@/modules/group/use-cases/get-group-by-Id.use-case"; 
import { Prisma } from "@prisma/client";

export const createGroupSessionAttendanceUseCase = async (
    sessionId: string,
    groupId: string
): Promise<Prisma.BatchPayload> => {
    if (!sessionId || !groupId) {
        throw new BaseError("Session ID and Group ID are required.");
    }

    validateUUID(sessionId);
    validateUUID(groupId);

    const session = await getSessionByIdUseCase(sessionId);
    if (!session) {
        throw new BaseError("Session not found.");
    }

    const group = await getGroupByIdUseCase(groupId);
    if (!group) {
        throw new BaseError("Group not found.");
    }

    const groupMembers = await GroupMemberUseCase.allGroupMembers(groupId, 1, 1000); 

    if (!groupMembers || groupMembers.members.data.length === 0) {
        throw new BaseError("No members found in the group.");
    }
    const userIds = groupMembers.members.data.map(member => member.id);
    const attendances = await AttendanceRepository.createManyAttendancesBySessionId(sessionId, userIds);

    return attendances;
};
