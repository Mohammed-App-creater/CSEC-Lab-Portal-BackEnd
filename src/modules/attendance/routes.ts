import { Router } from 'express';
import { AttendanceRateController } from './controllers/attendance-rate.controller';
import { AllAttendanceController } from './controllers/all-attendance.controller';
import { userAttendanceSummaryController } from './controllers/user-attendaance-summary.controller';
import { getAllAttendanceController } from './controllers/getAllAttendance.controller';


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

/**
 * @swagger
 * /api/attendance/user-all-attendance:
 *   post:
 *     tags:
 *       - Attendance
 *     summary: Get all attendance records for a user
 *     description: Retrieves all attendance records associated with a given user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The UUID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Bad request - User ID not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User ID is required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unknown error occurred
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         sessionId:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [PRESENT, ABSENT, LATE, EXCUSED]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

attendanceRoutes.post('/user-all-attendance', AllAttendanceController);

/**
 * @swagger
 * /api/attendance/attendance-summary:
 *   post:
 *     summary: Get user attendance summary
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID
 *     responses:
 *       200:
 *         description: Attendance summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     attendanceRate:
 *                       type: number
 *                     lastWeekAttendanceRate:
 *                       type: number
 *                     lastMonthAttendanceRate:
 *                       type: number
 *                     headsUp:
 *                       type: number
 *                     present:
 *                       type: number
 *                     absent:
 *                       type: number
 *                     updateAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing user ID
 *       500:
 *         description: Internal server error
 */

attendanceRoutes.post('/user-attendance-summary', userAttendanceSummaryController);


attendanceRoutes.get('/get-all-attendance', getAllAttendanceController);

export default attendanceRoutes;