import { Router } from 'express';
const groupRouter = Router();
import { GroupMemberController } from './controllers/all-group-member.controller';
import { createGroupController } from './controllers/create-group.controller';
import { getAllGroupsByDivisionIdController } from './controllers/get-all-grooups-by-divisionId.controller';

/**
 * @swagger
 * /api/group/group-member/{groupId}/members/{page}/limit/{limit}:
 *   get:
 *     summary: Get all members of a group with pagination
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of members per page
 *     responses:
 *       200:
 *         description: A list of group members with pagination
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllGroupMemberDTO'
 *       404:
 *         description: Group not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Group not found
 */


groupRouter.get('/group-member/:groupId', GroupMemberController.allGroupMembers);

/**
 * @swagger
 * /api/group/group/create:
 *   post:
 *     summary: Create a new group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupCreateDto'
 *     responses:
 *       201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupDto'
 *       500:
 *         description: Internal Server Error
 */

groupRouter.post('/create', createGroupController);


/**
 * @swagger
 * /groups/division/{divisionId}:
 *   get:
 *     summary: Get all groups by Division ID
 *     description: Retrieves a list of groups that belong to the specified division.
 *     tags:
 *       - Group
 *     parameters:
 *       - in: path
 *         name: divisionId
 *         required: true
 *         description: UUID of the division
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A list of groups
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
 *                     example: "6a8276e7-4d24-4de7-8e85-7a26fa91f7fd"
 *                   name:
 *                     type: string
 *                     example: "DEV Team 4"
 *                   description:
 *                     type: string
 *                     example: "Group 4 for DEV"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-22T19:35:25.694Z"
 *       400:
 *         description: Invalid division ID or missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Division not found or no groups in the division
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


groupRouter.get('/division-groups/divisionId/:divisionId', getAllGroupsByDivisionIdController);

export default groupRouter;