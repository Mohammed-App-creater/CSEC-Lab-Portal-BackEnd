import { RegisterUserDTO } from '../dto/auth-user.dto';
import { hashPassword } from '@shared/utils/hashPassword';
import jwt from 'jsonwebtoken'; // optional
import dotenv from 'dotenv';
import { sendRegistrationEmail } from '@shared/exceptions/emailService';
import { CreateUser, existingUser, connectUserToGroup } from '../interfaces/user.repository';
import { prisma } from '@/shared/utils/prisma';
import { getRoleByIdUseCase } from '@/modules/role/use-cases/get-role-by-id.use-case';
import { BaseError } from '@/shared/errors/BaseError';
import { validate as isUUID } from 'uuid';





dotenv.config();




export const registerUserUseCase = async ({
  email,
  password,
  DivisionId,
  groupId,
  gender = "Male"
}: RegisterUserDTO) => {

  if (!email || !password || !DivisionId || !groupId) {
    throw new BaseError('Missing required fields');
  }

  if (!isUUID(DivisionId)) {
    throw new BaseError(`Invalid UUID: ${DivisionId}`);
  }

  if (!isUUID(groupId)) {
    throw new BaseError(`Invalid UUID: ${groupId}`);
  }

  const groupName = await prisma.groups.findUnique({
    where: { id: groupId },
    select: { name: true },
  });

  if (!groupName) {
    throw new BaseError('Group not found', 404);
  }

  const divisionName = await prisma.divisions.findUnique({
    where: { id: DivisionId },
    select: { name: true },
  });

  if (!divisionName) {
    throw new BaseError('Division not found', 404);
  }

  const ExistingUser = await existingUser.existingUser(email);
  const ExistingUserInGroup = await existingUser.existingUserInGroup(groupId, email);

  if (ExistingUser && ExistingUserInGroup) {
    throw new BaseError("message: User already registered in this group", 409);
  }

  if (ExistingUser && !ExistingUserInGroup) {
    console.log('Existing user found:', ExistingUser.id, 'Group ID:', groupId);
    await connectUserToGroup.connectUserToGroup( ExistingUser.id, groupId);
    return {
      message: 'User successfully Connected to group',
    };
  }

  const HashedPassword = await hashPassword(password);

  const user = await CreateUser.createUser({
    email,
    password: HashedPassword,
    DivisionId,
    groupId,
    gender
  });

  const role = await getRoleByIdUseCase(user.roleId);

  const token = jwt.sign(
    { userId: user.id, role: role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  // Send registration email


  await sendRegistrationEmail({
    to: email,
    division: divisionName?.name ?? '',
    group: groupName?.name ?? '',
    password,
  });

  return {
    token,
    user: {
      id: user.id,
      name: [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' '),
      role: role.name,
    },
    message: 'User registered',
  };
};



