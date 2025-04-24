import { validateRefreshToken, generateAccessToken, generateRefreshToken, revokeRefreshToken } from '../services/tokenService';

export const refreshAccessToken = async (token: string) => {
  const tokenRecord = await validateRefreshToken(token)
  if (!tokenRecord) throw new Error('Invalid or expired refresh token')

  // optional: rotate token (create new, revoke old)
  await revokeRefreshToken(token)
  const newRefreshToken = await generateRefreshToken(tokenRecord.userId, tokenRecord.rememberMe) 

  const accessToken = generateAccessToken(tokenRecord.userId)

  return { accessToken, refreshToken: newRefreshToken, rememberMe: tokenRecord.rememberMe }
}
