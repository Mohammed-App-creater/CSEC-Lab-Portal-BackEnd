import { sessionRepository } from "../interfaces//session.repository";
import { SessionDto } from "../dto/session.dto";
import { SessionWithTimeSlotsAndGroupsDto } from "../dto/session.dto";
import { Tag } from "@prisma/client";
import { BaseError } from "@/shared/errors/BaseError";
import { getDivisionByIdUseCase } from "@/modules/division/use-cases/get-division-by-id.use-case";
import { validateUUID } from "@/shared/utils/validateUUID";
import { v } from "@faker-js/faker/dist/airline-BUL6NtOJ";



export const createSessionUseCase = async (
    title: string,
    description: string,
    startMonth: Date,
    endTMonth: Date,
    location: string,
    creatorId: string,
    divisionId: string,
    tags: Tag[],
    timeSlotAndGroup: SessionWithTimeSlotsAndGroupsDto,
): Promise<SessionDto> => {


    const existingSession = await sessionRepository.getSessionByTitle(title);
    if (existingSession) {
        throw new BaseError("Session with this title already exists.", 409);
    }

    // Validate the tags is instance of Tag[]
    if (!Array.isArray(tags)) {
        throw new BaseError("Tags must be an array of strings.");
    }

    validateUUID(creatorId, "creatorId");
    validateUUID(divisionId, "divisionId");

    for (const tag of tags) {
        if (typeof tag !== "string") {
            throw new BaseError("Tags must be an array of strings.");
        }
    }

    for (const groupId of timeSlotAndGroup.groupIds) {
        validateUUID(groupId, "groupId");
    }
    

    const Division = await getDivisionByIdUseCase(divisionId);

    if (!Division) {
        throw new BaseError("Division not found", 404);
    }

    // Validate tags
    const validTags = Object.values(Tag);
    const areTagsValid = tags.every((tag) => validTags.includes(tag as Tag));

    if (!areTagsValid) {
        throw new BaseError("One or more tags are invalid.");
    }

    // Validate the timeSlotAndGroup is instance of SessionWithTimeSlotsAndGroupsDto
    if (!Array.isArray(timeSlotAndGroup.timeSlots)) {
        throw new BaseError("Time slots must be an array of objects.");
    }
    const session = await sessionRepository.createSession(
        title,
        description,
        startMonth,
        endTMonth,
        location,
        creatorId,
        divisionId,
        tags,
        timeSlotAndGroup,
    );
    return session;
}
