import { DivisionRepository } from '../interfaces/division.repository';
import { DivisionGroupDto } from '../dto/division-group.dto';
import { getAllGroupByDivisionIdUseCase } from '@modules/group/use-cases/all-groups-by-division.use-case'

export const DivisionGroupsUseCase = async (id: string): Promise<DivisionGroupDto | string> => {
    const division = await DivisionRepository.findById(id);
    if (!division) {
        return 'Division not found';
    }
    const groups = await getAllGroupByDivisionIdUseCase(id);
    return {
        id: division.id,
        name: division.name,
        groups: groups,
    }
}
