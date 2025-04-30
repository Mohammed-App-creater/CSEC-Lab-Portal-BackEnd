import { CreateResourceLink, DeleteResourceLink, GetAllResourceLinkByUserId, GetResourceLinkById, GetResourceLinks, UpdateResourceLink } from '../use-cases/CRUD-Division-Resource.use-case';
import { Request, Response, NextFunction } from 'express';
import { BaseError } from '@/shared/errors/BaseError';


export class CRUDDivisionResourceController {
    async createDivisionResourceLink(req: Request, res: Response, next: NextFunction) {
        try {
            const DivisionResourceLink = req.body;
            const ResourceLinkCreated = await CreateResourceLink(DivisionResourceLink);
            res.status(201).json({
                status: 'success',
                message: 'Division Resource Link created successfully',
                data: ResourceLinkCreated
            });
            return;
        } catch (error) {
            next(error);
        }
    }

    async getDivisionResourceLinks(req: Request, res: Response, next: NextFunction) {
        try {
            const { divisionId } = req.params;
            const ResourceLinks = await GetResourceLinks(divisionId);
            res.status(200).json({
                status: 'success',
                message: 'Division Resource Links retrieved successfully',
                data: ResourceLinks
            });
            return;
        } catch (error) {
            next(error);
        }
    }

    async getDivisionResourceLinkById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const ResourceLink = await GetResourceLinkById(id);
            if (!ResourceLink) {
                throw new BaseError('Resource Link not found', 404);
            }
            res.status(200).json({
                status: 'success',
                message: 'Division Resource Link retrieved successfully',
                data: ResourceLink
            });
            return;
        } catch (error) {
            next(error);
        }
    }

    async getAllResourceLinkByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const { divisionId } = req.params;
            const ResourceLink = await GetAllResourceLinkByUserId(divisionId);
            res.status(200).json({
                status: 'success',
                message: 'Division Resource Links retrieved successfully',
                data: ResourceLink
            });
            return;
        } catch (error) {
            next(error);
        }
    }

    async updateDivisionResourceLink(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const resourceLink = req.body;
            const ResourceLinkUpdated = await UpdateResourceLink(id, resourceLink);
            res.status(200).json({
                status: 'success',
                message: 'Division Resource Link updated successfully',
                data: ResourceLinkUpdated
            });
            return;
        } catch (error) {
            next(error);
        }
    }

    async deleteDivisionResourceLink(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const ResourceLinkDeleted = await DeleteResourceLink(id);
            res.status(200).json({
                status: 'success',
                message: 'Division Resource Link deleted successfully',
                data: ResourceLinkDeleted
            });
            return;
        } catch (error) {
            next(error);
        }
    }

}
