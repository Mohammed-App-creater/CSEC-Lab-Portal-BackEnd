import { DivisionCount } from '../dto/division-count.dto';
import { DivisionRepository } from '../interfaces/division.repository';

export const countDivisionUseCase = async (): Promise<DivisionCount> => {
    const count = await DivisionRepository.divisionCount();
    return {
        count
    };
}