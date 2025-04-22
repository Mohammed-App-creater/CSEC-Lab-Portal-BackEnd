import { Router } from 'express';
import { getRoleByIdController } from './controllers/get-role-by-id.controller';
import { getAllRoleController } from './controllers/get-all-role.controller';
import { getAllPermissionsController } from './controllers/get-all-permissions.controller';
import { create } from 'domain';
import { createRoleController } from './controllers/create-role.use-case';

const roleRouter = Router();


/**
 * @swagger
 * /api/role/roles/id/{id}:
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
 * /api/role/roles:
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

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Permissions API
 *   version: 1.0.0
 *   description: API for fetching all permissions in the system.
 * paths:
 *   /permissions:
 *     get:
 *       summary: Get all permissions
 *       description: Retrieves a list of all available permissions.
 *       operationId: getAllPermissions
 *       tags:
 *         - Roles
 *       responses:
 *         '200':
 *           description: A list of permissions
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The unique identifier for the permission.
 *                     key:
 *                       type: string
 *                       description: The key associated with the permission.
 *                     label:
 *                       type: string
 *                       description: A label for the permission.
 *         '404':
 *           description: No permissions found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: No permissions found
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Something went wrong.
 *       security: []
 */

roleRouter.get('/permissions', getAllPermissionsController);

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Role Management API
 *   version: 1.0.0
 *   description: API for managing roles and their associated permissions.
 * paths:
 *   /create:
 *     post:
 *       summary: Create a new role
 *       description: Creates a new role with the specified name and a list of permission IDs.
 *       operationId: createRole
 *       tags:
 *         - Roles
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - permissionsIds
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "admin"
 *                   description: Name of the role.
 *                 permissionsIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [1, 2, 3]
 *                   description: Array of permission IDs to assign to the role.
 *       responses:
 *         '201':
 *           description: Role created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         key:
 *                           type: string
 *                         label:
 *                           type: string
 *         '400':
 *           description: Bad Request – missing or invalid fields
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Name and permissionsIds are required
 *         '409':
 *           description: Conflict – role already exists
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Role already exists
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Something went wrong.
 */


roleRouter.post('/create', createRoleController)

export default roleRouter;