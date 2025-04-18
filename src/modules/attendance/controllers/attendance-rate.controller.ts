import { E } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { AttendanceRateUseCase } from "../use-cases/attendance-rate.use-case";
import { Request, Response } from "express";

export const AttendanceRateController = async (req: Request, res: Response) => {
    try {
        const attendanceRate = await AttendanceRateUseCase.attendanceRate();
        res.status(200).json({
            data: attendanceRate,
        });
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};