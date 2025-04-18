import {
  PrismaClient,
  NotificationType,
  AnnouncementVisibility,
  AnnouncementType,
  Tag
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seedAnnouncementsAndNotifications() {
  // Delete previous records
  await prisma.notification.deleteMany({});
  await prisma.announcement.deleteMany({});
  console.log('🧼 Old notifications and announcements deleted');

  const users = await prisma.user.findMany({ where: { role: { not: 'SuperAdmin' } } });
  const sessions = await prisma.sessions.findMany();
  const events = await prisma.events.findMany();

  const abel = users.find(u => u.firstName === 'Abel');
  const selam = users.find(u => u.firstName === 'Selam');
  const hanna = users.find(u => u.firstName === 'Hanna');

  const cpdSession = sessions.find(s => s.title.includes('CPD'));
  const devEvent = events.find(e => e.title.includes('Showcase'));

  if (!abel || !selam || !cpdSession || !devEvent) {
    console.error('❌ Required users, sessions or events not found');
    process.exit(1);
  }

  // 🟢 Announcements
  const announcement1 = await prisma.announcement.create({
    data: {
      id: uuidv4(),
      title: 'CPD Session Reminder',
      description: 'Don’t forget the CPD session this Friday at 10:00 AM.',
      visibility: AnnouncementVisibility.PUBLIC,
      Tags: [Tag.CPD],
      announcementType: AnnouncementType.SESSION,
      sourceId: cpdSession.id,
    },
  });

  const announcement2 = await prisma.announcement.create({
    data: {
      id: uuidv4(),
      title: 'DEV Showcase Feedback',
      description: 'Submit your feedback for the DEV Product Showcase.',
      visibility: AnnouncementVisibility.GROUP_ONLY,
      Tags: [Tag.DEV],
      announcementType: AnnouncementType.EVENT,
      sourceId: devEvent.id,
    },
  });

  // Link announcements to users
  await prisma.announcement.update({
    where: { id: announcement1.id },
    data: {
      user: {
        connect: [{ id: abel.id }, ...(hanna ? [{ id: hanna.id }] : [])],
      },
    },
  });

  await prisma.announcement.update({
    where: { id: announcement2.id },
    data: {
      user: {
        connect: [{ id: selam.id }, ...(hanna ? [{ id: hanna.id }] : [])],
      },
    },
  });

  // 🟢 Notifications
  const notification1 = await prisma.notification.create({
    data: {
      id: uuidv4(),
      title: 'New Task Assigned',
      description: 'You’ve been assigned a new task by Abel.',
      type: NotificationType.Task,
      isRead: false,
    },
  });

  const notification2 = await prisma.notification.create({
    data: {
      id: uuidv4(),
      title: 'Event Reminder',
      description: 'DEV Product Showcase starts at 2 PM today.',
      type: NotificationType.Reminder,
      isRead: false,
    },
  });

  await prisma.notification.update({
    where: { id: notification1.id },
    data: {
      user: {
        connect: hanna ? [{ id: hanna.id }] : [],
      },
    },
  });

  await prisma.notification.update({
    where: { id: notification2.id },
    data: {
      user: {
        connect: [{ id: selam.id }],
      },
    },
  });

  console.log('✅ Notifications and Announcements seeded');
}

async function SeedAnnouncementsAndNotifications() {
  seedAnnouncementsAndNotifications()
    .catch((e) => {
      console.error('❌ Seeding failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      prisma.$disconnect();
    });
}

export default SeedAnnouncementsAndNotifications;