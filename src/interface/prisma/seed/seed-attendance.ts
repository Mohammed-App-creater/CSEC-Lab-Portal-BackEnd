import {
    PrismaClient,
    AttendanceStatus,
    HeadsUpType,
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seedAttendance() {
    // Cleanup first
    await prisma.attendance.deleteMany({});
    await prisma.headsUp.deleteMany({});
    console.log('🧼 Old attendance and heads-ups deleted');

    const users = await prisma.user.findMany({ where: { role: { not: 'SuperAdmin' } } });
    const sessions = await prisma.sessions.findMany();
    const events = await prisma.events.findMany();

    const abel = users.find(u => u.firstName === 'Abel');
    const musa = users.find(u => u.firstName === 'Musa');
    const selam = users.find(u => u.firstName === 'Selam');
    const hanna = users.find(u => u.firstName === 'Hanna');

    const cpdSession = sessions.find(s => s.title.includes('CPD'));
    const devSession = sessions.find(s => s.title.includes('DEV'));

    const cpdEvent = events.find(e => e.title.includes('Hackathon'));
    const devEvent = events.find(e => e.title.includes('Showcase'));

    if (!abel || !musa || !selam || !hanna || !cpdSession || !devSession || !cpdEvent || !devEvent) {
        console.error('❌ Required users, sessions, or events not found');
        process.exit(1);
    }

    // 🟢 Attendance for CPD Session
    await prisma.attendance.createMany({
        data: [
            {
                id: uuidv4(),
                userId: abel.id,
                sessionId: cpdSession.id,
                status: AttendanceStatus.PRESENT,
                timestamp: new Date('2025-04-05T10:05:00'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                userId: musa.id,
                sessionId: cpdSession.id,
                status: AttendanceStatus.EXCUSED,
                timestamp: new Date('2025-04-05T10:10:00'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });

    // 🟢 HeadsUp from Musa (for missed session)
    const headsUp = await prisma.headsUp.create({
        data: {
            id: uuidv4(),
            userId: musa.id,
            type: HeadsUpType.SICK,
            body: 'Unable to attend CPD session due to illness.',
            sentAt: new Date('2025-04-04T20:00:00'),
        },
    });

    // Update attendance with headsUpId
    const musaAttendance = await prisma.attendance.findFirst({
        where: { userId: musa.id, sessionId: cpdSession.id },
    });

    if (musaAttendance) {
        await prisma.attendance.update({
            where: { id: musaAttendance.id },
            data: { headsUpId: headsUp.id },
        });
    }

    // 🟢 Attendance for DEV Event
    await prisma.attendance.createMany({
        data: [
            {
                id: uuidv4(),
                userId: selam.id,
                eventId: devEvent.id,
                status: AttendanceStatus.PRESENT,
                timestamp: new Date('2025-07-10T14:05:00'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                userId: hanna.id,
                eventId: devEvent.id,
                status: AttendanceStatus.ABSENT,
                timestamp: new Date('2025-07-10T14:15:00'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });

    console.log('✅ Attendance and heads-ups seeded');
}

async function SeedAttendance() {
    seedAttendance()
        .catch((e) => {
            console.error('❌ Seeding attendance failed:', e);
            process.exit(1);
        })
        .finally(async () => {
            prisma.$disconnect();
        });
}

export default SeedAttendance;
