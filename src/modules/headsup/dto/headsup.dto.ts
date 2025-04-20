import { HeadsUp } from "@prisma/client";


export type HeadsUpDto = Omit<HeadsUp, "userId"> ;

