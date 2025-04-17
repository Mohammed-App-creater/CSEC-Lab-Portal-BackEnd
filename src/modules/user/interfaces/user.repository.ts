import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@shared/utils/hashPassword'; 
const prisma = new PrismaClient();


export const findByEmail = {
  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  }
};

export const CreateUser = {
  createUser: async (userData: any) => {
    const { email, password, gender} = userData;
    const hashedPassword = await hashPassword(password);
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        gender,
        lastSeen: new Date(), 
      },
    });
  } 
};

export const UpdateUser = {
  updateUser: async (userId: string, userData: any) => {
    return prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }
};
