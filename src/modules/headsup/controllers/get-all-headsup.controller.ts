import { getAllHeadsUps } from '../use-cases/get-all-headsup.use-case'
import { Request, Response } from 'express'


export const getAllHeadsUpController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.body.id;
        const headsUps = await getAllHeadsUps(userId);
        res.status(200).json({ headsUps });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}