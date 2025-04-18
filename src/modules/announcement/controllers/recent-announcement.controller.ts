import { getRecentAnnouncements } from '../use-cases/recent-annoucement.use-case';
import { Request, Response } from 'express';


export const getRecentAnnouncement = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 5;
        const announcements = await getRecentAnnouncements(limit);
        res.status(200).json(announcements);
    } catch (error) {
        console.error('Error fetching recent announcements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};