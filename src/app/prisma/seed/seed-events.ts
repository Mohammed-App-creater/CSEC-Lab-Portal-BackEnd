import {  Tag, Status, EventVisibility } from '@prisma/client';
import { prisma } from '@/shared/utils/prisma';
import { v4 as uuidv4 } from 'uuid';



async function seedEvents(eventCount: number) {
    const SuperAdmin = await prisma.role.findFirst({
        where: { name: 'SuperAdmin' },
    });

    // Delete any existing events
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

    // Fetch users to assign as creators
    const users = await prisma.user.findMany({
        where: { roleId: { not: SuperAdmin?.id } },
    });

    if (users.length === 0) {
        console.error('❌ No valid users found. Make sure users are seeded.');
        process.exit(1);
    }

    const eventTemplate = [
        { title: 'CPD Monthly Training', tags: [Tag.CPD], division: 'CPD' },
        { title: 'CBD Community Outreach Program', tags: [Tag.CBD], division: 'CBD' },
        { title: 'DEV Hackathon 2025', tags: [Tag.DEV], division: 'DEV' },
        { title: 'Seberscurty Awareness Session', tags: [Tag.SEC], division: 'Seberscurty' },
        { title: 'DS Data Science Bootcamp', tags: [Tag.DS], division: 'DS' },
    ];

    const eventData = eventTemplate.map((template, index) => ({
        title: template.title,
        description: `${template.title} description`,
        startDate: new Date(`2025-0${(index % 12) + 1}-01`),
        startTime: new Date(`2025-0${(index % 12) + 1}-01T09:00:00`),
        endTime: new Date(`2025-0${(index % 12) + 1}-01T12:00:00`),
        divisionId: divisions.find((d) => d.name === template.division)?.id,
        tags: template.tags,
        visibility: EventVisibility.PUBLIC,
        status: Status.Planned,
        creatorId: users[index % users.length].id,
    }));

    for (let i = 0; i < eventCount; i++) {
        const event = eventData[i % eventData.length];

        if (!event.divisionId) {
            console.warn(`⚠️ Skipping event "${event.title}" due to missing division.`);
            continue;
        }

        const divisionGroups = await prisma.groups.findMany({
            where: {
                divisionId: event.divisionId,
            },
        });

        if (divisionGroups.length === 0) {
            console.warn(`⚠️ No groups found for division ${event.divisionId}. Skipping event "${event.title}"`);
            continue;
        }

        interface EventData {
            id: string;
            title: string;
            description: string | null;
            startDate: Date;
            startTime: Date;
            endTime: Date;
            divisionId: string | null;
            tags: Tag[];
            visibility: EventVisibility;
            status: Status;
            creatorId: string;
            groups?: {
                connect: { id: string }[];
            };
        }

        const createdEvent: EventData = await prisma.events.create({
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
                groups: {
                    connect: divisionGroups.map((group) => ({ id: group.id })),
                },
            },
        });

        console.log(`✅ Event "${createdEvent.title}" created with ${divisionGroups.length} group(s)`);
    }

    console.log('✅ All events seeded');
}

async function main() {
    const eventCount = 10;
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
