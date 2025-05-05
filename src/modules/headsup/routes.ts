import { he } from '@faker-js/faker/.';
import { getAllHeadsUpController } from './controllers/get-all-headsup.controller'
import { Router } from 'express';
import { createHeadsUpController } from './controllers/create-headsup.conttroler';

const headsUpRoutes = Router();

/**
 * @swagger
 * /api/user-heads-up:
 *   post:
 *     summary: Get all heads-up records for a user
 *     tags:
 *       - HeadsUp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user
 *                 example: "5a13b804-58e4-4647-91b1-890dd5adff0b"
 *     responses:
 *       200:
 *         description: Successfully retrieved heads-up records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 headsUps:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum: [SICK, PERSONAL, OTHER]
 *                       body:
 *                         type: string
 *                       sentAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Missing user ID
 *       500:
 *         description: Internal server error
 */

headsUpRoutes.post('/user-heads-up', getAllHeadsUpController)

headsUpRoutes.post('/create', createHeadsUpController)

export default headsUpRoutes;