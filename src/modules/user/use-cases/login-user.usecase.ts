import { LoginUserDTO } from '../dto/auth-user.dto';
import { findByEmail } from '../interfaces/user.repository';
import bcrypt from 'bcryptjs'; // or argon2
import jwt from 'jsonwebtoken'; // optional
import dotenv from 'dotenv';
dotenv.config();

export const loginUserUseCase = async ({ email, password }: LoginUserDTO) => {
  const user = await findByEmail.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  if (!user.password) throw new Error('Invalid credentials');
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error('Invalid credentials');

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
  };
};
