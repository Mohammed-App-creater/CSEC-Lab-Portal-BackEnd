import { AttendanceUserSummaryDto } from '../dto/attendance.dto';
import { AttendanceRepository } from '../interfaces/attendance.repositry';
import {getAllHeadsUps} from '@modules/headsup/use-cases/get-all-headsup.use-case';

export const getUserAttendanceSummary = async (userId: string): Promise<AttendanceUserSummaryDto> => {
    const attendanceCount = await AttendanceRepository.attendanceCount();
    const attendedAttendanceCount = await AttendanceRepository.attendedAttendanceCount();
    const allAttendance = await AttendanceRepository.getAllAttendanceByUserId(userId);
    const presentAttendance = await AttendanceRepository.getPresntAttendanceByUserId(userId);
    const absentAttendance = await AttendanceRepository.getAbsentAttendanceByUserId(userId);
    const lastWeekAttendance = await AttendanceRepository.getLastWeekAttendanceByUserId(userId);
    const lastWeekPresentAttendance = await AttendanceRepository.getLastWeekPresentAttendanceByUserId(userId);
    const lastMonthAttendance = await AttendanceRepository.getLastMonthAttendanceByUserId(userId);
    const allHeadsUps = await getAllHeadsUps(userId);

    return {
        attendanceRate: attendanceCount > 0 ? (presentAttendance?.length / allAttendance?.length) * 100 : 0,
        lastWeekAttendanceRate: lastWeekAttendance.length > 0 ? (lastWeekPresentAttendance.length / lastWeekAttendance.length) * 100 : 0,
        lastMonthAttendanceRate: lastMonthAttendance.length > 0 ? (lastMonthAttendance.length / lastMonthAttendance.length) * 100 : 0,
        headsUp: allHeadsUps.length,
        present: presentAttendance.length,
        absent: absentAttendance.length,
        updateAt: new Date()
    }
}