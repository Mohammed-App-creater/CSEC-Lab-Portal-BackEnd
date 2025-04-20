import { PrismaClient, RoleType, Theme, Tag, ClubStatus, UniversityStatus, Gender, Status, SessionRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seedSessions() {
    await prisma.sessionParticipation.deleteMany({});
    await prisma.sessionTimeSlot.deleteMany({});
    await prisma.sessions.deleteMany({});
    console.log('🧼 Old sessions, time slots, participations deleted');

    const users = await prisma.user.findMany({ where: { role: { not: 'SuperAdmin' } } });
    const divisions = await prisma.divisions.findMany();
    const groups = await prisma.groups.findMany();


    const abel = users.find((u) => u.firstName === 'Abel');
    const selam = users.find((u) => u.firstName === 'Selam');
    const musa = users.find((u) => u.firstName === 'Musa');
    const hanna = users.find((u) => u.firstName === 'Hanna');
    if (!abel || !selam || !musa || !hanna) {
        console.error('❌ Required users not found. Make sure they are seeded.');
        process.exit(1);
    }

    console.log(prisma.user.findMany({ where: { role: { not: 'SuperAdmin' } } }))

    const cpd = divisions.find((d) => d.name === 'CPD');
    const dev = divisions.find((d) => d.name === 'DEV');
    if (!cpd || !dev) {
        console.error('❌ Required divisions CPD or DEV not found.');
        process.exit(1);
    }

    const cpdGroup = groups.find((g) => g.name.includes('CPD'));
    const devGroup = groups.find((g) => g.name.includes('DEV'));
    if (!cpdGroup || !devGroup) {
        console.error('❌ Required groups not found.');
        process.exit(1);
    }

    if (!abel || !selam || !musa || !cpd || !dev || !cpdGroup || !devGroup) {
        console.error('❌ Required users, divisions, or groups not found.');
        process.exit(1);
    }

    // 🟢 Session 1 - CPD
    const session1 = await prisma.sessions.create({
        data: {
            id: uuidv4(),
            title: 'CPD Monthly Training',
            description: 'Monthly CPD skill upgrade session',
            startMonth: new Date('2025-04-01'),
            endTMonth: new Date('2025-04-30'),
            location: 'Lab 301',
            tags: [Tag.CPD],
            status: Status.Ongoing,
            creatorId: abel.id,
            division: { connect: [{ id: cpd.id }] },
            targetGroups: { connect: [{ id: cpdGroup.id }] },
        },
    });

    await prisma.sessionTimeSlot.create({
        data: {
            id: uuidv4(),
            sessionId: session1.id,
            date: new Date('2025-04-05'),
            startTime: new Date('2025-04-05T10:00:00'),
            endTime: new Date('2025-04-05T12:00:00'),
        },
    });

    await prisma.sessionParticipation.createMany({
        data: [
            {
                id: uuidv4(),
                sessionId: session1.id,
                userId: abel.id,
                role: SessionRole.Speaker,
                score: 95,
                feedback: 'Great session by Abel',
                feedbackScore: 5,
                createdAt: new Date(),
            },
            {
                id: uuidv4(),
                sessionId: session1.id,
                userId: musa.id,
                role: SessionRole.Coordinator,
                score: 80,
                createdAt: new Date(),
            },
        ],
    });

    // 🟢 Session 2 - DEV
    const session2 = await prisma.sessions.create({
        data: {
            id: uuidv4(),
            title: 'DEV AI Bootcamp',
            description: '1-month intensive AI bootcamp for DEV division',
            startMonth: new Date('2025-05-01'),
            endTMonth: new Date('2025-05-30'),
            location: 'Innovation Hub',
            tags: [Tag.DEV],
            status: Status.Planned,
            creatorId: selam.id,
            division: { connect: [{ id: dev.id }] },
            targetGroups: { connect: [{ id: devGroup.id }] },
        },
    });

    await prisma.sessionTimeSlot.create({
        data: {
            id: uuidv4(),
            sessionId: session2.id,
            date: new Date('2025-05-10'),
            startTime: new Date('2025-05-10T14:00:00'),
            endTime: new Date('2025-05-10T17:00:00'),
        },
    });

    await prisma.sessionParticipation.createMany({
        data: [
            {
                id: uuidv4(),
                sessionId: session2.id,
                userId: selam.id,
                role: SessionRole.Mentor,
                score: 100,
                feedback: 'Led the bootcamp',
                feedbackScore: 5,
                createdAt: new Date(),
            },
            {
                id: uuidv4(),
                sessionId: session2.id,
                userId: hanna.id,
                role: SessionRole.Coordinator,
                score: 85,
                feedback: 'Loved the AI lab',
                feedbackScore: 4,
                createdAt: new Date(),
            },
        ],
    });

    console.log('✅ Sessions, time slots, and participations seeded');
}




async function main() {

    await seedSessions();

    console.log('✅ Sessions seeded');
}


async function SeedSessions() {
    main()
        .catch((e) => {
            console.error('Error initializing app:', e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default SeedSessions;