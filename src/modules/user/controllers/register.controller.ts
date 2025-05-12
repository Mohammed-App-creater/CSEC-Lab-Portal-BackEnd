import { registerUserUseCase } from '../use-cases/register-user.usecase';
import { Request, Response, NextFunction } from 'express';


export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {  email, password, divisionId, groupId } = req.body;
        const result = await registerUserUseCase({ DivisionId: divisionId, groupId, email, password });

        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
};







