import { Router } from 'express';
import { GetAllEventController } from './controllers/get-all-events.controller';
import { CreateEventController } from './controllers/create-event.controller';

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

/**
 * @swagger
 * /api/event/create:
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - startDate
 *               - startTime
 *               - endTime
 *               - creatorId
 *               - visibility
 *               - tag
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the event
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Date the event starts
 *               startTime:
 *                 type: string
 *                 format: time
 *                 description: Start time of the event
 *               endTime:
 *                 type: string
 *                 format: time
 *                 description: End time of the event
 *               creatorId:
 *                 type: string
 *                 format: uuid
 *                 description: UUID of the event creator
 *               visibility:
 *                 type: string
 *                 enum: [PUBLIC, PRIVATE]
 *                 description: Visibility of the event
 *               tag:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the event
 *               divisionId:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 description: ID of the associated division (nullable if public)
 *               groups:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: Group IDs associated with the event (ignored if public)
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: ID of the created event
 *                 title:
 *                   type: string
 *                   description: Event title
 *                 description:
 *                   type: string
 *                   description: Event description
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *       400:
 *         description: Bad request (invalid input)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid visibility type
 *       409:
 *         description: Conflict (event already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


eventRouter.post('/create', CreateEventController);




export default eventRouter;