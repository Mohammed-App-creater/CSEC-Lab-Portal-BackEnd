import { BaseError } from "@/shared/errors/BaseError";
import { SessionGroupsDto } from "../dto/group.dto";
import { GroupRepository } from "../interfaces/group.repository";



export const getAllGroupsBySessionIdUseCase = async (sessionId: string): Promise<SessionGroupsDto[]> => {
    if (!sessionId) {
        throw new BaseError("Session ID is required");
    }
    const groups = await GroupRepository.findAllBySessionId(sessionId);
    return groups;
}


