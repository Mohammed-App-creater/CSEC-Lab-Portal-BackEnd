import { createGroupUseCase } from '../use-cases/create-group.use-case'
import { Request, Response } from 'express'


export const createGroupController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name, divisionId} = req.body
        const group = await createGroupUseCase(name, divisionId)
        res.status(201).json(group)
        return;
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        return;
    }
}