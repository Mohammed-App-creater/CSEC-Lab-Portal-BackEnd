import { Request, Response } from 'express';
import { DivisionGroupsUseCase } from '../use-cases/division-groups.use-case';

export const DivisionGroupsController = async (req: Request, res: Response) => {
    const { divisionId } = req.body;
    if (!divisionId) {
        res.status(400).json({ message: 'Division ID is required' });
        return;
    }
    const result = await DivisionGroupsUseCase(divisionId);
    if (typeof result === 'string') {
        res.status(404).json({ message: result });
    }
    res.status(200).json(result);
};