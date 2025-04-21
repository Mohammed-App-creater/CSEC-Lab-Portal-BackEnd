import { BaseError } from "@/shared/errors/BaseError";
import { EventGroupsDto } from "../dto/group.dto";
import { GroupRepository } from "../interfaces/group.repository";



export const getAllGroupsByEventIdUseCase = async (eventId: string): Promise<EventGroupsDto[]> => {
    if (!eventId) {
        throw new BaseError("Event ID is required");
    }
    const groups = await GroupRepository.findAllByEventId(eventId);
    return groups;
}

