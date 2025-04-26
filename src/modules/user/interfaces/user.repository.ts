import {  Role } from '@prisma/client';
import { prisma } from '@shared/utils/prisma';
import { hashPassword } from '@shared/utils/hashPassword';
import { RegisterUserDTO } from '../dto/auth-user.dto';
import { UserDTO, UserSettingDTO } from '../dto/user.dto';
import { normalizeUndefinedToNull } from '@shared/utils/normalizeUndefinedToNull'; // adjust path as needed
import { getRoleByNameUseCase } from '@modules/role/use-cases/get-role-by-name.use-case';
import { BaseError } from '@/shared/errors/BaseError';
import { w } from '@faker-js/faker/dist/airline-BUL6NtOJ';




const roleMember = getRoleByNameUseCase('Member');

export const findByEmail = {
  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email }, include: { Role: true } });
  }
};

export const getUserRole = {
  getUserRole: async (userId: string): Promise<Role['name']> => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        Role: {
          select: { name: true }
        }
      },
    });

    return user?.Role.name || 'Unknown'; // default fallback
  }
};

export const getUserSettqings = {
  getUserSettings: async (userId: string): Promise<UserSettingDTO> => {
    const userSettings = await prisma.userSetting.findUnique({
      where: { userId },
      select: {
        id: true,
        userId: true,
        theme: true,
        phonePublic: true,
        authUpdateCalendar: true
      },
    });

    if (!userSettings) {
      throw new BaseError('User settings not found');
    }
    return userSettings;
  }
};

export const getUsersByRole = {
  getUsersByRole: async (role: string) => {
    const users = await prisma.user.findMany({
      where: {
        Role: { name: role },
        deletedAt: null,
        isDeleted: false,
      },
      select: {
        firstName: true,
        middleName: true,
        lastName: true,
        Divisions: {
          select: {
            id: true,
            name: true,
          },
        },
        Role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return users;
  },
};


export const existingUser = {
  existingUser: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}

export const findById = {
  findById: (id: string) => {
    return prisma.user.findUnique({ where: { id } });
  }
};

export const CreateUser = {
  createUser: async (userData: RegisterUserDTO & { groupId?: string }) => {
    const { email, password, gender, DivisionId, groupId } = userData;

    if (!password) {
      throw new BaseError('Password cannot be null or undefined');
    }

    const hashedPassword = await hashPassword(password);

    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        gender,
        DivisionId,
        lastSeen: new Date(),
        roleId: (await roleMember).id,
        groups: groupId
          ? {
            connect: { id: groupId },  // Connect the user to the group by ID
          }
          : undefined,
      },
    });
  },
};



export const UpdateUser = {
  updateUser: async (userId: string, userData: any) => {
    return prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }
};

export const UpdateUserRole = {
  updateRole: async (userId: string, roleId: string) => {
    return prisma.user.update({
      where: { id: userId },
      data: { roleId: roleId },
    });
  }
};

export const UserSettings = {
  update: async (userId: string, updates: Partial<UserSettingDTO>) => {
    return prisma.userSetting.update({
      where: { userId },
      data: updates,
    });
  }
};

export const FindAllUsers = {
  findAllUsers: async (page = 1, limit = 10): Promise<{ data: UserDTO[]; total: number; page: number; limit: number; totalPages: number }> => {
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      skip,
      take: limit,
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        gender: true,
        email: true,
        phone_number: true,
        telegramUserName: true,
        bio: true,
        berthDate: true,
        profileImageUrl: true,
        clubStatus: true,
        specialty: true,
        cvUrl: true,
        lastSeen: true,
        universityInfo:{
          select: {
            currentYear: true,
            universityId: true,
            status: true,
            expectedGraduationYear: true, 
          }
        },
        Role: {
          select: {
            id: true,
            name: true,
          },
        }
      },
    });

    // Map nulls to undefined where necessary

    const total = await prisma.user.count({
      where: {
        deletedAt: null,
      },
    });

    return {
      data: users.map(user => ({
        ...user,
        roleId: user.Role?.id || '',
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  findAllUsersByGroupId: async (groupId: string, page: number, limit: number) => {
    const Users: UserDTO[] = (await prisma.user.findMany({
      where: {
        deletedAt: null,
        groups: {
          some: {
            id: groupId,
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        gender: true,
        email: true,
        phone_number: true,
        telegramUserName: true,
        bio: true,
        berthDate: true,
        profileImageUrl: true,
        clubStatus: true,
        specialty: true,
        cvUrl: true,
        lastSeen: true,
        roleId: true,
        Role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })).map(normalizeUndefinedToNull);


    const paginatedUsers = await prisma.user.findMany({
      where: {
        deletedAt: null,
        groups: {
          some: {
            id: groupId,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.user.count({
      where: {
        deletedAt: null,
        groups: {
          some: {
            id: groupId,
          },
        },
      },
    });

    return {
      data: Users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
};

export const DeleteUser = {
  deleteUser: async (userId: string) => {
    return prisma.user.update({
      where: { id: userId },
      data: {
        email: null,
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
};


export const UserCount = {
  userCount: () => {
    return prisma.user.count();
  },
  countUserWhere: (where: any) => {
    return prisma.user.count({ where });
  }
};
