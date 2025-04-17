// controllers/authController.ts
import { Gender, PrismaClient } from '@prisma/client';
import { RegisterUserDTO } from '../dto/auth-user.dto';
import { hashPassword } from '@shared/utils/hashPassword';
import jwt from 'jsonwebtoken'; // optional
import dotenv from 'dotenv';
import { ne } from '@faker-js/faker/.';


dotenv.config();

const prisma = new PrismaClient();


export const registerUserUseCase = async ({ email, password }: RegisterUserDTO) => {

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { message: 'Email already registered' }
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      gender: 'Male' as Gender,
      lastSeen: new Date(),
      DivisionId: '98a0c0d1-92ba-4d07-bb61-fc8264c2341a',
    },
  });
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  return {
    token,
    user: {
      id: user.id,
      name: [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' '),
      role: user.role,
    },
    message: 'User registered',
  }

}
