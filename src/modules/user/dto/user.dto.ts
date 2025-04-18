import { G } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { ClubStatus, Gender, RoleType } from "@prisma/client";

export type UserDTO = {
    id: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    gender?: Gender;
    email?: string;
    password?: string;
    phone_number?: string;
    telegramUserName?: string;
    bio?: string;
    berthDate?: Date;
    profileImageUrl?: string;
    clubStatus?: ClubStatus;
    specialty?: string;
    cvUrl?: string;
    lastSeen?: Date;
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