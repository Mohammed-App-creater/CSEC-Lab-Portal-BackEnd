import { Sessions, SessionTimeSlot } from '@prisma/client';
import { SessionGroupsDto } from "@/modules/group/dto/group.dto";

export type SessionDto = Omit<Sessions, "createdAt" | "updatedAt">;

export type SessionDetails = Pick<Sessions, 'id' | 'title' | 'description' | 'startMonth' | 'endTMonth' | 'tags' | 'location'>;

export type TimeSlotDetails = Pick<SessionTimeSlot, 'id' | 'startTime' | 'endTime' | 'date' | 'status'>;

export type SessionGroupsAndTimeSlotDto = SessionDetails & {
    timeSlots: TimeSlotDetails[];
    groups: SessionGroupsDto[] ;
};

export type SessionWithTimeSlotsDto = SessionDetails & {
    timeSlots: TimeSlotDetails[];
};

export type SessionWithTimeSlotsAndGroupsDto = SessionDetails & {
    timeSlots: TimeSlotDetails[];
    groupIds: string[];
};

// NEW DTOs for sessions listing (pagination)
export type SessionForListDto = {
    sessionId: string;
    title: string;
    startTime: string; // "09:30"
    tag: string;       // from Tag enum
};

export type SessionsByDateDto = {
    date: string; // "2025-07-06"
    sessions: SessionForListDto[];
};
