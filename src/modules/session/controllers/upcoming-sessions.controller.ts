import { sessionUseCase } from "../use-cases/upcoming-session.use-case";
import { Request, Response, NextFunction } from "express";

export const getUpcomingSessionsController = async (req: Request, res: Response, next: NextFunction)=> {
    if (req.method !== "GET") {
         res.status(405).json({ message: "Method Not Allowed" });
        return;
    }

    try {
        const { page = 1, limit = 10 } = req.query;

        const sessions = await sessionUseCase.getUpcomingSessions(
            Number(page),
            Number(limit)
        );

         res.status(200).json({
            success: true,
            data: sessions,
        });
        return;

    } catch (error) {
        next(error);
    }
}
