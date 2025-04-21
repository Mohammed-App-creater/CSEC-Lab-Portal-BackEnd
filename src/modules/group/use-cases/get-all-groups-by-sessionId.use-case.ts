import { BaseError } from "@/shared/errors/BaseError";
import { SessionGroups } from "../dto/group.dto";
import { GroupRepository } from "../interfaces/group.repository";



export const getAllGroupsBySessionIdUseCase = async (sessionId: string): Promise<SessionGroups[]> => {
    if (!sessionId) {
        throw new BaseError("Session ID is required");
    }
    const groups = await GroupRepository.findAllBySessionId(sessionId);
    return groups;
}


