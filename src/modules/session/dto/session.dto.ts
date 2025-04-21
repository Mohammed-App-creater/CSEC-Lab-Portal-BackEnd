import { Sessions, SessionTimeSlot } from '@prisma/client';
import { SessionGroups } from "@/modules/group/dto/group.dto";




export type SessionDto = Omit<Sessions, "createdAt" | "updatedAt">;

export type SessionDetails = Pick<Sessions, 'id' | 'title' | 'description' | 'startMonth' | 'endTMonth' | 'tags' | 'location'>;

export type TimeSlotDetails = Pick<SessionTimeSlot, 'id' | 'startTime' | 'endTime' | 'date' | 'status'>;

export type SessionGroupsAndTimeSlotDto = SessionDetails & {
    timeSlots: TimeSlotDetails[];
    groups: SessionGroups[];
};

export type SessionWithTimeSlotsDto = SessionDetails & {
    timeSlots: TimeSlotDetails[];
};
