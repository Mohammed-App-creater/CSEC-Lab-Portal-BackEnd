import { PrismaClient, RoleType } from '../src/core/generated/prisma';

const prisma = new PrismaClient();

async function seedRolePermissions() {
  // Clear old role-permission mappings
  await prisma.rolePermission.deleteMany({});
  console.log('🧼 Cleared old RolePermissions');

  const permissions = await prisma.permission.findMany();

  if (!permissions.length) {
    console.error('❌ No permissions found. Run seed-constants.ts first.');
    return;
  }

  const mappings = [];

  // SuperAdmin → all permissions
  for (const permission of permissions) {
    mappings.push({
      role: RoleType.SuperAdmin,
      permissionId: permission.id,
    });
  }

  // President → manage users, create events, manage divisions
  for (const p of permissions) {
    if (['event.create', 'user.promote', 'division.manage'].includes(p.key)) {
      mappings.push({ role: RoleType.President, permissionId: p.id });
    }
  }

  // VicePresident → create events, promote users
  for (const p of permissions) {
    if (['event.create', 'user.promote'].includes(p.key)) {
      mappings.push({ role: RoleType.VicePresident, permissionId: p.id });
    }
  }

  // DivisionHead → create event, manage attendance
  for (const p of permissions) {
    if (['event.create', 'session.attendance'].includes(p.key)) {
      mappings.push({ role: RoleType.DivisionHead, permissionId: p.id });
    }
  }

  // Coordinator → attendance only
  for (const p of permissions) {
    if (p.key === 'session.attendance') {
      mappings.push({ role: RoleType.Coordinator, permissionId: p.id });
    }
  }

  // Member → no permissions assigned
  await prisma.rolePermission.createMany({
    data: mappings,
    skipDuplicates: true,
  });

  console.log('✅ RolePermissions seeded');
}

export default seedRolePermissions;
seedRolePermissions()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });