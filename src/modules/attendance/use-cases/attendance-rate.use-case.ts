import { AttendanceRepository } from "../interfaces/attendance.repositry";
import { AttendanceRateDto } from "../dto/attendance-rate.dto";

export const AttendanceRateUseCase = {
    attendanceRate: async (): Promise<AttendanceRateDto> => {
        const attendanceCount = await AttendanceRepository.attendanceCount();
        const attendedAttendanceCount = await AttendanceRepository.attendedAttendanceCount();
    
        const attendanceRate = (attendedAttendanceCount / attendanceCount) * 100;
    
        return {
        attendanceRate,
        updateAt: new Date(),
        };
    },
    };