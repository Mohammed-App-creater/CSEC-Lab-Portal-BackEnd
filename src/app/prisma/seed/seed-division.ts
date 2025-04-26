import { prisma } from '@/shared/utils/prisma';



async function seedDivisions() {
    // Deleting any existing divisions before seeding
    await prisma.divisions.deleteMany({});
    console.log('🧼 Old divisions deleted');

    // Main divisions to seed
    const divisions = [
        { name: 'CPD', description: 'Continuing Professional Development' },
        { name: 'CBD', description: 'Community-Based Development' },
        { name: 'DEV', description: 'Development Division' },
        { name: 'Seberscurty', description: 'Cybersecurity Division' },
        { name: 'DS', description: 'Data Science Division' },
    ];

    // Create divisions
    for (const division of divisions) {
        const createdDivision = await prisma.divisions.create({
            data: division,
        });
        console.log(`✅ Division "${createdDivision.name}" created`);
    }

    console.log('✅ All divisions seeded');
}

async function main() {
    await seedDivisions();
    console.log('✅ Divisions seeded successfully');
}

async function SeedDivisions() {
    main()
        .catch((e) => {
            console.error('Error initializing app:', e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default SeedDivisions;
