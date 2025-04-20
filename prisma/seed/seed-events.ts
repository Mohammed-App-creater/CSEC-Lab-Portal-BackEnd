import { PrismaClient, Tag, Status, EventVisibility } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seedEvents(eventCount: number) {
    const SuperAdmin = await prisma.role.findFirst({
        where: { name: 'SuperAdmin' },
      });
    // Deleting any existing events before seeding
    await prisma.events.deleteMany({});
    console.log('🧼 Old events deleted');

    // Fetch the divisions
    const divisions = await prisma.divisions.findMany({
        where: {
            name: {
                in: ['CPD', 'CBD', 'DEV', 'Seberscurty', 'DS'],
            },
        },
    });

    if (divisions.length !== 5) {
        console.error('❌ Not all divisions found. Make sure the required divisions are seeded.');
        process.exit(1);
    }

    // Fetch some users to assign as event creators
    const users = await prisma.user.findMany({
        where: { roleId: { not: SuperAdmin?.id } }, // Avoiding SuperAdmins
    });

    if (users.length === 0) {
        console.error('❌ No valid users found. Make sure users are seeded.');
        process.exit(1);
    }

    // Event template (you can modify this structure as per your need)
    const eventTemplate = [
        { title: 'CPD Monthly Training', tags: [Tag.CPD], division: 'CPD' },
        { title: 'CBD Community Outreach Program', tags: [Tag.CBD], division: 'CBD' },
        { title: 'DEV Hackathon 2025', tags: [Tag.DEV], division: 'DEV' },
        { title: 'Seberscurty Awareness Session', tags: [Tag.SEC], division: 'Seberscurty' },
        { title: 'DS Data Science Bootcamp', tags: [Tag.DS], division: 'DS' },
    ];

    const eventData = eventTemplate.map((template, index) => {
        return {
            title: template.title,
            description: `${template.title} description`,
            startDate: new Date(`2025-0${(index % 12) + 1}-01`), // Simple monthly offset
            startTime: new Date(`2025-0${(index % 12) + 1}-01T09:00:00`),
            endTime: new Date(`2025-0${(index % 12) + 1}-01T12:00:00`),
            divisionId: divisions.find((d) => d.name === template.division)?.id,
            tags: template.tags,
            visibility: EventVisibility.PUBLIC,
            status: Status.Planned,
            creatorId: users[index % users.length].id, // Rotate through users
        };
    });

    // Loop to create the specified number of events
    for (let i = 0; i < eventCount; i++) {
        const event = eventData[i % eventData.length]; // Cycle through the event template

        const createdEvent = await prisma.events.create({
            data: {
                id: uuidv4(),
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                startTime: event.startTime,
                endTime: event.endTime,
                divisionId: event.divisionId,
                tags: event.tags,
                visibility: event.visibility,
                status: event.status,
                creatorId: event.creatorId,
            },
        });
        console.log(`✅ Event "${createdEvent.title}" created`);
    }

    console.log('✅ All events seeded');
}

async function main() {
    const eventCount = 10; // Pass the number of events to be created
    await seedEvents(eventCount);
    console.log('✅ Events seeded successfully');
}

async function SeedEvents() {
    main()
        .catch((e) => {
            console.error('Error initializing app:', e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default SeedEvents;
