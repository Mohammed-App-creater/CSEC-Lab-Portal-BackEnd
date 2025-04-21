import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { BaseError } from '../errors/BaseError';


export const validateUUID = (id: string): boolean => {
    if (!uuidValidate(id)) {
        throw new BaseError('Invalid UUID format', 400);
    }
    return true;
};