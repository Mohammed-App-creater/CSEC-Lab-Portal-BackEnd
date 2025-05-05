import { r } from '@faker-js/faker/dist/airline-BUL6NtOJ'
import { CreateHeadsUpUseCase } from '../use-cases/create-headsup.use-case'
import { Request, Response, NextFunction } from 'express'



export const createHeadsUpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, type, body } = req.body
        const headsUp = await CreateHeadsUpUseCase(userId, type, body)
        res.status(201).json(headsUp)
        return;
    } catch (error) {
        next(error)
    }
}