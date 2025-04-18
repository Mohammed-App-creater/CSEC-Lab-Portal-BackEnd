import { Router } from 'express';
import { CountUpcomingSessionController } from './controllers/count-upcoming-session';
const sessionRoutes = Router();


/**
 * @swagger
 * /api/session/count-upcoming-session:
 *   get:
 *     summary: Count upcoming sessions
 *     tags: 
 *       - sessions
 *     responses:
 *       200:
 *         description: Count of upcoming sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The number of upcoming sessions
 *                   example: 5
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Internal server error
 */

sessionRoutes.get('/count-upcoming-session', CountUpcomingSessionController.countUpcomingSession);



export default sessionRoutes;