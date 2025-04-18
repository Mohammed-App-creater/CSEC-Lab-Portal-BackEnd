import { UserCount } from '@/modules/user/interfaces/user.repository';
import { DivisionRepository } from '@/modules/division/interfaces/division.repository';
import { AttendanceRepository } from '@/modules/attendance/interfaces/attendance.repositry';
import { SessionRepository } from '@/modules/session/interfaces/count-upcoming-session.repository';
import { DashboardSummary } from '../dto/dashboard-semmery.dto';

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const totalMembers = await UserCount.userCount();
  const totalDivisions = await DivisionRepository.divisionCount();
  const TotalAttendance = await AttendanceRepository.attendanceCount();
  const TotalAttend = await AttendanceRepository.attendedAttendanceCount();
  const attendanceRate = TotalAttendance > 0 ? (TotalAttend / TotalAttendance) * 100 : 0;
  const upcomingSessions = (await SessionRepository.countUpcomingSession()).count;

  return {
    totalMembers,
    totalDivisions,
    attendanceRate,
    upcomingSessions,
  };
};
