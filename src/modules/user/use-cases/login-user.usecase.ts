import { LoginUserDTO } from '../dto/auth-user.dto';
import { findByEmail } from '../interfaces/user.repository';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { UserDTO } from '../dto/user.dto';
import { BaseError } from '@/shared/errors/BaseError';
import { generateRefreshToken, generateAccessToken } from '../services/tokenService';

dotenv.config();

export const loginUserUseCase = async ({
  rememberMe = false,
  email,
  password,
}: LoginUserDTO): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> => {
  const user = await findByEmail.findByEmail(email);
  if (!user || !user.password) {
    throw new BaseError('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new BaseError('Invalid credentials');
  }


  // access token lifetime based on "rememberMe"

  const accessToken = generateAccessToken(user.id);

  // const accessToken = jwt.sign(
  //   { userId: user.id, roleId: role.id },
  //   process.env.JWT_SECRET!,
  //   { expiresIn: rememberMe ? '1d' : '1h' }
  // );

  const refreshToken = await generateRefreshToken(user.id, rememberMe); // stored in DB

  // remove sensitive fields
  const { password: _p, isDeleted, deletedAt, createdAt, updatedAt, ...safeUser } = user;

  return {
    accessToken,
    refreshToken,
    user: safeUser as UserDTO,
  };
};
