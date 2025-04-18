import { SocialLinkDTO } from '@modules/social-link/dto/social-link.dto';
import { ClubStatus, Gender, RoleType } from "@prisma/client";
import { User } from "@prisma/client";

export type UserDTO = Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt' | 'isDeleted' | 'password' | 'DivisionId' |  'UserSettingId' |  'DivisionHeadID'| 'AttendanceSummaryId' >


  

export type AllUserDTO  = {
    data: Omit<UserDTO, 'isDeleted' | 'deletedAt' | 'password'>[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type AllUserDTOWithGroup  = {
    data: UserDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};


export type UserProfileDTO = UserDTO & { socialLinks: SocialLinkDTO[] };
