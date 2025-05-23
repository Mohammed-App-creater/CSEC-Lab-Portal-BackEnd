import { prisma } from "@shared/utils/prisma";
import { getAllAttendances } from "../use-cases/get-all-attendance.use-case";
import { AttendanceStatus } from "@prisma/client";
import { get } from "http";



export const AttendanceRepository = {
     attendanceCount: () => {
          return prisma.attendance.count()
     },
     attendedAttendanceCount: () => {
          return prisma.attendance.count({
               where: {
                    status: 'PRESENT'
               }
          })
     },
     getAllAttendanceByUserId: (userId: string) => {
          return prisma.attendance.findMany({
               where: {
                    userId: userId
               }
          })
     },

     getPresntAttendanceByUserId: (userId: string) => {
          return prisma.attendance.findMany({
               where: {
                    userId: userId,
                    status: 'PRESENT'
               }
          })
     },
     getAbsentAttendanceByUserId: (userId: string) => {
          return prisma.attendance.findMany({
               where: {
                    userId: userId,
                    status: 'ABSENT'
               }
          })
     },
     getLastWeekAttendanceByUserId: (userId: string) => {
          return prisma.attendance.findMany({
               where: {
                    userId: userId,
                    createdAt: {
                         gte: new Date(new Date().setDate(new Date().getDate() - 7))
                    }
               }
          })
     },
     getLastWeekPresentAttendanceByUserId: (userId: string) => {
          return prisma.attendance.findMany({
               where: {
                    userId: userId,
                    status: 'PRESENT',
                    createdAt: {
                         gte: new Date(new Date().setDate(new Date().getDate() - 7))
                    }
               }
          })
     },
     getLastMonthAttendanceByUserId: (userId: string) => {
          return prisma.attendance.findMany({
               where: {
                    userId: userId,
                    createdAt: {
                         gte: new Date(new Date().setDate(new Date().getDate() - 30))
                    }
               }
          })
     },
     getLastMonthPresentAttendanceByUserId: (userId: string) => {
          return prisma.attendance.findMany({
               where: {
                    userId: userId,
                    status: 'PRESENT',
                    createdAt: {
                         gte: new Date(new Date().setDate(new Date().getDate() - 30))
                    }
               }
          })
     },
     getAllAttendances: async () => {
          return await prisma.attendance.findMany({
               select: {
                    id: true,
                    userId: true,
                    event: {
                         select: {
                              id: true,
                              title: true,
                              description: true,
                              startTime: true,
                              endTime: true,
                              createdAt: true,
                              updatedAt: true,
                         },
                    },
                    session: {
                         select: {
                              id: true,
                              title: true,
                              description: true,
                              startMonth: true,
                              targetGroups: true,
                              timeSlot: {
                                   select: {
                                        id: true,
                                        startTime: true,
                                        endTime: true,
                                   }
                              },
                              createdAt: true,
                              updatedAt: true,
                         },
                    },
                    status: true,
                    createdAt: true,
                    updatedAt: true,
               },
          })
     },

     getAttendanceById: (id: string) => {
          return prisma.attendance.findUnique({
               where: {
                    id: id
               }
          })
     },
     getAttendanceByEventId: (eventId: string) => {
          return prisma.attendance.findMany({
               where: {
                    eventId: eventId
               }
          })
     },
     getAttendanceBySessionId: (sessionId: string) => {
          return prisma.attendance.findMany({
               where: {
                    sessionId: sessionId
               }
          })
     },

     getAttendanceBySessionIdAndGroupId: (sessionId: string, groupId: string) => {
          return prisma.attendance.findMany({
               where: {
                    sessionId: sessionId,
                    user: {
                         groups: {
                              some: {
                                   id: groupId
                              }
                         }
                    },
                    
               },
               select: {
                    id: true,
                    sessionId: true,
                    userId: true,
                    status: true,
                    user: {
                         select: {
                              id: true,
                              firstName: true,
                              lastName: true,
                              profileImageUrl: true,
                         }
                    },
               },
               
          })
     },
     
     createManyAttendancesBySessionId: (sessionId: string, userIds: string[]) => {
         const data = userIds.map(userId => ({
             sessionId,
             userId,
             status: AttendanceStatus.UNMARKED, 
         }));
     
         return prisma.attendance.createMany({
             data,
             skipDuplicates: true,
         });
     }

}
