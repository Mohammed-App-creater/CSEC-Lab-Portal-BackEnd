import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '@shared/utils/prisma'
import dotenv from 'dotenv'

dotenv.config()

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET!, { expiresIn: '15m' })
}

export const generateRefreshToken = async (userId: string, rememberMe: boolean) => {
    const token = uuidv4()
    const expiresAt = rememberMe ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 1) // 1 day or 7 days

    await prisma.refreshToken.create({
        data: {
            token,
            rememberMe,
            userId,
            expiresAt,
        },
    })

    return token
}

export const validateRefreshToken = async (token: string) => {
    const record = await prisma.refreshToken.findUnique({ where: { token } })
    if (!record || record.revoked || record.expiresAt < new Date()) return null
    return record
}

export const revokeRefreshToken = async (token: string) => {
    await prisma.refreshToken.update({
        where: { token },
        data: { revoked: true },
    })
}
