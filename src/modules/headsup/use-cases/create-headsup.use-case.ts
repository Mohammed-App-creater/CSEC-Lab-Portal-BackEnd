import { HeadsUpRepository } from '../interfaces/headsup.repository'
import { HeadsUpDto } from '../dto/headsup.dto'
import { HeadsUpType } from '@prisma/client'
import { BaseError } from '@/shared/errors/BaseError'
import { getUserById } from '@/modules/user/use-cases/get-user-by-id'


export const CreateHeadsUpUseCase = async (userId: string, type: HeadsUpType, body: string): Promise<HeadsUpDto> => {
    const user = await getUserById(userId)
    if (!user) {
        throw new BaseError('User not found')
        }
    
    if (!type) {
      throw new BaseError('HeadsUp type is required')
    }
    if (!body) {
      throw new BaseError('HeadsUp body is required')
    }
    if (body.length > 500) {
      throw new BaseError('HeadsUp body is too long')
    }
    if (body.length < 10) {
      throw new BaseError('HeadsUp body is too short')
    }
    if (type.length > 50) {
      throw new BaseError('HeadsUp type is too long')
    }
    if (type.length < 3) {
      throw new BaseError('HeadsUp type is too short')
    }
    if (body.includes('badword')) {
      throw new BaseError('HeadsUp body contains bad words')
    }
    // Check if the type is valid HeadsUpType
    const validTypes = Object.values(HeadsUpType)
    if (!validTypes.includes(type)) {
      throw new Error('Invalid HeadsUp type')
    }
    const headsUp = await HeadsUpRepository.createHeadsUp(userId, type, body)
    return headsUp
  }
