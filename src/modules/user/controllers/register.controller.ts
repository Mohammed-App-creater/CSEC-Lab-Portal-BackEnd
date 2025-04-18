import { registerUserUseCase } from '../use-cases/register-user.usecase';
import { Request, Response } from 'express';


export const registerController = async (req: Request, res: Response) => {
    try {
        const {  email, password, DivisionId, groupId } = req.body;

        const result = await registerUserUseCase({  DivisionId, groupId, email, password });

        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ message: err instanceof Error ? err.message : 'An unknown error occurred' });
    }
};







