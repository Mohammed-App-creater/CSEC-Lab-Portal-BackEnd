import { GroupDto, AllGroupMemberDTO } from '@modules/group/dto/group.dto';

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

export type DivisionGroupMemberDto = {
    id: string;
    name: string;
    groups: AllGroupMemberDTO[];
    
};