import { CreateResourceLink, DeleteResourceLink, GetResourceLinkById, GetResourceLinks, UpdateResourceLink } from '../use-cases/CRUD-resource-link';
import { Request, Response, NextFunction } from 'express';



export const getResourceLinkById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const resourceLink = await GetResourceLinkById(id);
        res.status(200).json(resourceLink);
        return;
    } catch (error) {
        next(error);
    }
}

export const getResourceLinks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const resourceLinks = await GetResourceLinks(userId);
        res.status(200).json(resourceLinks);
        return;
    } catch (error) {
        next(error);
    }
}

export const createResourceLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const resourceLink = await CreateResourceLink({ userId, ...req.body });
        res.status(201).json(resourceLink);
        return;
    } catch (error) {
        next(error);
    }
}

export const updateResourceLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const resourceLink = await UpdateResourceLink(id, req.body);
        res.status(200).json(resourceLink);
        return;
    } catch (error) {
        next(error);
    }
}

export const deleteResourceLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await DeleteResourceLink(id);
        res.status(204).send();
        return;
    } catch (error) {
        next(error);
    }
}

