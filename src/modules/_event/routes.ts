import { Router } from 'express';
import { GetAllEventController } from './controllers/get-all-events.controller';

const eventRouter = Router();


/**
 * @swagger
 * /api/event/events:
 *   get:
 *     summary: Get all events with their associated groups
 *     tags:
 *       - Events
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of events to return per page
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved a paginated list of events and their groups
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
 *                     description: Event ID
 *                   title:
 *                     type: string
 *                     description: Title of the event
 *                   description:
 *                     type: string
 *                     description: Event description
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     description: Start date of the event
 *                   startTime:
 *                     type: string
 *                     format: time
 *                     description: Start time of the event
 *                   endTime:
 *                     type: string
 *                     format: time
 *                     description: End time of the event
 *                   visibility:
 *                     type: string
 *                     description: Visibility level of the event
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Tags associated with the event
 *                   location:
 *                     type: string
 *                     description: Location of the event
 *                   divisionId:
 *                     type: string
 *                     format: uuid
 *                     description: ID of the division organizing the event
 *                   status:
 *                     type: string
 *                     description: Current status of the event
 *                   creatorId:
 *                     type: string
 *                     format: uuid
 *                     description: User ID of the event creator
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last updated timestamp
 *                   groups:
 *                     type: array
 *                     description: Groups associated with the event
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           description: Group ID
 *                         name:
 *                           type: string
 *                           description: Group name
 *                         description:
 *                           type: string
 *                           description: Group description
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           description: Last updated time of the group
 *       400:
 *         description: Invalid query parameters (e.g., non-positive limit or page)
 *       500:
 *         description: Internal server error
 */


eventRouter.get('/events', GetAllEventController);




export default eventRouter;