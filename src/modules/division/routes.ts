import { Router } from 'express';
import { createDivisionController } from './controllers/create-division.controller';
import { countDivisionController } from './controllers/count-division.controller';
import { DivisionGroupsController } from './controllers/division-groups.controler'
const divisionRouter = Router();


/**
 * @swagger
 * /division/{divisionId}/groups:
 *   get:
 *     summary: Get all groups under a specific division
 *     tags: [Division]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the division
 *     responses:
 *       200:
 *         description: List of groups under the division
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "b7f2b0a0-39d3-4f82-8c89-8f814cc13f2f"
 *                 name:
 *                   type: string
 *                   example: "Tech Division"
 *                 groups:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GroupDto'
 *       404:
 *         description: Division not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Division not found
 */

divisionRouter.use('/:divisionId/groups', DivisionGroupsController);

/**
 * @swagger
 * /api/division/create-division:
 *   post:
 *     summary: Create Division
 *     tags: [Division]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description 
 *               - establishedYear
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               establishedYear:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: '[division.name] successfully created'
 *       400:
 *         description: Invalid request body
 *       403:
 *         description: You don't have permission
 */

divisionRouter.post('/create-division', createDivisionController);

/**
 * @swagger
 * /api/division/count-division:
 *   get:
 *     summary: Count Division
 *     tags: [Division]
 *     responses:
 *       200:
 *         description: Successfully counted divisions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 */

divisionRouter.get('/count-division', countDivisionController);




export default divisionRouter;
