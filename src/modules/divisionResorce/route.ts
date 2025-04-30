import { CRUDDivisionResourceController } from './controllers/CRUD-Division-Resource-.controller';
import { Router } from 'express';

const DivisionResourceRouter = Router();
const CRUDDivisionResourceControllerInstance = new CRUDDivisionResourceController();

/**
 * @swagger
 * /api/division-resources:
 *   post:
 *     summary: Create a new division resource link
 *     tags: [DivisionResources]
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
 *               divisionId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Division Resource Link created successfully
 */
DivisionResourceRouter.post('/', CRUDDivisionResourceControllerInstance.createDivisionResourceLink.bind(CRUDDivisionResourceControllerInstance));

/**
 * @swagger
 * /api/division-resources/{divisionId}:
 *   get:
 *     summary: Get all division resource links by division ID
 *     tags: [DivisionResources]
 *     parameters:
 *       - in: path
 *         name: divisionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Division Resource Links retrieved successfully
 */
DivisionResourceRouter.get('/:divisionId', CRUDDivisionResourceControllerInstance.getDivisionResourceLinks.bind(CRUDDivisionResourceControllerInstance));

/**
 * @swagger
 * /api/division-resources/link/{id}:
 *   get:
 *     summary: Get a specific division resource link by ID
 *     tags: [DivisionResources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Division Resource Link retrieved successfully
 *       404:
 *         description: Resource Link not found
 */
DivisionResourceRouter.get('/link/:id', CRUDDivisionResourceControllerInstance.getDivisionResourceLinkById.bind(CRUDDivisionResourceControllerInstance));

/**
 * @swagger
 * /api/division-resources/all/{divisionId}:
 *   get:
 *     summary: Get all resource links by division ID
 *     tags: [DivisionResources]
 *     parameters:
 *       - in: path
 *         name: divisionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Division Resource Links retrieved successfully
 */
DivisionResourceRouter.get('/all/:divisionId', CRUDDivisionResourceControllerInstance.getAllResourceLinkByUserId.bind(CRUDDivisionResourceControllerInstance));

/**
 * @swagger
 * /api/division-resources/{id}:
 *   put:
 *     summary: Update a specific division resource link by ID
 *     tags: [DivisionResources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Division Resource Link updated successfully
 */
DivisionResourceRouter.put('/:id', CRUDDivisionResourceControllerInstance.updateDivisionResourceLink.bind(CRUDDivisionResourceControllerInstance));

/**
 * @swagger
 * /api/division-resources/{id}:
 *   delete:
 *     summary: Delete a specific division resource link by ID
 *     tags: [DivisionResources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Division Resource Link deleted successfully
 */
DivisionResourceRouter.delete('/:id', CRUDDivisionResourceControllerInstance.deleteDivisionResourceLink.bind(CRUDDivisionResourceControllerInstance));

export default DivisionResourceRouter;
