import { prisma } from "@shared/utils/prisma";



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


}
