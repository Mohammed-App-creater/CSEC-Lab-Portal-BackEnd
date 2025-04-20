import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const DivisionRepository = {
  create: (data: { name: string, currentHeadID: string }) => {
    return prisma.divisions.create({ data });
  },
  findAll: () => {
    return prisma.divisions.findMany();
  },
  divisionCount: () => {
    return  prisma.divisions.count();
  },

  findById: (id: string) => {
    return prisma.divisions.findUnique({ where: { id } });
  },
  addGroup: (divisionId: string, groupId: string) => {
    return prisma.divisions.update({
      where: { id: divisionId },
      data: {
        groups: {
          connect: { id: groupId },
        },
      },
    });
  }
  
};

