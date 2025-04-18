import { Router } from 'express';
import { createDivisionController } from './controllers/create-division.controller';
import { countDivisionController } from './controllers/count-division.controller';
const divisionRouter = Router();

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
