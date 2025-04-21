import { getSessionsWithGroups } from '../use-cases/get-session-by-groupId.use-case';
import { BaseError } from '@/shared/errors/BaseError';
import { Request, Response, NextFunction } from 'express';



export const getSessionsByGroupIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = req.params.groupId;
    if (!groupId) {
      throw new BaseError("Group ID is required", 400);
    }
    const sessions = await getSessionsWithGroups(groupId);
    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
}