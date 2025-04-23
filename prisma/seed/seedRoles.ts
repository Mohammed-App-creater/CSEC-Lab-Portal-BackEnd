import { PrismaClient, RoleStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const baseRoles = [
    'SuperAdmin',
    'President',
    'VicePresident',
    'DivisionHead',
    'Coordinator',
    'Member',
];

async function seedRoles() {
    for (const roleName of baseRoles) {
        await prisma.role.upsert({
            where: { name: roleName },
            update: {},
            create: {
                id: uuidv4(),
                name: roleName,
                status: RoleStatus.Active,
            },
        });
    }

    console.log('✅ Base roles seeded');
}

async function SeedRole(): Promise<void> {
    seedRoles()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default SeedRole;
