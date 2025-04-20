import { AllUserDTOWithGroup } from '@modules/user/dto/user.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     GroupDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "a19e2d56-cb76-4c45-9d26-fb32f6b1de32"
 *         name:
 *           type: string
 *           example: "Backend Group"
 *         description:
 *           type: string
 *           example: "Handles all backend services"
 */

export type GroupDto = {
    id: string;
    name: string;
    description: string | null;
    updatedAt: Date;
};


/**
 * @swagger
 * components:
 *   schemas:
 *     GroupCreateDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Backend Group"
 */

export type GroupCreateDto = {
    name: string;
    divisionId: string;
};

export type GroupUpdateDto = {
    name?: string;
    description?: string;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     AllGroupMemberDTO:
 *       type: object
 *       properties:
 *         groupId:
 *           type: string
 *           example: "8a2e2d90-1c4f-4a21-91a3-49cc6e9c2b11"
 *         groupName:
 *           type: string
 *           example: "UI/UX Group"
 *         members:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GroupMember'
 *     GroupMember:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         fullName:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john@example.com"
 *         role:
 *           type: string
 *           example: "Member"
 */

export type AllGroupMemberDTO = {
    groupName: string;
    groupId: string;
    members: AllUserDTOWithGroup;
};