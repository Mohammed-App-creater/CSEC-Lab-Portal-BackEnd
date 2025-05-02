import { CRUDDivisionResourceController } from './controllers/CRUD-Division-Resource-.controller';
import { Router } from 'express';
import { getAllDivisionsResourceController } from './controllers/get-AllDivisions-Resource.Controller';

const DivisionResourceRouter = Router();
const CRUDDivisionResourceControllerInstance = new CRUDDivisionResourceController();


/**
 * @swagger
 * paths:
 *   /all-divisions-resource:
 *     get:
 *       summary: Get all divisions with their resource links
 *       tags:
 *         - DivisionResources
 *       responses:
 *         '200':
 *           description: Successfully retrieved all divisions with resource links
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: CPD
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: bc539ae7-1452-4bc4-9e1b-f2b030c4215c
 *                     resourceLink:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             example: c4c66795-c267-4c49-a13e-124c6934a064
 *                           resourceLinkName:
 *                             type: string
 *                             example: Weekly Meeting Notes
 *                           resourceLinkUrl:
 *                             type: string
 *                             format: uri
 *                             example: https://example.com/weekly-notes.pdf
 *                           divisionId:
 *                             type: string
 *                             format: uuid
 *                             example: bc539ae7-1452-4bc4-9e1b-f2b030c4215c
 *                           CreatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-05-02T13:32:26.493Z
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-05-02T13:33:02.276Z
 *         '400':
 *           description: No divisions found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: There is no Divisions, please create a division first
 */


DivisionResourceRouter.get('/all-divisions-resource', getAllDivisionsResourceController);


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
