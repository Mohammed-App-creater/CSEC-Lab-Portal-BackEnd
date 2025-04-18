import { GroupMemberUseCase } from '../use-cases/all-group-member.use-case'
import { Request, Response } from 'express'


export const GroupMemberController = {
    allGroupMembers: async (req: Request, res: Response) => {
        try {
            const { groupId, page, limit } = req.params;
            const members = await GroupMemberUseCase.allGroupMembers(groupId, Number(page), Number(limit));
            res.status(200).json(members)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
}
