import { getSessionByAndGroupIdUseCase } from '../use-cases/get-session-by-sessionId-groupId.use-case'
import { Request, Response, NextFunction } from 'express'



export const getSessionByAndGroupIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sessionId, groupId } = req.params

        const session = await getSessionByAndGroupIdUseCase(sessionId, groupId)

         res.status(200).json(session)
         return;
    } catch (error) {
        next(error)
    }
}