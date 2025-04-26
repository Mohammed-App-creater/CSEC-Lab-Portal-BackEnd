import { PrismaClient, SessionRole, AttendanceStatus, Tag, EventVisibility } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';



let SuperAdmin: { id: string } | null = { id: 'ede32a34-d377-4d4f-8813-5e5473fc93c4' }; // Initialize SuperAdmin variable

async function initializeSuperAdmin() {
    SuperAdmin = await prisma.role.findFirst({
        where: { name: 'SuperAdmin' },
    });
}

// Function to log all sessions in the database

async function logAllSessions() {
    const sessions = await prisma.sessions.findMany({
        include: {
            targetGroups: true,
        },
    });

    if (sessions.length === 0) {
        console.log('⚠️ No sessions found in the database.');
    } else {
        console.log(`📋 All Sessions (${sessions.length}):`);
        sessions.forEach((session, index) => {
            console.log(`\n🔹 Session #${index + 1}`);
            console.log(`🆔 ID: ${session.id}`);
            console.log(`📛 Title: ${session.title}`);
            console.log(`📅 Date: ${session.createdAt}`); // Assuming 'createdAt' is the intended property
            console.log(`🎯 Target Groups: ${session.targetGroups.map(g => g.name).join(', ') || 'None'}`);
        });
    }
}



// Function to seed session attendance for members only
async function seedSessionAttendance(sessionCount: number) {


    await prisma.attendance.deleteMany({}); // Delete existing attendance records
    console.log('🧼 Old session attendance records deleted');

    // Fetch users and groups
    const users = await prisma.user.findMany({
        where: { roleId: { not: SuperAdmin?.id } },
        include: { groups: true }, // Ensure 'groups' relation is included in the query
    });
    const sessions = await prisma.sessions.findMany({
        include: { targetGroups: true }, // Include target groups for session
    });

    if (users.length === 0 || sessions.length === 0) {
        console.error('❌ No valid users or sessions found.');
        process.exit(1);
    }

    console.log(`✅ Found ${sessions.length} sessions`);

    // Loop to create attendance records for each session
    for (const session of sessions) {
        const targetGroups = session.targetGroups;

        // For members-only sessions, we check if users belong to target groups
        const attendees = users.filter((user) =>
            user.groups.some((group) => targetGroups.some((target) => target.id === group.id))
        );

        // Generate attendance records for each attendee
        const attendanceRecords = attendees.map((user) => ({
            id: uuidv4(),
            sessionId: session.id,
            userId: user.id,
            status: AttendanceStatus.PRESENT, // Use the AttendanceStatus enum value
            createdAt: new Date(),
        }));

        const uniqueRecords = Array.from(
            new Map(
                attendanceRecords.map((record) => [`${record.userId}-${record.sessionId}`, record])
            ).values()
        );

        if (uniqueRecords.length > 0) {
            await prisma.attendance.createMany({
                data: uniqueRecords,
                skipDuplicates: true, // safe fallback
            });
            console.log(`✅ Attendance for session "${session.title}" created for ${uniqueRecords.length} attendees`);
        }

    }

    console.log('✅ All session attendance records seeded');
}

// Function to seed event attendance for members-only events
async function seedEventAttendance(eventCount: number) {
    await prisma.attendance.deleteMany({ where: { NOT: { eventId: null } } }); // Delete existing event attendance records
    console.log('🧼 Old event attendance records deleted');

    // Fetch users and groups
    const users = await prisma.user.findMany({
        where: { roleId: { not: SuperAdmin?.id } },
        include: { groups: true }, // Include groups relation for users
    });
    const events = await prisma.events.findMany({
        where: { visibility: EventVisibility.PUBLIC }, // Public events only
        include: { groups: true }, // Include target groups for event
    });

    if (users.length === 0 || events.length === 0) {
        console.error('❌ No valid users or events found.');
        process.exit(1);
    }

    console.log(`✅ Found ${events.length} events`);

    // Loop to create event attendance records for members-only events
    for (const event of events) {
        const targetGroups = event.groups;

        // For members-only events, we check if users belong to target groups
        const attendees = users.filter((user) =>
            user.groups.some((group) => targetGroups.some((target) => target.id === group.id))
        );

        // Generate attendance records for each attendee
        const attendanceRecords = attendees.map((user) => ({
            id: uuidv4(),
            eventId: event.id,
            userId: user.id,
            status: AttendanceStatus.PRESENT, // Use the AttendanceStatus enum value
            createdAt: new Date(),
        }));

        if (attendanceRecords.length > 0) {
            await prisma.attendance.createMany({
                data: attendanceRecords,
            });
            console.log(`✅ Attendance for event "${event.title}" created for ${attendanceRecords.length} attendees`);
        }
    }

    console.log('✅ All event attendance records seeded');
}

// Main function to seed both sessions and events attendance
async function main() {
    await initializeSuperAdmin();

    const sessionCount = 10; // Specify how many sessions to process
    const eventCount = 5;    // Specify how many events to process

    // await logAllSessions();
    await seedSessionAttendance(sessionCount);
    await seedEventAttendance(eventCount);

    console.log('✅ All attendance data seeded');
}


// Run the seeding process
async function SeedAttendance() {
    main()
        .catch((e) => {
            console.error('Error initializing app:', e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default SeedAttendance;
