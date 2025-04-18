import { G } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { ClubStatus, Gender, RoleType } from "@prisma/client";

export type UserDTO = {
    id: string;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    gender?: Gender;
    email?: string | null;
    password?: string;
    phone_number?: string | null;
    telegramUserName?: string | null;
    bio?: string | null;
    berthDate?: Date | null;
    profileImageUrl?: string | null;
    clubStatus?: ClubStatus;
    specialty?: string | null;
    cvUrl?: string | null;
    lastSeen?: Date | null;
    role?: RoleType;
    isDeleted?: boolean;
  };
  

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