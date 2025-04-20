import { PrismaClient } from '@prisma/client';

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

  const roleNames = [
    'SuperAdmin',
    'President',
    'VicePresident',
    'DivisionHead',
    'Coordinator',
    'Member',
  ];

  const roles = await prisma.role.findMany({
    where: {
      name: { in: roleNames },
    },
  });

  const roleMap = Object.fromEntries(roles.map((role) => [role.name, role.id]));

  const mappings: { roleId: string; permissionId: number }[] = [];

  // SuperAdmin → all permissions
  for (const permission of permissions) {
    if (roleMap.SuperAdmin) {
      mappings.push({ roleId: roleMap.SuperAdmin, permissionId: permission.id });
    }
  }

  // President → manage users, create events, manage divisions
  for (const p of permissions) {
    if (
      ['event.create', 'user.promote', 'division.manage'].includes(p.key) &&
      roleMap.President
    ) {
      mappings.push({ roleId: roleMap.President, permissionId: p.id });
    }
  }

  // VicePresident → create events, promote users
  for (const p of permissions) {
    if (
      ['event.create', 'user.promote'].includes(p.key) &&
      roleMap.VicePresident
    ) {
      mappings.push({ roleId: roleMap.VicePresident, permissionId: p.id });
    }
  }

  // DivisionHead → create event, manage attendance
  for (const p of permissions) {
    if (
      ['event.create', 'session.attendance'].includes(p.key) &&
      roleMap.DivisionHead
    ) {
      mappings.push({ roleId: roleMap.DivisionHead, permissionId: p.id });
    }
  }

  // Coordinator → attendance only
  for (const p of permissions) {
    if (p.key === 'session.attendance' && roleMap.Coordinator) {
      mappings.push({ roleId: roleMap.Coordinator, permissionId: p.id });
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
    prisma.$disconnect();
  });
