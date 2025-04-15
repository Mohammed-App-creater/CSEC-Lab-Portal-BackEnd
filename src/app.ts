import { PrismaClient, RoleType, ClubStatus, UniversityStatus, Gender } from './generated/prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function createSuperAdmin() {
  // Check if a superadmin already exists
  const existingSuperAdmin = await prisma.user.findFirst({
    where: { role: RoleType.SuperAdmin },
  });

  if (existingSuperAdmin) {
    console.log('Superadmin already exists!');
    return;
  }

  // If no superadmin exists, create one
  const superAdminId = uuidv4();

  const superAdmin = await prisma.user.create({
    data: {
      id: superAdminId,
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@example.com',
      phone_number: '0912345678',
      telegramUserName: 'super_admin',
      password: 'securehashedpassword', // Use a hashed password in production
      gender: Gender.Male,
      bio: 'I am the superadmin of this platform.',
      lastSeen: new Date(),
      role: RoleType.SuperAdmin, // Assign SuperAdmin role
      clubStatus: ClubStatus.Active,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Optionally, you can add university info for superadmin if needed
  await prisma.universityInfo.create({
    data: {
      currentYear: 1,
      expectedGraduationYear: 2026,
      major: 'Admin',
      universityId: 'ASTU001',
      status: UniversityStatus.onCampus,
      department: 'Administration',
      userId: superAdmin.id,
    },
  });

  console.log('Superadmin created successfully.');
}

async function main() {
  await createSuperAdmin(); // Run the function to create a superadmin when the app starts

  // You can add any other initialization logic here

  console.log('App initialized!');
}

main()
  .catch((e) => {
    console.error('Error initializing app:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
