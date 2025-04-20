import { Request, Response } from 'express';
import { createDivision } from '../use-cases/create-division.usecase';



export const createDivisionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, currentHeadID } = req.body;
    

    const result = await createDivision(name, currentHeadID);

    if (!result) {
      res.status(400).json({ message: 'Division could not be created' });
      return;
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
};

