import { Router } from 'express';
import { loginController } from './controllers/login.controller';
import { registerController } from './controllers/register.controller';
import { countUserController } from './controllers/count-user.controller';
import { findAllUsersController } from './controllers/all-users.controller';
import { getUserProfileController } from './controllers/user-profile.controller'; 

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const userRouter = Router();

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

userRouter.post('/login', loginController);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid input
 */

userRouter.post('/register', registerController);

/**
 * @swagger
 * /api/user/count-user:
 *   get:
 *     summary: Count the number of users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A count of users successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total number of users.
 *                   example: 100
 *       401:
 *         description: Unauthorized - Authentication credentials missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access. Please provide valid authentication.
 *       500:
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An internal server error occurred while processing the request.
 */

userRouter.get('/count-user', countUserController);

/**
 * @swagger
 * /api/user/all-users:
 *   get:
 *     summary: Get all non-deleted users with pagination
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page.
 *     responses:
 *       200:
 *         description: A list of users successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                         nullable: true
 *                       middleName:
 *                         type: string
 *                         nullable: true
 *                       lastName:
 *                         type: string
 *                         nullable: true
 *                       gender:
 *                         type: string
 *                         enum: [MALE, FEMALE, OTHER]
 *                       email:
 *                         type: string
 *                       phone_number:
 *                         type: string
 *                         nullable: true
 *                       telegramUserName:
 *                         type: string
 *                         nullable: true
 *                       bio:
 *                         type: string
 *                         nullable: true
 *                       berthDate:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                       profileImageUrl:
 *                         type: string
 *                         nullable: true
 *                       clubStatus:
 *                         type: string
 *                         enum: [ACTIVE, INACTIVE]
 *                         nullable: true
 *                       specialty:
 *                         type: string
 *                         nullable: true
 *                       cvUrl:
 *                         type: string
 *                         nullable: true
 *                       lastSeen:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       role:
 *                         type: string
 *                         enum: [ADMIN, MEMBER, GUEST] # Change based on your actual RoleType enum
 *                         nullable: true
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Server error
 */

userRouter.get('/all-users', findAllUsersController);

userRouter.post('/userProfile', getUserProfileController );

export default userRouter;
