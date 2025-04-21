import { EventGroupsDto } from "@/modules/group/dto/group.dto";
import { EventDto, EventAndGroupDto } from "../dto/event.dto";
import { EventRepository } from "../interfaces/event.Repository";
import { getAllGroupsByEventIdUseCase } from "@modules/group/use-cases/get-all-by-eventId.use-cas";
import { BaseError } from "@/shared/errors/BaseError";


export const GetAllEventUseCase = async (limit: number, page: number): Promise<EventAndGroupDto[]> => {
    // Validate the limit and page parameters
    if (limit <= 0 || page <= 0) {
        throw new BaseError("Limit and page must be greater than zero.", 400);
    }
    // Validate the limit and page are integers
    if (!Number.isInteger(limit) || !Number.isInteger(page)) {
        throw new BaseError("Limit and page must be integers.", 400);
    }

    const events: EventDto[] = await EventRepository.findAll(limit, page);
    const eventsWithGroups: EventAndGroupDto[] = await Promise.all(
        events.map(async (event: EventDto): Promise<EventAndGroupDto> => {
            const groups: EventGroupsDto[] = await getAllGroupsByEventIdUseCase(event.id);
            return { ...event, groups };
        })
    );
    return eventsWithGroups;
}
