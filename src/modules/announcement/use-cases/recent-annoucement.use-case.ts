import { AnnouncementDTO } from '../dto/annoucement.dto';
import { AnnouncementRepository } from '../interfaces/attendance.repositery';


export const getRecentAnnouncements = async (limit: number): Promise<AnnouncementDTO[]> => {
    const announcements = await AnnouncementRepository.getRecentAnnouncements(limit);
    return announcements.map((announcement): AnnouncementDTO => ({
        id: announcement.id,
        title: announcement.title,
        content: announcement.description || '', // Map 'description' to 'content'
        createdAt: announcement.createdAt,
        updatedAt: announcement.updatedAt,
        authorId: announcement.sourceId || '', // Map 'sourceId' to 'authorId'
    }));
}