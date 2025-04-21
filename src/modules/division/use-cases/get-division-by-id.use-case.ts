import { DivisionRepository } from '../interfaces/division.repository';
import { validateUUID } from '@/shared/utils/validateUUID';
import { DivisionDto } from '../dto/division-group.dto';


export const getDivisionByIdUseCase = async (id: string): Promise<DivisionDto | null> => {
    // Validate the ID format (UUID)
    validateUUID(id); // This will throw an error if the ID is not valid
    const division = await DivisionRepository.findById(id);
    if (!division) {
        return null;
    }
    return division;
}