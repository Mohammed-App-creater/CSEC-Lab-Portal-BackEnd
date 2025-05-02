import { DivisionIdDto } from '../dto/division-group.dto';
import { DivisionRepository } from '../interfaces/division.repository';


export const getAllDivisionId = async (): Promise<DivisionIdDto[]> =>{
    return DivisionRepository.findAllDivisionId();
}