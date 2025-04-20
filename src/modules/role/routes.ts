import { Router } from 'express';
import { getRoleByIdController } from './controllers/get-role-by-id.controller';
import { ro } from '@faker-js/faker/.';


const roleRouter = Router();


/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the role to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     deprecated: false
 *     operationId: getRoleById
 */


roleRouter.get('/:id', getRoleByIdController);

export default roleRouter;