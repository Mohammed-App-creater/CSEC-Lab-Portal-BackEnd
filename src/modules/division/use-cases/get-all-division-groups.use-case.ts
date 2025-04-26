import { getAllDivisionUseCase } from './get-all-division.use-case';
import { DivisionGroupsUseCase } from './division-groups.use-case'
import { BaseError } from '@/shared/errors/BaseError';
import { DivisionGroupsDto,DivisionGroupDto } from '../dto/division-group.dto'
import { countUserWhereUseCase } from '@modules/user/use-cases/conut-user.usecase'

// Assuming this is your Group type
interface Groupt {
    id: string;
    name: string;
    // any other properties...
}


export const getAllDivisionGroupsUseCase = async () => {
    try {
        const divisions = await getAllDivisionUseCase();
        if (!divisions) {
            throw new BaseError('Division not found', 404);
        }
        if (divisions.length === 0) {
            return [];
        }

        const divisionGroups = await Promise.all(divisions.map(async (division) => {
            const result = await DivisionGroupsUseCase(division.id);
            if (typeof result === 'string') {
                throw new BaseError(`Unexpected response: ${result}`, 500);
            }
            const groups: DivisionGroupDto = result;

            const groupsWithMemberCount = await Promise.all(
                groups.groups.map(async (group: Groupt) => {
                    const { count } = await countUserWhereUseCase({  groups: { some: { id: group.id }}});
                    return {
                        ...group,
                        memberCount: count
                    };
                })
            );

            return {
                ...division,
                groups: groupsWithMemberCount
            };
        }));

        return divisionGroups;

    } catch (error) {
        console.error(error);
        throw new BaseError('Internal server error', 500);
    }
};
