import { Router } from 'express';
import { createDivisionController } from './controllers/create-division.controller';
import { countDivisionController } from './controllers/count-division.controller';
import { DivisionGroupsController } from './controllers/division-groups.controler';
import { getDivisionGroupMembersController } from './controllers/get-division-groupsAndMember.controller'
import { getAllDivisionsController } from './controllers/get-all-divisions.controller';
import { getAllDivisionGroupsController } from './controllers/get-all-division-groups.contrroller';
import { getAllDivisionsIdController } from './controllers/gir-all-divisions-id.controller';
const divisionRouter = Router();


/**
 * @swagger
 * /api/division/{divisionId}/groups:
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

divisionRouter.post('/groups', DivisionGroupsController);

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

/**
 * @swagger
 * /api/division/groups-and-members:
 *   post:
 *     summary: Get groups and their members by division ID
 *     tags:
 *       - Division
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               divisionId:
 *                 type: string
 *                 format: uuid
 *                 example: "d5b0c3f2-9d12-4b1d-8d0f-1a4d2e3f1c90"
 *                 description: The UUID of the division
 *     responses:
 *       200:
 *         description: A list of groups and their members for the specified division
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DivisionGroupMemberDto'
 *       400:
 *         description: Bad request (invalid division ID)
 *       500:
 *         description: Internal server error
 */

divisionRouter.post('/groups-and-members', getDivisionGroupMembersController);

/**
 * @swagger
 * /api/division/{divisionId}/groups:
 *   get:
 *     summary: Get all groups under a specific division
 *     tags: [Division]
 *     parameters:
 *       - in: path
 *         name: divisionId
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
 *                   example: b7f2b0a0-39d3-4f82-8c89-8f814cc13f2f
 *                 name:
 *                   type: string
 *                   example: Tech Division
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
 *       403:
 *         description: You don't have permission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You don't have permission
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


divisionRouter.get('/:divisionId/groups', DivisionGroupsController);



divisionRouter.get('/divisions', getAllDivisionsController)

divisionRouter.get('/divisions-id', getAllDivisionsIdController);


/**
 * @swagger
 * /api/division/all-divisions-and-groups:
 *   get:
 *     summary: Get all divisions
 *     tags: [Division]
 *     responses:
 *       200:
 *         description: A list of all divisions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DivisionDto'
 */
divisionRouter.get('/all-divisions-and-groups', getAllDivisionGroupsController);





export default divisionRouter;
