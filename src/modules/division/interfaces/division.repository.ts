import { prisma } from '@/shared/utils/prisma';


export const DivisionRepository = {
  create: (data: { name: string, currentHeadID: string }) => {
    return prisma.divisions.create({ data });
  },
  findAll: () => {
    return prisma.divisions.findMany();
  },
  divisionCount: () => {
    return prisma.divisions.count();
  },

  findByName: (name: string) => {
    return prisma.divisions.findFirst({ where: { name } });
  },

  findAllDivisionId: () => {
    return prisma.divisions.findMany({
      select: {
        id: true,
        name: true,
      }
    })
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

