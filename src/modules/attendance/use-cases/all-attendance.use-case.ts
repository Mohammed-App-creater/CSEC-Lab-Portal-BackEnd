import { AttendanceRepository } from "../interfaces/attendance.repositry";
import { AttendanceDto } from "../dto/attendance.dto";

export const AllAttendanceUseCase = {
  allAttendance: async (userId: string): Promise<AttendanceDto[]> => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const attendance = await AttendanceRepository.getAllAttendanceByUserId(userId);
    return attendance;
  },
};