import { SessionRepository } from '../interfaces/count-upcoming-session.repository';
import { CountUpcomingSessionDTO } from '../dto/count-upcoming-session.dto';

export const CountUpcomingSessionUseCase = {
    countUpcomingSession: async (): Promise<CountUpcomingSessionDTO> => {
        return await SessionRepository.countUpcomingSession(); 
    }
};
