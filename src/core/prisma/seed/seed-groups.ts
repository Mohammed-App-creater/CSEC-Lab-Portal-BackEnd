import { PrismaClient, RoleType, Theme, ClubStatus, UniversityStatus, Gender } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();


async function seedGroups() {
    // Clean previous groups
    await prisma.groups.deleteMany({});
    console.log('✅ Old groups deleted');

    // Get existing divisions
    const divisions = await prisma.divisions.findMany();
    const cpd = divisions.find((d) => d.name === 'CPD');
    const dev = divisions.find((d) => d.name === 'DEV');

    if (!cpd || !dev) {
        console.error('❌ Required divisions not found. Make sure CPD and DEV are seeded.');
        process.exit(1);
    }

    // Get existing users (exclude SuperAdmin)
    const users = await prisma.user.findMany({
        where: { role: { not: 'SuperAdmin' } },
    });

    if (users.length < 2) {
        console.error('❌ Not enough users to assign to groups.');
        process.exit(1);
    }

    const abel = users.find((u) => u.firstName === 'Abel');
    const selam = users.find((u) => u.firstName === 'Selam');
    const musa = users.find((u) => u.firstName === 'Musa');
    const hanna = users.find((u) => u.firstName === 'Hanna');

    // Seed groups
    await prisma.groups.create({
        data: {
            id: uuidv4(),
            name: 'CPD Frontend Team',
            description: 'Group for CPD frontend devs',
            divisionId: cpd.id,
            users: {
                connect: [
                    abel ? { id: abel.id } : null,
                    musa ? { id: musa.id } : null,
                ].filter((user): user is { id: string } => user !== null),
            },
        },
    });

    await prisma.groups.create({
        data: {
            id: uuidv4(),
            name: 'DEV AI Squad',
            description: 'Data + AI focused developers in DEV',
            divisionId: dev.id,
            users: {
                connect: [
                    selam ? { id: selam.id } : null,
                    hanna ? { id: hanna.id } : null,
                ].filter((user): user is { id: string } => user !== null),
            },
        },
    });

}


async function main() {
    await seedGroups();

    console.log('✅ Groups seeded and users assigned');
}

async function SeedGroups() {
    main()
        .catch((e) => {
            console.error('Error initializing app:', e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default SeedGroups;