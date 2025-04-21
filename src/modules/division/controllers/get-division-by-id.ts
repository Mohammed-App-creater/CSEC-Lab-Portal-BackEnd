import { getDivisionByIdUseCase } from "../use-cases/get-division-by-id.use-case";
import { Request, Response, NextFunction } from "express";
import { BaseError } from "@/shared/errors/BaseError";
import { DivisionDto } from "../dto/division-group.dto";


export const getDivisionByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const division: DivisionDto | null = await getDivisionByIdUseCase(id);
        if (!division) {
            throw new BaseError("Division not found", 404);
        }
        res.status(200).json(division);
    } catch (error) {
        next(error);
    }
};