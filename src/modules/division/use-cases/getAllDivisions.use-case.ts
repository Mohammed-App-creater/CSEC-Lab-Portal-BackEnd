import { DivisionDto } from '../dto/division-group.dto';
import { DivisionRepository } from '../interfaces/division.repository';


export const getAllDivisionId = async (): Promise<DivisionDto[]> =>{
    return DivisionRepository.findAll();
}