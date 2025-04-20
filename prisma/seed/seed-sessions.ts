import { PrismaClient, Tag, SessionRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import * as readline from 'readline';

const prisma = new PrismaClient();

// Setup readline interface to ask for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Helper function to prompt the user for input
const askQuestion = (question: string) => {
    return new Promise<string>((resolve) => rl.question(question, resolve));
};

// Helper function to get a random user from the list
const getRandomUser = (users: any[]) => {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
};

// Helper function to get a random division and its associated group
const getRandomDivisionAndGroup = (divisions: any[], groups: any[]) => {
    const randomDivision = divisions[Math.floor(Math.random() * divisions.length)];
    const associatedGroup = groups.find((group) => group.name.includes(randomDivision.name));
    return { randomDivision, associatedGroup };
};

async function seedSessions(numSessions: number) {
    const SuperAdmin = await prisma.role.findFirst({
        where: { name: 'SuperAdmin' },
      });
    await prisma.sessionParticipation.deleteMany({});
    await prisma.sessionTimeSlot.deleteMany({});
    await prisma.sessions.deleteMany({});
    console.log('🧼 Old sessions, time slots, participations deleted');

    // Fetch all users, divisions, and groups
    const users = await prisma.user.findMany({ where: { roleId: { not: SuperAdmin?.id } } });
    const divisions = await prisma.divisions.findMany();
    const groups = await prisma.groups.findMany();

    // Check if there are enough users, divisions, and groups
    if (users.length === 0 || divisions.length === 0 || groups.length === 0) {
        console.error('❌ Not enough users, divisions, or groups found. Make sure they are seeded.');
        process.exit(1);
    }

    // Loop to create multiple sessions based on numSessions input
    for (let i = 1; i <= numSessions; i++) {
        const sessionTitle = `Session ${i} - Random Division`;
        const sessionDescription = `Session ${i} description`;

        // Get a random division and associated group
        const { randomDivision, associatedGroup } = getRandomDivisionAndGroup(divisions, groups);

        if (!associatedGroup) {
            console.error(`❌ No associated group found for division ${randomDivision.name}.`);
            continue;
        }

        // 🟢 Create session
        const session = await prisma.sessions.create({
            data: {
                id: uuidv4(),
                title: sessionTitle,
                description: sessionDescription,
                startMonth: new Date(`2025-0${(i % 12) + 1}-01`),  // Alternate months
                endTMonth: new Date(`2025-0${(i % 12) + 1}-30`), // Alternate months
                location: `Location ${i}`,
                tags: i % 2 === 0 ? [Tag.DEV] : [Tag.CPD],
                creatorId: getRandomUser(users).id,
                division: { connect: [{ id: randomDivision.id }] },
                targetGroups: { connect: [{ id: associatedGroup.id }] },
            },
        });

        // 🟢 Create time slot
        const month = (i % 12) + 1;
        const paddedMonth = month.toString().padStart(2, '0'); // Ensures '01', '02', ..., '12'
        const day = '10'; // or make this dynamic if needed
        
        const dateString = `2025-${paddedMonth}-${day}`;
        const startTimeString = `${dateString}T10:00:00Z`; // Z = UTC
        const endTimeString = `${dateString}T12:00:00Z`;
        
        await prisma.sessionTimeSlot.create({
            data: {
                id: uuidv4(),
                sessionId: session.id,
                date: new Date(dateString),
                startTime: new Date(startTimeString),
                endTime: new Date(endTimeString),
            },
        });

        // 🟢 Create participations
        const randomUser1 = getRandomUser(users);
        const randomUser2 = getRandomUser(users);
        await prisma.sessionParticipation.createMany({
            data: [
                {
                    id: uuidv4(),
                    sessionId: session.id,
                    userId: randomUser1.id,
                    role: SessionRole.Mentor,
                    score: 100,
                    feedback: `Great session by ${randomUser1.firstName}`,
                    feedbackScore: 5,
                    createdAt: new Date(),
                },
                {
                    id: uuidv4(),
                    sessionId: session.id,
                    userId: randomUser2.id,
                    role: SessionRole.Coordinator,
                    score: 85,
                    feedback: `Loved the session ${i}`,
                    feedbackScore: 4,
                    createdAt: new Date(),
                },
            ],
        });

        console.log(`✅ Session ${i}, time slot, and participations seeded`);
    }
}


async function SeedSessions(count: number) {
    try {
        await seedSessions(count);
        console.log('✅ All sessions seeded');
    } catch (e) {
        console.error('Error initializing app:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

export default SeedSessions;
