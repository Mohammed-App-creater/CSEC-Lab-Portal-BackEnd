import { Router } from 'express';
import { getRoleByIdController } from './controllers/get-role-by-id.controller';
import { getAllRoleController } from './controllers/get-all-role.controller';

const roleRouter = Router();


/**
 * @swagger
 * /roles/id/{id}:
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

roleRouter.get('/id/:roleId', getRoleByIdController);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles with their assigned permissions
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: A list of roles with their permissions
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
 *                     example: "3f29c734-9d88-4b3e-abe3-643fabc97a89"
 *                   name:
 *                     type: string
 *                     example: "Admin"
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         key:
 *                           type: string
 *                           example: "user.promote"
 *                         label:
 *                           type: string
 *                           example: "Promote User"
 *       500:
 *         description: Internal server error
 */

roleRouter.get('/roles', getAllRoleController);

export default roleRouter;