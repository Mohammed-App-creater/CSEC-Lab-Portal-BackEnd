import { DivisionRepository } from '../interfaces/division.repository';
import { DivisionDto } from '../dto/division-group.dto';
import { BaseError } from '@/shared/errors/BaseError';


export const getAllDivisionUseCase = async (): Promise<DivisionDto[]> => {
    try { 
        const divisions = await DivisionRepository.findAll();
        if (!divisions || divisions.length === 0) {
            throw new BaseError('No divisions found', 404);
        }
        return divisions.map(division => ({
            name: division.name,
            id: division.id,
            description: division.description,
            imageUrl: division.imageUrl,
            establishedAt: division.establishedAt,
            createdAt: division.createdAt,
            updatedAt: division.updatedAt,
            currentHeadID: division.currentHeadID,
        }));
    } catch (error) {
        throw new BaseError('Error fetching all divisions: ' + (error as Error).message, 500);
    }
}