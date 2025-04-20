import { getDivisionGroupMembersUseCase } from '../use-cases/division-group-members.use-case'
import { Request, Response } from 'express'

export const getDivisionGroupMembersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { divisionId } = req.body
        const data = await getDivisionGroupMembersUseCase(divisionId)
        res.status(200).json({
            status: 'success',
            message: 'Get division group members successfully',
            data,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching division group members',
            error: (error as Error).message,
        });
        return;
    }
}