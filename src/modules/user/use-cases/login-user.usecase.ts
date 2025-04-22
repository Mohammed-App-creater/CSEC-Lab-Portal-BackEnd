import { LoginUserDTO } from '../dto/auth-user.dto';
import { findByEmail } from '../interfaces/user.repository';
import { getRoleByIdUseCase } from '@/modules/role/use-cases/get-role-by-id.use-case';
import bcrypt from 'bcryptjs'; // or argon2
import jwt from 'jsonwebtoken'; // optional
import dotenv from 'dotenv';
import { UserDTO } from '../dto/user.dto';
import { BaseError } from '@/shared/errors/BaseError';
dotenv.config();

export const loginUserUseCase = async ({ rememberMe, email, password }: LoginUserDTO): Promise<{ token: string, user: UserDTO }> => {
  const user = await findByEmail.findByEmail(email);
  if (!user) throw new BaseError('Invalid credentials');

  if (!user.password) throw new BaseError('Invalid credentials');
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new BaseError('Invalid credentials');

  const role = await getRoleByIdUseCase(user.roleId);



  const token = jwt.sign({ userId: user.id, roleId: role.id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  const { password: _p, isDeleted, deletedAt, createdAt, updatedAt, ...safeUser } = user;

  if (!rememberMe) {
    const token = jwt.sign({ userId: user.id, roleId: role.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    return {
      token: '',
      user: user as UserDTO,
    };
  }

  return {
    token,
    user: safeUser as UserDTO,
  };
};
