import { countDivisionUseCase } from "../use-cases/count-division.use-case";
import { Request, Response } from "express";
import { DivisionCount } from "../dto/division-count.dto";
import { r } from "@faker-js/faker/dist/airline-BUL6NtOJ";

export const countDivisionController = async (req: Request, res: Response) => {
    try {
        const count: DivisionCount = await countDivisionUseCase();
        res.status(200).json(count);
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};