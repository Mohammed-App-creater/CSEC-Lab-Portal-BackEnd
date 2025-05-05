import {GroupRepository} from '../interfaces/group.repository'
import {BaseError} from '@/shared/errors/BaseError'
import {GroupDto} from '../dto/group.dto'
import { validateUUID } from '@/shared/utils/validateUUID'


export const getGroupByIdUseCase = async (groupId: string): Promise<GroupDto> => {
    if (!groupId) {
        throw new BaseError('Group ID is required.')
    }

    validateUUID(groupId)

    const group = await GroupRepository.findById(groupId)

    if (!group) {
        throw new BaseError('Group not found.')
    }

    return group
}