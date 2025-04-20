import { Sessions } from "@prisma/client";


export type SessionDto = Omit<Sessions, "createdAt" | "updatedAt">;