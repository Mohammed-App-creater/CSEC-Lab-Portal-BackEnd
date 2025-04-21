import { Router } from 'express';
import { CountUpcomingSessionController } from './controllers/count-upcoming-session';
import { get } from 'http';
import { getSessionsByGroupIdController } from './controllers/get-session-by-groupId';
const sessionRoutes = Router();


/**
 * @swagger
 * /api/session/count-upcoming-session:
 *   get:
 *     summary: Count upcoming sessions
 *     tags: 
 *       - Sessions
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



/**
 * @swagger
 * /api/session/groupId/{groupId}/sessions:
 *   get:
 *     summary: Get sessions by group ID
 *     description: |
 *       Returns a list of sessions and their time slots for a specific group.
 *       The group is identified by a UUID passed in the path.
 *     tags:
 *       - Sessions
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the group to retrieve sessions for
 *     requestBody:
 *       description: Optional request body (not used in this endpoint)
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {}
 *     responses:
 *       '200':
 *         description: Successfully retrieved sessions with time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     description: Session ID
 *                   title:
 *                     type: string
 *                     description: Title of the session
 *                   description:
 *                     type: string
 *                     description: Session description
 *                   startMonth:
 *                     type: string
 *                     description: Month the session starts
 *                   endTMonth:
 *                     type: string
 *                     description: Month the session ends
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Tags associated with the session
 *                   location:
 *                     type: string
 *                     description: Location of the session
 *                   timeSlots:
 *                     type: array
 *                     description: List of time slots for the session
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           description: Time slot ID
 *                         startTime:
 *                           type: string
 *                           format: time
 *                           description: Start time of the slot
 *                         endTime:
 *                           type: string
 *                           format: time
 *                           description: End time of the slot
 *                         date:
 *                           type: string
 *                           format: date
 *                           description: Date of the time slot
 *                         status:
 *                           type: string
 *                           description: Status of the time slot
 *       '400':
 *         description: Group ID is missing or invalid
 *       '500':
 *         description: Internal server error
 */


sessionRoutes.get('/groupId/:groupId/sessions', getSessionsByGroupIdController);



export default sessionRoutes;