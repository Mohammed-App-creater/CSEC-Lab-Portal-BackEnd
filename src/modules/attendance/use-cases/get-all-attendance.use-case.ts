import { AttendanceRepository  } from '../interfaces/attendance.repositry'
import { AttendanceDto } from '../dto/attendance.dto'



export const getAllAttendances = () => {
    const allAttendances = AttendanceRepository.getAllAttendances();
    if (!allAttendances) {
        throw new Error('No attendance found');
    }
    return allAttendances;
}