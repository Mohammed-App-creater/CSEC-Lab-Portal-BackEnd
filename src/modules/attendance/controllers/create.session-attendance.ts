import { createGroupSessionAttendanceUseCase } from "../use-cases/create-session-attandance.use-case";
import { Request, Response, NextFunction } from "express";

export const createGroupSessionAttendanceController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sessionId } = req.params;
        const { groupId } = req.body;

        const attendances = await createGroupSessionAttendanceUseCase(sessionId, groupId);

        res.status(201).json(attendances);
    } catch (error) {
        next(error);
    }
};

