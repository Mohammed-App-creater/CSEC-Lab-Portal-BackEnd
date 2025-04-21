import { GroupDto, AllGroupMemberDTO } from '@modules/group/dto/group.dto';
import { Divisions } from '@prisma/client';

/**
 * @swagger
 * components:
 *   schemas:
 *     GroupDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "3b8e8f18-0a6f-4b2d-bc8c-09a3a0e72edc"
 *         name:
 *           type: string
 *           example: "Backend Team"
 *         description:
 *           type: string
 *           example: "Handles all backend related features"
 */


export type DivisionGroupDto = {
    id: string;
    name: string;
    groups: GroupDto[];
};

/**
 * @swagger
 * components:
 *   schemas:
 *     DivisionGroupMemberDto:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - groupsAndMembers
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier of the division
 *           example: d5b0c3f2-9d12-4b1d-8d0f-1a4d2e3f1c90
 *         name:
 *           type: string
 *           description: Name of the division
 *           example: Technology Division
 *         groupsAndMembers:
 *           type: array
 *           description: List of groups in the division with their members
 *           items:
 *             $ref: '#/components/schemas/AllGroupMemberDTO'
 */


export type DivisionGroupMemberDto = {
    id: string;
    name: string;
    groupsAndMembers: AllGroupMemberDTO[];
    
};


export type DivisionDto = Omit<Divisions, 'createdAt' | 'updatedAt'>