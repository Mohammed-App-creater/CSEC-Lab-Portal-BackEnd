import { CountUpcomingSessionUseCase } from "../use-cases/count-upcoming-session.use-case";
import { Request, Response } from "express";

export const CountUpcomingSessionController = {
    countUpcomingSession: async (req: Request, res: Response) => {
        try {
            const upcomingSessions = await CountUpcomingSessionUseCase.countUpcomingSession();
            res.status(200).json(upcomingSessions);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },
};
