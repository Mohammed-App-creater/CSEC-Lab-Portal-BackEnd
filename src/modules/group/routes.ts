import { Router } from 'express';
const groupRouter = Router();
import { GroupMemberController } from './controllers/all-group-member';

/**
 * @swagger
 * /group-member/{groupId}/members/{page}/limit/{limit}:
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


groupRouter.get('/group-member/:groupId/members/:page/limit/:limit', GroupMemberController.allGroupMembers);

export default groupRouter;