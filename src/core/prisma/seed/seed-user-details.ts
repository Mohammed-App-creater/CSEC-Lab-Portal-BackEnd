import { PrismaClient, RoleType, Theme, ClubStatus, UniversityStatus, Gender } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();


async function seedUserDetails() {
  const users = await prisma.user.findMany({
    where: { role: { not: 'SuperAdmin' } },
  });

  if (users.length === 0) {
    console.error('❌ No users found. Run seed-users.ts first.');
    process.exit(1);
  }

  // Clear existing UserSettings, UniversityInfo, socialLinks
  await prisma.userSetting.deleteMany({});
  await prisma.universityInfo.deleteMany({});
  await prisma.socialLink.deleteMany({});

  console.log('✅ Cleared old user details');

  for (const user of users) {
    await prisma.userSetting.create({
      data: {
        id: uuidv4(),
        userId: user.id,
        theme: Theme.System,
        phonePublic: true,
        authUpdateCalendar: false,
      },
    });

    await prisma.universityInfo.create({
      data: {
        id: uuidv4(),
        userId: user.id,
        currentYear: 3,
        expectedGraduationYear: 2026,
        major: 'Software Engineering',
        universityId: `ASTU-${user.firstName}`,
        status: UniversityStatus.onCampus,
        department: 'Software Engineering',
      },
    });

    await prisma.socialLink.createMany({
      data: [
        {
          id: uuidv4(),
          userId: user.id,
          socialLinkName: 'Telegram',
          socialLinkUrl: `https://t.me/${user.telegramUserName}`,
        },
        {
          id: uuidv4(),
          userId: user.id,
          socialLinkName: 'GitHub',
          socialLinkUrl: `https://github.com/${(user.firstName ?? 'unknown').toLowerCase()}`,
        },
      ],
    });
  }

  console.log('✅ UserSettings, UniversityInfo, and socialLinks seeded');
}

async function main() {
  await seedUserDetails();

  console.log('✅ Users seeding Done!');
}

async function SeedUserDetails() {
  main()
    .catch((e) => {
      console.error('Error initializing app:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

}

export default SeedUserDetails;