import { Events } from "@prisma/client";
import { EventGroupsDto } from "@/modules/group/dto/group.dto";


export type EventDto = Omit<Events, "createdAt">

export type EventAndGroupDto = Omit<Events, "createdAt"> & {
    groups: EventGroupsDto[];
};