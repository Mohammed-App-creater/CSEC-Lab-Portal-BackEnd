import { Attendance } from '@prisma/client'

export type AttendanceDto = Attendance;


export type AttendanceUserSummaryDto = {
    attendanceRate: number;
    lastWeekAttendanceRate: number;
    lastMonthAttendanceRate: number;
    headsUp: number;
    present: number;
    absent: number;
    updateAt: Date;
}


