import { RequestHandler, Router } from 'express';
import { loginController } from './controllers/login.controller';
import { registerController } from './controllers/register.controller';
import { countUserController } from './controllers/count-user.controller';
import { findAllUsersController } from './controllers/all-users.controller';
import { getUserProfileController, updateUserProfileController } from './controllers/user-profile.controller';
import { getUserRoleController } from './controllers/get-user-role';
import { getUsersByRoleController } from './controllers/get-users-by-role.controller';
import { updateUserRoleController } from './controllers/update-user-role.controller';
import deleteUserController from './controllers/delete.user.controller';
import updateUserSettingController from './controllers/updatee-userSetting.controller';
import { refreshTokenController } from './controllers/refresh-token.controller';
import { logoutController } from './controllers/logout.controller';
import { authMiddleware } from './middlewares/authMiddleware';
import { getUserById } from './use-cases/get-user-by-id';
import { getUserByIdController } from './controllers/get-user-by-id.controller';
import { jwtValidator } from '@/app/middleware/JWTValidator';
import { validateTokenController } from './controllers/validateToken.controller';

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
 *               - remember
 *               - email
 *               - password
 *             properties:
 *               remember: 
 *                 type: boolean
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNjdkMTNiMS1iODVjLTQwMzItYjE2Mi00NTdmYjYzZTZlMzciLCJyb2xlSWQiOiJmODMyYTQ5MC1kZjIyLTQzNzktYTUwYi02N2I5YWUwODhhZjQiLCJpYXQiOjE3NDUzMDUwMjQsImV4cCI6MTc0NTM5MTQyNH0.xbENCBkFYBR6arBp2_m-HU1a_zoCYIazrT61GCui4v8
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 367d13b1-b85c-4032-b162-457fb63e6e37
 *                     name:
 *                       type: string
 *                       example: User6 Test6
 *                     role:
 *                       type: string
 *                       example: DivisionHead
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

userRouter.patch('/update-user-role', updateUserRoleController);


userRouter.get('/validate-token', jwtValidator, validateTokenController);

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

/**
 * @swagger
 * /api/user/userProfile:
 *   post:
 *     summary: Get user profile
 *     tags:
 *       - Users
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
 *                 description: ID of the user
 *                 example: "b9f3c5e7-4b5a-44df-99e0-65a6f8f1474a"
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfileDTO'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ResourceLinkDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         resourceLinkName:
 *           type: string
 *         resourceLinkUrl:
 *           type: string
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     UserProfileDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         socialLinks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *               url:
 *                 type: string
 *         resourceLinks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ResourceLinkDTO'
 */

userRouter.post('/userProfile', getUserProfileController);

/**
 * @swagger
 * /api/user/get-user-role/:
 *   post:
 *     summary: Get user role by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User role successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *                   enum: [ADMIN, MEMBER, GUEST] # Adjust based on your RoleType enum
 *       404:
 *         description: User not found.
 */

userRouter.post('/get-user-role', getUserRoleController);

/**
 * @swagger
 * /api/user/get-users-by-role:
 *   get:
 *     summary: Get users by role
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Member, SuperAdmin, President, VicePresident, DivisionHead, Coordinator]
 *         description: User role
 *     responses:
 *       200:
 *         description: Users successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 */

userRouter.post('/get-users-by-role', getUsersByRoleController);


/**
 * @swagger
 * /api/user/update-user-role:
 *   patch:
 *     summary: Update user role
 *     tags: [Users]
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
 *               roleId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: User role successfully updated.
 *       400:
 *         description: Invalid input.
 */
userRouter.patch('/update-user-role', updateUserRoleController)

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: User Management API
 *   version: 1.0.0
 *   description: API for managing users, including deleting a user by ID.
 * paths:
 *   /users/{id}:
 *     delete:
 *       summary: Delete a user
 *       description: Deletes a user by their UUID.
 *       operationId: deleteUser
 *       tags:
 *         - Users
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: The UUID of the user to delete.
 *       responses:
 *         '200':
 *           description: User deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Member John Doe is deleted successfully
 *         '400':
 *           description: Invalid UUID or bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Invalid UUID format
 *         '404':
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: User not found or invalid user data
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Something went wrong
 */

userRouter.delete('/delete-user/:id', deleteUserController);


/**
 * @swagger
 * /api/user/update-user-settings/{id}:
 *   patch:
 *     summary: Update user settings
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update settings for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *                 enum: [LIGHT, DARK, SYSTEM]
 *                 description: The UI theme preference
 *               phonePublic:
 *                 type: boolean
 *                 description: Whether the user's phone is publicly visible
 *               authUpdateCalendar:
 *                 type: boolean
 *                 description: Whether the user allows auto-update of calendar events
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 theme:
 *                   type: string
 *                   enum: [LIGHT, DARK, SYSTEM]
 *                 phonePublic:
 *                   type: boolean
 *                 authUpdateCalendar:
 *                   type: boolean
 *       400:
 *         description: Invalid input or bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

userRouter.patch('/users/:id/settings', updateUserSettingController);

/**
 * @swagger
 * /api/user/update-user-profile:
 *   patch:
 *     summary: Update user profile including basic info, social links, resource links, and university info.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/UserProfileDTO'
 *               - type: object
 *                 properties:
 *                   universityInfo:
 *                     $ref: '#/components/schemas/UserUniversityInfoDTO'
 *     responses:
 *       200:
 *         description: Successfully updated the user profile.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/UserProfileDTO'
 *                 - type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     universityInfo:
 *                       $ref: '#/components/schemas/UserUniversityInfoDTO'
 *       400:
 *         description: Bad request, missing or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */


userRouter.patch('/update-user-profile', updateUserProfileController);


userRouter.get('/refresh-token', refreshTokenController);

userRouter.get('/get-user-by-id/:id', getUserByIdController);


userRouter.get('/logout', authMiddleware, logoutController as unknown as RequestHandler);



export default userRouter;
