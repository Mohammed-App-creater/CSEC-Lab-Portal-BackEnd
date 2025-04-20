import { PrismaClient, RoleType, Theme, ClubStatus, UniversityStatus, Gender } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seedUsers() {
  // Delete previous test users (except SuperAdmin)
  await prisma.user.deleteMany({
    where: {
      role: { not: RoleType.SuperAdmin },
    },
  });
  console.log('✅ Cleared existing users (except SuperAdmin)');

  // Get existing divisions
  const divisions = await prisma.divisions.findMany();
  if (divisions.length === 0) {
    console.error('❌ No divisions found. Run seed.ts first.');
    process.exit(1);
  }

  // Find division IDs
  const cpd = divisions.find((d) => d.name === 'CPD');
  const dev = divisions.find((d) => d.name === 'DEV');

  if (!cpd || !dev) {
    console.error('❌ CPD and DEV divisions not found.');
    process.exit(1);
  }

  // Seed test users
  await prisma.user.createMany({
    data: [
      {
        id: uuidv4(),
        firstName: 'Abel',
        lastName: 'Kebede',
        email: 'abel@example.com',
        phone_number: '0911000011',
        telegramUserName: 'abel_kebede',
        password: 'hashedpassword',
        gender: Gender.Male,
        lastSeen: new Date(),
        role: RoleType.VicePresident,
        clubStatus: ClubStatus.Active,
        DivisionId: cpd.id,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Selam',
        lastName: 'Teshome',
        email: 'selam@example.com',
        phone_number: '0911000022',
        telegramUserName: 'selam_teshome',
        password: 'hashedpassword',
        gender: Gender.Female,
        lastSeen: new Date(),
        role: RoleType.DivisionHead,
        clubStatus: ClubStatus.Active,
        DivisionId: dev.id,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Musa',
        lastName: 'Ali',
        email: 'musa@example.com',
        phone_number: '0911000033',
        telegramUserName: 'musa_ali',
        password: 'hashedpassword',
        gender: Gender.Male,
        lastSeen: new Date(),
        role: RoleType.Coordinator,
        clubStatus: ClubStatus.Active,
        DivisionId: cpd.id,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Hanna',
        lastName: 'Eshetu',
        email: 'hanna@example.com',
        phone_number: '0911000044',
        telegramUserName: 'hanna_eshetu',
        password: 'hashedpassword',
        gender: Gender.Female,
        lastSeen: new Date(),
        role: RoleType.Member,
        clubStatus: ClubStatus.Active,
        DivisionId: dev.id,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Users seeded');
}

async function main() {
  await seedUsers();

  console.log('✅ Users seeding Done!');
}



async function seedUserDetails() {
  main()
    .catch((e) => {
      console.error('Error initializing app:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export default seedUserDetails;
