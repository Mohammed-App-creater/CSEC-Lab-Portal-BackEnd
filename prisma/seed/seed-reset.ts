import { prisma } from '@/shared/utils/prisma';



async function Reset() {
    await prisma.notification.deleteMany();
    await prisma.announcement.deleteMany();
    await prisma.headsUp.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.attendanceSummary.deleteMany();
    await prisma.taskParticipation.deleteMany();
    await prisma.sessionParticipation.deleteMany();
    await prisma.eventParticipation.deleteMany();
    await prisma.tasks.deleteMany();
    await prisma.sessionTimeSlot.deleteMany();
    await prisma.sessions.deleteMany();
    await prisma.events.deleteMany();
    await prisma.resourceLink.deleteMany();
    await prisma.socialLink.deleteMany();
    await prisma.groups.deleteMany();
    await prisma.divisions.deleteMany();
    await prisma.userSetting.deleteMany();
    await prisma.universityInfo.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    await prisma.fileCategories.deleteMany();
    await prisma.file.deleteMany();
    await prisma.rolePermission.deleteMany();
    await prisma.permission.deleteMany();

}


async function SeedReset() {
    try {
        await Reset();
        console.log('✅ Database reset complete.');
        console.log('🌱 Starting master seeding...');
    } catch (e) {
        console.error('❌ Master seed failed:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

export default SeedReset;