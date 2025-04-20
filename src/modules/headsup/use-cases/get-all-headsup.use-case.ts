import { HeadsUpDto } from '../dto/headsup.dto';
import { HeadsUpRepository } from '../interfaces/headsup.repository';


export const getAllHeadsUps = async (userId: string): Promise<HeadsUpDto[]> => {
  const headsUps = await HeadsUpRepository.getHeadsUps(userId);
  return headsUps
};


