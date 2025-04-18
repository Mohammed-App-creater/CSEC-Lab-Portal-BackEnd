export type CountUpcomingSessionDTO = {
  count: number;
};

export type  upcomingSessions = {
    upcomingSessions: {
        id: string;
        title: string;
        date: Date;
        time: string;
        location: string;
    }[];
}