import { DivisionRepository } from '../interfaces/division.repository';
import { DivisionGroupMemberDto } from '../dto/division-group.dto';
import { getAllGroupByDivisionIdUseCase } from '@modules/group/use-cases/all-groups-by-division.use-case';
import { GroupMemberUseCase } from '@/modules/group/use-cases/all-group-member.use-case';
import { AllGroupMemberDTO } from '@/modules/group/dto/group.dto';

export const getDivisionGroupMembersUseCase = async (divisionId: string): Promise<DivisionGroupMemberDto> => {
    try {
        const division = await DivisionRepository.findById(divisionId);
        const groups = await getAllGroupByDivisionIdUseCase(divisionId);

        const groupsAndMembers = await Promise.all(
            groups.map(async (group) => {
                const data = await GroupMemberUseCase.allGroupMembers(group.id, 1, 5);
                return { ...data }
            })
        );

        return {
            id: divisionId,
            name: division?.name ?? '',
            groupsAndMembers,
        };
    } catch (error) {
        throw new Error('Error fetching division group members: ' + (error as Error).message);
    }
};
