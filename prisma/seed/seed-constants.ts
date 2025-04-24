import { prisma } from '@/shared/utils/prisma';
import { v4 as uuidv4 } from 'uuid';



async function seedDivisions() {
    await prisma.divisions.deleteMany({});
    await prisma.divisions.createMany({
        data: [
            { id: uuidv4(), name: 'CPD', description: 'Competitive Programming Division' },
            { id: uuidv4(), name: 'CBD', description: 'Community Building Division' },
            { id: uuidv4(), name: 'DEV', description: 'Software Development Division' },
            { id: uuidv4(), name: 'SEC', description: 'Cyber Security Division' },
            { id: uuidv4(), name: 'DS', description: 'Data Science Division' },
            { id: uuidv4(), name: 'ENTIRE', description: 'For club-wide, non-division-specific content' },
        ],
    });
    console.log('✅ Divisions seeded');
}

async function seedFileCategories() {
    await prisma.fileCategories.deleteMany({});
    await prisma.fileCategories.createMany({
        data: [
            { id: uuidv4(), name: 'Tutorials', description: 'Learning materials and guides' },
            { id: uuidv4(), name: 'Project Files', description: 'Source code and project resources' },
            { id: uuidv4(), name: 'Lecture Notes', description: 'Notes and references from sessions' },
        ],
    });
    console.log('✅ FileCategories seeded');
}

async function seedBadges() {
    await prisma.badges.deleteMany({});
    await prisma.badges.createMany({
        data: [
            {
                id: uuidv4(),
                name: 'TaskMaster',
                description: 'Awarded for completing 10 tasks',
                imageUrl: 'https://example.com/taskmaster.png',
                criteria: 'Complete 10 approved tasks',
                points: 100,
            },
            {
                id: uuidv4(),
                name: 'ActiveParticipant',
                description: 'Awarded for attending 5 sessions',
                imageUrl: 'https://example.com/participant.png',
                criteria: 'Attend 5 sessions',
                points: 50,
            },
        ],
    });
    console.log('✅ Badges seeded');
}

async function seedPermissions() {
    await prisma.rolePermission.deleteMany({});
    await prisma.permission.deleteMany({});
    await prisma.permission.createMany({
        data: [
            { key: 'event.create', label: 'Create Event' },
            { key: 'user.promote', label: 'Promote User' },
            { key: 'division.manage', label: 'Manage Divisions' },
            { key: 'session.attendance', label: 'Manage Attendance' },
        ],
    });
    console.log('✅ Permissions seeded');
}

async function seedRolePermissions() {
    const permissions = await prisma.permission.findMany();
    if (permissions.length === 0) {
        console.error('❌ No permissions found. Run seedPermissions() first.');
        process.exit(1);
    }

    const roleNames = ['SuperAdmin', 'President', 'VicePresident', 'DivisionHead', 'Coordinator'];
    const roles = await prisma.role.findMany({
        where: { name: { in: roleNames } },
    });

    const roleMap = Object.fromEntries(roles.map((r) => [r.name, r.id]));

    const mappings: { roleId: string; permissionId: number }[] = [];

    for (const permission of permissions) {
        if (roleMap.SuperAdmin) {
            mappings.push({ roleId: roleMap.SuperAdmin, permissionId: permission.id });
        }

        if (
            ['event.create', 'user.promote', 'division.manage'].includes(permission.key) &&
            roleMap.President
        ) {
            mappings.push({ roleId: roleMap.President, permissionId: permission.id });
        }

        if (
            ['event.create', 'user.promote'].includes(permission.key) &&
            roleMap.VicePresident
        ) {
            mappings.push({ roleId: roleMap.VicePresident, permissionId: permission.id });
        }

        if (
            ['event.create', 'session.attendance'].includes(permission.key) &&
            roleMap.DivisionHead
        ) {
            mappings.push({ roleId: roleMap.DivisionHead, permissionId: permission.id });
        }

        if (permission.key === 'session.attendance' && roleMap.Coordinator) {
            mappings.push({ roleId: roleMap.Coordinator, permissionId: permission.id });
        }
    }

    await prisma.rolePermission.createMany({
        data: mappings,
        skipDuplicates: true,
    });

    console.log('✅ RolePermissions seeded');
}

async function createConstants() {
    await seedDivisions();
    await seedFileCategories();
    await seedBadges();
    await seedPermissions();
    // await seedRolePermissions();
}

async function main() {
    await createConstants();
    console.log('✅ Constants are seeded!');
}

async function seedConstants() {
    main()
        .catch((e) => {
            console.error('Error initializing app:', e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default seedConstants;
