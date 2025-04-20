import { AllAttendanceUseCase } from "../use-cases/all-attendance.use-case";
import { Request, Response } from "express";

export const AllAttendanceController = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
             res.status(400).json({
                message: "User ID is required",
            });
        }
        const attendance = await AllAttendanceUseCase.allAttendance(userId);
        res.status(200).json({
            data: attendance,
        });
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};