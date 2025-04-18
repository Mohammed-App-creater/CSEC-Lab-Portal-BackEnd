import { Request, Response } from 'express';
import { createDivision } from '../use-cases/create-division.usecase';

export const createDivisionController = async (req: Request, res: Response) => {
  const result = await createDivision(req.body);
  res.status(201).json(result);
};
