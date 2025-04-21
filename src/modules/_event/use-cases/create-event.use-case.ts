import { EventRepository } from "../interfaces/event.Repository";
import { EventVisibility, Tag } from "@prisma/client";
import { EventDto } from "../dto/event.dto";
import { BaseError } from "@/shared/errors/BaseError";
import { getDivisionByIdUseCase } from "@modules/division/use-cases/get-division-by-id.use-case";

export const CreateEventUseCase = async (
    title: string,
    startDate: Date,
    startTime: Date,
    endTime: Date,
    creatorId: string,
    visibility: string,
    tag: string[],
    divisionId: string,
    groups: string[]
): Promise<EventDto> => {

    const isPublic = visibility === EventVisibility.PUBLIC;
    if (!isPublic) {
        const Division = await getDivisionByIdUseCase(divisionId);

        if (!Division) {
            throw new BaseError("Division not found", 404);
        }
    }
    // Check if the event already exists
    const existingEvent = await EventRepository.findByName(title);

    if (!title || !startDate || !startTime || !endTime || !creatorId) {
        throw new BaseError("Missing required fields", 400);
    }

    if (existingEvent) {
        throw new BaseError("Event already exists", 409);
    }

    // Validate visibility
    if (!Object.values(EventVisibility).includes(visibility as EventVisibility)) {
        throw new BaseError("Invalid visibility type", 400);
    }

    // Validate tags
    if (!Array.isArray(tag) || tag.some(t => !Object.values(Tag).includes(t as Tag))) {
        throw new BaseError("Invalid tag values", 400);
    }


    const parsedStartDate = new Date(startDate); // for startDate field

    const parsedStartTime = new Date(`${startDate}T${startTime}`);
    const parsedEndTime = new Date(`${startDate}T${endTime}`);

    const event = await EventRepository.create(
        title,
        parsedStartDate,
        parsedStartTime,
        parsedEndTime,
        creatorId,
        visibility as EventVisibility,
        tag as Tag[],
        isPublic ? null : divisionId,
        isPublic ? [] : groups
    );

    return event;
};
