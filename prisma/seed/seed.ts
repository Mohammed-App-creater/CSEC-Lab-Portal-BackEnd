import { PrismaClient } from '@prisma/client';

// 👇 import all the seed modules
import seedConstants from './seed-constants'; // Enums & static constants (must come early)
import SeedRole from './seedRoles'; // Roles (must come before role-permissions and users)
import seedRolePermissions from './seed-role-permissions'; // Depends on Roles
import SeedDivision from './seed-division'; // Used by users, groups, events, etc.

import seedUser from './seed-user'; // Depends on Roles & Divisions
import SeedUserDetails from './seed-user-details'; // Depends on Users

import SeedGroups from './seed-groups'; // Depends on Users and Divisions
import SeedResourceLinks from './seed-resourceLinke'; // Can be placed around here
import SeedSessions from './seed-sessions'; // Depends on Groups & Users
import SeedEvents from './seed-events'; // Depends on Groups, Users, and Divisions

import SeedAttendance from './seed-attendance'; // Depends on Sessions and Events
import seedAnnouncementsAndNotifications from './seed-announcements-notifications'; // Depends on Users, Events, Sessions, Groups

import SeedReset from './seed-reset';
import createSuperAdmin from './seed-superAdmin';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting master seeding...');

  // await SeedReset();                     // 0. Reset DB (optional, but useful for devs)

  // await createSuperAdmin(); // 0. Create SuperAdmin user (optional, but useful for devs)

  // await seedConstants();                  // 1. Enums and constants
  // await SeedRole();                       // 2. Seed roles
  // await seedRolePermissions();            // 3. Connect permissions to roles

  // await SeedDivision();                   // 4. Create main divisions

  // await seedUser();                       // 5. Create users (roles + divisions must exist)
  // await SeedUserDetails();                // 6. Extra details for users

  // await SeedGroups();                     // 7. Create user groups (depends on divisions + users)
  // await SeedResourceLinks();              // 8. Optional: static or useful links
  // await SeedSessions(125);                   // 9. Create sessions (groups + users)
  // await SeedEvents();                     // 10. Create events (groups + users + divisions)

  // await SeedAttendance();                 // 11. Attendance (needs events and sessions)

  // await seedAnnouncementsAndNotifications(25); // 12. Announcements + notifications



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
