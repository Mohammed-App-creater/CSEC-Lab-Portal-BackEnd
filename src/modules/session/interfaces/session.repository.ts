import { Sessions, SessionTimeSlot } from '@prisma/client';

export type SessionRepository = Pick<Sessions, 'id' | 'title' | 'description' | 'startMonth' | 'endTMonth' | 'tags' | 'location'> & {
    timeSlots: Pick<SessionTimeSlot, 'id' | 'startTime' | 'endTime' | 'date' | 'status'>[]}