import { prisma } from "@shared/utils/prisma";
import { HeadsUp, HeadsUpType } from "@prisma/client";



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
  createHeadsUp: (userId: string, type: HeadsUpType, body: string) => {
    return prisma.headsUp.create({
      data: {
        userId,
        type,
        body,
      },
    });
  },
  updateHeadsUp: (id: string, type: HeadsUpType, body: string) => {
    return prisma.headsUp.update({
      where: {
        id,
      },
      data: {
        type,
        body,
      },
    });
  },
  deleteHeadsUp: (id: string) => {
    return prisma.headsUp.delete({
      where: {
        id,
      },
    });
  }
}