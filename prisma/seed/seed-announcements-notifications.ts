import {  AnnouncementVisibility, AnnouncementType, NotificationType } from '@prisma/client';
import { prisma } from '@/shared/utils/prisma'; 
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';



async function seedAnnouncementsAndNotifications(announcementCount: number) {
  const SuperAdmin = await prisma.role.findFirst({
    where: { name: 'SuperAdmin' },
  });
  const users = await prisma.user.findMany({
    where: {
      roleId: { not: SuperAdmin?.id }
    },
    include: {
      groups: true, // ✅ Needed for safe group checks
    }
  });

  const groups = await prisma.groups.findMany();
  const divisions = await prisma.divisions.findMany();
  const events = await prisma.events.findMany();
  const sessions = await prisma.sessions.findMany();

  const announcementsData = [];

  for (let i = 0; i < announcementCount; i++) {
    const visibilityType = faker.helpers.arrayElement(Object.values(AnnouncementVisibility));
    const announcementType = faker.helpers.arrayElement(Object.values(AnnouncementType));

    let sourceId: string | null = null;
    if (announcementType === 'EVENT' && events.length > 0) {
      sourceId = faker.helpers.arrayElement(events).id;
    } else if (announcementType === 'SESSION' && sessions.length > 0) {
      sourceId = faker.helpers.arrayElement(sessions).id;
    }

    const targetUsers = getTargetUsers(users, groups, divisions, visibilityType);

    const announcement = await prisma.announcement.create({
      data: {
        id: uuidv4(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        visibility: visibilityType,
        announcementType,
        sourceId,
        Tags: [],
        user: {
          connect: targetUsers,
        },
      },
    });

    announcementsData.push(announcement);

    for (const user of targetUsers) {
      await prisma.notification.create({
        data: {
          id: uuidv4(),
          title: `New Announcement: ${announcement.title}`,
          description: announcement.description,
          type: NotificationType.Announcement,
          isRead: false,
          user: {
            connect: { id: user.id },
          },
        },
      });
    }

    console.log(`📣 Created announcement: "${announcement.title}" with ${targetUsers.length} notifications`);
  }

  console.log('✅ All announcements and notifications seeded');
}

function getTargetUsers(users: any[], groups: any[], divisions: any[], visibility: AnnouncementVisibility) {
  if (visibility === 'PUBLIC') {
    return users.map((u) => ({ id: u.id }));
  }

  if (visibility === 'Division_ONLY' && divisions.length > 0) {
    const targetDivision = faker.helpers.arrayElement(divisions).id;
    const divisionUsers = users.filter((u) => u.divisionId === targetDivision);
    return divisionUsers.map((u) => ({ id: u.id }));
  }

  if (visibility === 'GROUP_ONLY' && groups.length > 0) {
    const targetGroup = faker.helpers.arrayElement(groups).id;
    const groupUsers = users.filter((u) =>
      Array.isArray(u.groups) && u.groups.some((g: any) => g.id === targetGroup)
    );
    return groupUsers.map((u) => ({ id: u.id }));
  }

  return [];
}

async function main() {
  const count = 10; // Number of announcements to create
  await seedAnnouncementsAndNotifications(count);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default seedAnnouncementsAndNotifications;
