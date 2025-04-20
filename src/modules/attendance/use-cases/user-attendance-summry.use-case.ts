import { AttendanceUserSummaryDto } from '../dto/attendance.dto';
import { AttendanceRepository } from '../interfaces/attendance.repositry';


export const getUserAttendanceSummary = async (userId: string): Promise<AttendanceUserSummaryDto> => {
    const attendanceCount = await AttendanceRepository.attendanceCount();
    const attendedAttendanceCount = await AttendanceRepository.attendedAttendanceCount();
    const allAttendance = await AttendanceRepository.getAllAttendanceByUserId(userId);
    const presentAttendance = await AttendanceRepository.getPresntAttendanceByUserId(userId);
    const absentAttendance = await AttendanceRepository.getAbsentAttendanceByUserId(userId);
    const lastWeekAttendance = await AttendanceRepository.getLastWeekAttendanceByUserId(userId);
    const lastWeekPresentAttendance = await AttendanceRepository.getLastWeekPresentAttendanceByUserId(userId);
    const lastMonthAttendance = await AttendanceRepository.getLastMonthAttendanceByUserId(userId);

    return {
        attendanceRate: attendanceCount > 0 ? (attendedAttendanceCount / attendanceCount) * 100 : 0,
        lastWeekAttendanceRate: lastWeekAttendance.length > 0 ? (lastWeekPresentAttendance.length / lastWeekAttendance.length) * 100 : 0,
        lastMonthAttendanceRate: lastMonthAttendance.length > 0 ? (lastMonthAttendance.length / lastMonthAttendance.length) * 100 : 0,
        headsUp: allAttendance.length,
        present: presentAttendance.length,
        absent: absentAttendance.length,
        updateAt: new Date()
    }
}