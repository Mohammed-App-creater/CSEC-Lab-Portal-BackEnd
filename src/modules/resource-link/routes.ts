import { Router } from 'express';
import { createResourceLink, deleteResourceLink, getResourceLinkById, getResourceLinks, updateResourceLink} from './controllers/CRUD-social-link';
const userResourceLink = Router();

/**
 * @swagger
 * /api/resource-link:
 *   post:
 *     summary: Create a new resource link
 *     tags: [Resource Links]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *               resourceLinkName:
 *                 type: string
 *               resourceLinkUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resource link created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 resourceLinkName:
 *                   type: string
 *                 resourceLinkUrl:
 *                   type: string
 *                 CreatedAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

userResourceLink.post('/resource-link', createResourceLink);

/**
 * @swagger
 * /api/resource-link/{id}:
 *   get:
 *     summary: Get a resource link by ID
 *     tags: [Resource Links]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the resource link
 *     responses:
 *       200:
 *         description: Resource link retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 resourceLinkName:
 *                   type: string
 *                 resourceLinkUrl:
 *                   type: string
 *                 CreatedAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Resource link not found
 *       500:
 *         description: Internal server error
 */

userResourceLink.get('/resource-link/:id', getResourceLinkById);

/**
 * @swagger
 * /api/resource-link/user/{userId}:
 *   get:
 *     summary: Get all resource links for a user
 *     tags: [Resource Links]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Resource links retrieved successfully
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
 *                   userId:
 *                     type: string
 *                     format: uuid
 *                   resourceLinkName:
 *                     type: string
 *                   resourceLinkUrl:
 *                     type: string
 *                   CreatedAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No resource links found for the user
 *       500:
 *         description: Internal server error
 */

userResourceLink.get('/resource-link/user/:userId', getResourceLinks);

/**
 * @swagger
 * /api/resource-link/{id}:
 *   patch:
 *     summary: Update a resource link by ID
 *     tags: [Resource Links]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the resource link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resourceLinkName:
 *                 type: string
 *               resourceLinkUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resource link updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 resourceLinkName:
 *                   type: string
 *                 resourceLinkUrl:
 *                   type: string
 *                 CreatedAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Resource link not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

userResourceLink.patch('/resource-link/:id', updateResourceLink);

/**
 * @swagger
 * /api/resource-link/{id}:
 *   delete:
 *     summary: Delete a resource link by ID
 *     tags: [Resource Links]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the resource link
 *     responses:
 *       204:
 *         description: Resource link deleted successfully
 *       404:
 *         description: Resource link not found
 *       500:
 *         description: Internal server error
 */

userResourceLink.delete('/resource-link/:id', deleteResourceLink);

export default userResourceLink;