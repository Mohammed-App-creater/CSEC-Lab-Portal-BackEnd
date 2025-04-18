import { Router } from 'express';
import { getDashboardSummaryController } from './controllers/dashbord-semmery.controller';

const dashboardRoutes = Router();

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalMembers:
 *                       type: number
 *                     totalDivisions:
 *                       type: number
 *                     attendanceRate:
 *                       type: number
 *                     upcomingSessions:
 *                       type: number
 *                 updateAt:
 *                   type: string
 *                        
 *       500:
 *         description: Internal server error
 */


dashboardRoutes.get('/summary', getDashboardSummaryController);


export default dashboardRoutes;