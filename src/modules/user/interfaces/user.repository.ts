import { PrismaClient, User } from '@prisma/client';
import { hashPassword } from '@shared/utils/hashPassword'; 
import { RegisterUserDTO } from '../dto/auth-user.dto';
import { AllUserDTOWithGroup, UserDTO } from '../dto/user.dto';
const prisma = new PrismaClient();


export const findByEmail = {
  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  }
};

export const existingUser = {
  existingUser: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}

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
  findAllUsers: async (page = 1, limit = 10): Promise<{ data: any[]; total: number; page: number; limit: number; totalPages: number }> => {
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
        role: true,
      },
    });

    // Map nulls to undefined where necessary
    const formattedUsers = users.map(user => ({
      ...user,
      email: user.email ?? undefined,
      phone_number: user.phone_number ?? undefined,
      telegramUserName: user.telegramUserName ?? undefined,
      bio: user.bio ?? undefined,
      berthDate: user.berthDate ?? undefined,
      profileImageUrl: user.profileImageUrl ?? undefined,
      clubStatus: user.clubStatus ?? undefined,
      specialty: user.specialty ?? undefined,
      cvUrl: user.cvUrl ?? undefined,
      lastSeen: user.lastSeen ?? undefined,
      role: user.role ?? undefined,
    }));

    const total = await prisma.user.count({
      where: {
        deletedAt: null,
      },
    });

    return {
      data: formattedUsers,
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
        role: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    })).map(user => ({
      ...user,
      clubStatus: user.clubStatus ?? undefined,
      email: user.email ?? undefined,
      phone_number: user.phone_number ?? undefined,
      telegramUserName: user.telegramUserName ?? undefined,
      bio: user.bio ?? undefined,
      berthDate: user.berthDate ?? undefined,
      profileImageUrl: user.profileImageUrl ?? undefined,
      specialty: user.specialty ?? undefined,
      cvUrl: user.cvUrl ?? undefined,
      lastSeen: user.lastSeen ?? undefined,
    }));

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
