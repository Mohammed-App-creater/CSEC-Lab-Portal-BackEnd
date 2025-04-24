import { prisma } from "@shared/utils/prisma";




export const HeadsUpRepository = {
  getHeadsUps: (userId: string) => {
    return prisma.headsUp.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        type: true,
        body: true,
        sentAt: true,
      },
    });
  },
  getHeadsUpById: (id: string) => {
    return prisma.headsUp.findUnique({
      where: {
        id,
      },
    });
  },
}