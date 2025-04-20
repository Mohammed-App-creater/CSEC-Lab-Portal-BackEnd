import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seedGroups() {
    const SuperAdmin = await prisma.role.findFirst({
        where: { name: 'SuperAdmin' },
      });
    await prisma.groups.deleteMany({});
    console.log('✅ Old groups deleted');

    const divisions = await prisma.divisions.findMany();
    if (divisions.length === 0) {
        console.error('❌ No divisions found. Seed divisions first.');
        process.exit(1);
    }

    const users = await prisma.user.findMany({
        where: { roleId: { not: SuperAdmin?.id } },
    });

    if (users.length === 0) {
        console.error('❌ No users found to assign to groups.');
        process.exit(1);
    }

    // Shuffle users randomly
    const shuffledUsers = users.sort(() => Math.random() - 0.5);

    for (const division of divisions) {
        for (let i = 1; i <= 4; i++) {
            const groupName = `${division.name} Team ${i}`;
            const description = `Group ${i} for ${division.name}`;

            const userSample = shuffledUsers
                .slice((i - 1) * 3, i * 3) // adjust group size here
                .map((user) => ({ id: user.id }));

            const group = await prisma.groups.create({
                data: {
                    id: uuidv4(),
                    name: groupName,
                    description,
                    divisionId: division.id,
                    users: {
                        connect: userSample,
                    },
                },
            });

            console.log(`✅ Created group: ${group.name}`);
        }
    }

    console.log('✅ All groups seeded');
}

async function main() {
    await seedGroups();
}

async function SeedGroups() {
    main()
        .catch((e) => {
            console.error('❌ Error initializing app:', e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default SeedGroups;
