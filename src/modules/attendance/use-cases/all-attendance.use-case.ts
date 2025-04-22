import { AttendanceRepository } from "../interfaces/attendance.repositry";
import { AttendanceDto } from "../dto/attendance.dto";
import { BaseError } from "@/shared/errors/BaseError";

export const AllAttendanceUseCase = {
  allAttendance: async (userId: string): Promise<AttendanceDto[]> => {
    if (!userId) {
      throw new BaseError("User ID is required");
    }
    const attendance = await AttendanceRepository.getAllAttendanceByUserId(userId);
    return attendance;
  },
};