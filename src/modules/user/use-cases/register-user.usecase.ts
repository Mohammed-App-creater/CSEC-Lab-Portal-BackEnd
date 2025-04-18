import { RegisterUserDTO } from '../dto/auth-user.dto';
import { hashPassword } from '@shared/utils/hashPassword';
import jwt from 'jsonwebtoken'; // optional
import dotenv from 'dotenv';
import { sendRegistrationEmail } from '@shared/exceptions/emailService';
import { CreateUser, existingUser } from '../interfaces/user.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


dotenv.config();




export const registerUserUseCase = async ({
  email,
  password,
  DivisionId,
  groupId,
  gender
}: RegisterUserDTO) => {

  const ExistingUser = await existingUser.existingUser(email);
  if (ExistingUser) {
    return { message: 'Email already registered' };
  }

  const HashedPassword = await hashPassword(password);

  const user = await CreateUser.createUser({
    email,
    password: HashedPassword,
    DivisionId,
    groupId,
    gender
  });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  // Send registration email
  const groupName = await prisma.groups.findUnique({
    where: { id: groupId },
    select: { name: true },
  });
  await sendRegistrationEmail({
    to: email,
    division: user.DivisionId ?? '',
    group: groupName?.name ?? '',
    password,
  });

  return {
    token,
    user: {
      id: user.id,
      name: [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' '),
      role: user.role,
    },
    message: 'User registered',
  };
};

