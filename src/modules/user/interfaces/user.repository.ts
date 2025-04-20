import { PrismaClient, Role, User } from '@prisma/client';
import { hashPassword } from '@shared/utils/hashPassword';
import { RegisterUserDTO } from '../dto/auth-user.dto';
import { AllUserDTOWithGroup, UserDTO } from '../dto/user.dto';
import { normalizeUndefinedToNull } from '@shared/utils/normalizeUndefinedToNull'; // adjust path as needed
import { getRoleByNameUseCase } from '@modules/role/use-cases/get-role-by-name.use-case';
import { getRoleByIdUseCase } from '@modules/role/use-cases/get-role-by-id.use-case';


const prisma = new PrismaClient();

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
      throw new Error('Password cannot be null or undefined');
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



export const UserCount = {
  userCount: () => {
    return prisma.user.count();
  }
};
