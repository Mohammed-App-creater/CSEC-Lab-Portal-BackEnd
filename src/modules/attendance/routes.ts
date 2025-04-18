import { Router } from 'express';
import { AttendanceRateController } from './controllers/attendance-rate.controller';

const attendanceRoutes = Router();

/**
 * @swagger
 * /api/attendance/attendance-rate:
 *   get:
 *     summary: Get the attendance rate
 *     tags:
 *       - Attendance
 *     responses:
 *       200:
 *         description: Successful response with attendance rate data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rate:
 *                   type: number
 *                   description: The attendance rate.
 *                   example: 85.5
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the attendance rate was last updated.
 *                   example: 2023-10-01T12:00:00Z
 *       401:
 *         description: Unauthorized - Authentication credentials missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access. Please provide valid authentication.
 *       500:
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An internal server error occurred while processing the request.
 */


attendanceRoutes.get('/attendance-rate', AttendanceRateController);



export default attendanceRoutes;