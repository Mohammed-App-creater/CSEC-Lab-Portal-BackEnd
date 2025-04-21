import { Router } from 'express';
import { CountUpcomingSessionController } from './controllers/count-upcoming-session';
import { getAllSessionsController } from './controllers/get-all-sessions.controller';
import { getSessionsByGroupIdController } from './controllers/get-session-by-groupId.controller';
import { CreateEventController } from '../_event/controllers/create-event.controller';
import { createSessionController } from './controllers/create-session.controller';
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




sessionRoutes.get('/sessions', getAllSessionsController);



/**
 * @swagger
 * /api/sessions/create:
 *   post:
 *     summary: Create a new session
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - startMonth
 *               - endTMonth
 *               - creatorId
 *               - divisionId
 *               - tags
 *               - timeSlotAndGroup
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Frontend Masterclass"
 *               description:
 *                 type: string
 *                 example: "Deep dive into advanced React and Next.js"
 *               startMonth:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-01T00:00:00.000Z"
 *               endTMonth:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-05T00:00:00.000Z"
 *               location:
 *                 type: string
 *                 example: "ASTU Tech Hall"
 *               creatorId:
 *                 type: string
 *                 format: uuid
 *                 example: "9b4f4a60-2d60-4c4d-888f-40e2d7c3e4f9"
 *               divisionId:
 *                 type: string
 *                 format: uuid
 *                 example: "8ac93b24-3bfa-43d6-a2a9-c4b9871f0fc3"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [CPD, CBD, SEC, DEV, DS, ENTIRE]
 *                 example: ["DEV", "CPD"]
 *               timeSlotAndGroup:
 *                 type: object
 *                 required:
 *                   - groupIds
 *                   - timeSlots
 *                 properties:
 *                   groupIds:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: uuid
 *                     example: [
 *                       "1e43728d-12e1-42f3-a263-2de4fda44410",
 *                       "7cd90e93-933b-4af9-8859-5d48e1fa8c5f"
 *                     ]
 *                   timeSlots:
 *                     type: array
 *                     items:
 *                       type: object
 *                       required:
 *                         - date
 *                         - startTime
 *                         - endTime
 *                       properties:
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-05-01T00:00:00.000Z"
 *                         startTime:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-05-01T10:00:00.000Z"
 *                         endTime:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-05-01T12:00:00.000Z"
 *     responses:
 *       '201':
 *         description: Session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 startMonth:
 *                   type: string
 *                   format: date-time
 *                 endTMonth:
 *                   type: string
 *                   format: date-time
 *                 location:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       '400':
 *         description: Invalid input or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

sessionRoutes.post('/create', createSessionController)



export default sessionRoutes;