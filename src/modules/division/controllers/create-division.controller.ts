import { Request, Response, NextFunction } from 'express';
import { createDivision } from '../use-cases/create-division.usecase';



export const createDivisionController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const { name, currentHeadID } = req.body;
    const result = await createDivision(name, currentHeadID);
    res.status(201).json(result);
  } catch (err) {
    next(err); 






    
  }
};

