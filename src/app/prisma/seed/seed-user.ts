import {  ClubStatus, Gender } from '@prisma/client';
import { prisma } from '@/shared/utils/prisma';
import { v4 as uuidv4 } from 'uuid';



async function seedUsers(count: number) {
  const SuperAdmin = await prisma.role.findFirst({
    where: { name: 'SuperAdmin' },
  });
  // Clear all users except SuperAdmin
  await prisma.user.deleteMany({
    where: {
      roleId: { not: SuperAdmin?.id },
    },
  });

  console.log('✅ Cleared existing users (except SuperAdmin)');

  const divisions = await prisma.divisions.findMany();
  const roles = await prisma.role.findMany({
    where: {
      name: {
        in: ['VicePresident', 'DivisionHead', 'Coordinator', 'Member'],
      },
    },
  });

  if (divisions.length < 2) {
    console.error('❌ At least two divisions are required.');
    process.exit(1);
  }

  if (roles.length < 4) {
    console.error('❌ Required roles missing. Run role seeder first.');
    process.exit(1);
  }

  const divisionOptions = [divisions.find(d => d.name === 'CPD'), divisions.find(d => d.name === 'DEV')].filter(Boolean);
  const roleCycle = ['VicePresident', 'DivisionHead', 'Coordinator', 'Member'];

  const userData = Array.from({ length: count }).map((_, i) => {
    const firstName = `User${i + 1}`;
    const lastName = `Test${i + 1}`;
    const email = `user${i + 1}@example.com`;
    const telegram = `user${i + 1}_tg`;

    return {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      phone_number: `09110000${(10 + i).toString().padStart(2, '0')}`,
      telegramUserName: telegram,
      password: 'hashedpassword',
      gender: i % 2 === 0 ? Gender.Male : Gender.Female,
      lastSeen: new Date(),
      clubStatus: ClubStatus.Active,
      DivisionId: divisionOptions[i % divisionOptions.length]!.id,
      roleId: roles.find(r => r.name === roleCycle[i % roleCycle.length])!.id, // Assign roleId
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  await prisma.user.createMany({
    data: userData,
    skipDuplicates: true,
  });

  console.log(`✅ ${count} Users seeded`);

  const allUsers = await prisma.user.findMany({
    where: {
      email: {
        in: userData.map(u => u.email),
      },
    },
  });

  for (let i = 0; i < allUsers.length; i++) {
    const roleName = roleCycle[i % roleCycle.length];
    const role = roles.find(r => r.name === roleName);
    if (role) {
      await prisma.user.update({
        where: { id: allUsers[i].id },
        data: {
          Role: {
            connect: { id: role.id },
          },
        },
      });
    }
  }

  console.log('✅ Roles assigned to users');
}

async function main() {
  await seedUsers(10); // Replace 10 with any number you want
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
