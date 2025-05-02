import { SocialLinkDTO } from '@modules/social-link/dto/social-link.dto';
import { ResourceLinkDTO } from '@/modules/resource-link/dto/resource-link.dto'
import { UserSetting, UniversityInfo } from "@prisma/client";
import { User } from "@prisma/client";

/**
 * @swagger
 * components:
 *   schemas:
 *     SocialLinkDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         socialLinkName:
 *           type: string
 *         socialLinkUrl:
 *           type: string
 *           format: uri
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     UserDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         firstName:
 *           type: string
 *         middleName:
 *           type: string
 *           nullable: true
 *         lastName:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [MALE, FEMALE, OTHER]  # adjust as per your enum
 *         email:
 *           type: string
 *           format: email
 *           nullable: true
 *         phone_number:
 *           type: string
 *           nullable: true
 *         telegramUserName:
 *           type: string
 *           nullable: true
 *         bio:
 *           type: string
 *           nullable: true
 *         berthDate:
 *           type: string
 *           format: date
 *           nullable: true
 *         profileImageUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 *         clubStatus:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, PENDING]  # adjust to your enum
 *           nullable: true
 *         specialty:
 *           type: string
 *           nullable: true
 *         cvUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 *         lastSeen:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         role:
 *           type: string
 *           enum: [MEMBER, ADMIN, EXECUTIVE, HEAD]  # adjust to your RoleType
 *
 *     UserProfileDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/UserDTO'
 *         - type: object
 *           properties:
 *             socialLinks:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocialLinkDTO'
 */


export type UserDTO = Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt' | 'isDeleted' | 'password' | 'DivisionId' | 'UserSettingId' | 'DivisionHeadID' | 'AttendanceSummaryId'>

export type AllUserDTO = {
    data: Omit<UserDTO, 'isDeleted' | 'deletedAt' | 'password'>[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type AllUserDTOWithGroup = {
    data: UserDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type UserRoleDTO = {
    role: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUniversityInfoDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         department:
 *           type: string
 *         section:
 *           type: string
 *         year:
 *           type: integer
 *         campus:
 *           type: string
 */


export type UserUniversityInfoDTO = Omit<UniversityInfo, 'userId'>;

export type UserProfileDTO = UserDTO & { socialLinks: SocialLinkDTO[] } & { resourceLinks: ResourceLinkDTO[] } & { universityInfo: UserUniversityInfoDTO };

export type UpdateUserProfileDTO = Partial<UserProfileDTO> & Partial<Pick<User, 'password'>> & { userId: string };

export type UpdateUserRoleDTO = Pick<UserDTO, 'roleId'> & { userId: string };

export type UserSettingDTO = UserSetting
