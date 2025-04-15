import { PrismaClient } from '../src/generated/prisma/client';




// 👇 import all the seed modules
import seedConstants from './seed-constants';
import seedRolePermissions from './seed-role-permissions';
import seedUser from './seed-user';
import SeedUserDetails from './seed-user-details';
import SeedGroups from './seed-groups';
import SeedSessions from './seed-sessions';
import SeedEvents from './seed-events';
import SeedTasks from './seed-tasks';
import SeedAttendance from './seed-attendance';
import SeedAnnouncementsAndNotifications from './seed-announcements-notifications';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting master seeding...');
  await seedConstants();
  await seedRolePermissions();
  await seedUser();
  await SeedUserDetails();
  await SeedGroups();
  await SeedSessions();
  await SeedEvents();
  await SeedTasks();
  await SeedAttendance();
  await SeedAnnouncementsAndNotifications();
  console.log('✅ Master seed complete.');
}

main()
  .catch((e) => {
    console.error('❌ Master seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

