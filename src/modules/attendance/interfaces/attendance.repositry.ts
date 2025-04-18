import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
     }
     
}
