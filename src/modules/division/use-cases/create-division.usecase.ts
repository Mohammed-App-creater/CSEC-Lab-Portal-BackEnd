import { DivisionRepository } from '../interfaces/division.repository';
import { CreateDivisionDTO } from '../dto/create-division.dto';

export const createDivision = async (data: CreateDivisionDTO) => {
  
  // return DivisionRepository.create(data);
  return "test data";
};
