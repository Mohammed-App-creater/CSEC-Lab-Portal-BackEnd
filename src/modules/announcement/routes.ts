import { Router } from 'express';
import { getRecentAnnouncement } from './controllers/recent-announcement.controller';
const announcementRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Announcement
 *     description: Announcement management
 * 
 * /announcement/recent:
 *   get:
 *     summary: Get recent announcements
 *     description: Fetch the most recent announcements.
 *     tags:
 *       - Announcement
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of recent announcements to fetch (default is 5).
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: A list of recent announcements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   authorId:
 *                     type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


announcementRouter.get('/recent', getRecentAnnouncement);

export default announcementRouter;