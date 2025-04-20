-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "ClubStatus" AS ENUM ('Active', 'Alumni', 'Banned');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('SuperAdmin', 'President', 'VicePresident', 'DivisionHead', 'Coordinator', 'Member');

-- CreateEnum
CREATE TYPE "UniversityStatus" AS ENUM ('onCampus', 'offCampus', 'withdraw', 'dropOut');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('Light', 'Dark', 'System');

-- CreateEnum
CREATE TYPE "EventVisibility" AS ENUM ('PUBLIC', 'MEMBERS_ONLY');

-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('CPD', 'CBD', 'SEC', 'DEV', 'DS', 'ENTIRE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Planned', 'Ongoing', 'Completed', 'Canceled', 'Postponed');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Pending', 'InProgress', 'Completed', 'Rejected', 'CANCELED');

-- CreateEnum
CREATE TYPE "SessionRole" AS ENUM ('Speaker', 'Coordinator', 'Host', 'Organizer', 'Mentor');

-- CreateEnum
CREATE TYPE "EventRole" AS ENUM ('ORGANIZER', 'PARTICIPANT', 'SPEAKER', 'COORDINATOR', 'HOST', 'MENTOR');

-- CreateEnum
CREATE TYPE "HeadsUpType" AS ENUM ('SICK', 'TRAVEL', 'PERSONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'EXCUSED', 'UNMARKED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('Announcement', 'Task', 'Session', 'Event', 'Reminder', 'Alert', 'Update');

-- CreateEnum
CREATE TYPE "AnnouncementVisibility" AS ENUM ('PUBLIC', 'Division_ONLY', 'GROUP_ONLY');

-- CreateEnum
CREATE TYPE "AnnouncementType" AS ENUM ('EVENT', 'SESSION', 'TASK', 'GENERAL');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "gender" "Gender" NOT NULL DEFAULT 'Male',
    "email" TEXT,
    "password" TEXT,
    "phone_number" TEXT,
    "telegramUserName" TEXT,
    "bio" TEXT,
    "berthDate" TIMESTAMP(3),
    "profileImageUrl" TEXT,
    "clubStatus" "ClubStatus",
    "specialty" TEXT,
    "cvUrl" TEXT,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "role" "RoleType" NOT NULL DEFAULT 'Member',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "DivisionId" UUID,
    "UserSettingId" UUID,
    "DivisionHeadID" UUID,
    "AttendanceSummaryId" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityInfo" (
    "id" TEXT NOT NULL,
    "currentYear" INTEGER,
    "expectedGraduationYear" INTEGER,
    "major" TEXT,
    "universityId" TEXT,
    "status" "UniversityStatus" NOT NULL,
    "department" TEXT,
    "userId" UUID,

    CONSTRAINT "UniversityInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSetting" (
    "id" UUID NOT NULL,
    "theme" "Theme" NOT NULL DEFAULT 'System',
    "phonePublic" BOOLEAN NOT NULL DEFAULT false,
    "authUpdateCalendar" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Divisions" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "establishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentHeadID" UUID,

    CONSTRAINT "Divisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "divisionId" UUID,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialLink" (
    "id" UUID NOT NULL,
    "socialLinkName" TEXT NOT NULL,
    "socialLinkUrl" TEXT NOT NULL,
    "userId" UUID,
    "DivisionId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "socialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTimeSlot" (
    "id" UUID NOT NULL,
    "eventId" UUID,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventTimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionTimeSlot" (
    "id" UUID NOT NULL,
    "sessionId" UUID,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionTimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "tags" "Tag"[],
    "visibility" "EventVisibility" NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" UUID NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startMonth" TIMESTAMP(3) NOT NULL,
    "endTMonth" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "tags" "Tag"[],
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" UUID NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'Pending',
    "completedNotes" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" UUID NOT NULL,
    "eventId" UUID,
    "sessionId" UUID,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipation" (
    "id" UUID NOT NULL,
    "EventId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "EventRole" NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "feedback" TEXT,
    "feedbackScore" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionParticipation" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "SessionRole" NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "feedback" TEXT,
    "feedbackScore" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskParticipation" (
    "id" UUID NOT NULL,
    "taskId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "feedback" TEXT,
    "feedbackScore" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "sessionId" UUID,
    "eventId" UUID,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'UNMARKED',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "headsUpId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceSummary" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "totalEvents" INTEGER NOT NULL,
    "totalSessions" INTEGER NOT NULL,
    "totalTasks" INTEGER NOT NULL,
    "totalAttendance" INTEGER NOT NULL,
    "totalHeadsUps" INTEGER NOT NULL,
    "totalPresent" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttendanceSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeadsUp" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "HeadsUpType" NOT NULL,
    "body" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeadsUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "visibility" "AnnouncementVisibility" NOT NULL,
    "Tags" "Tag"[],
    "announcementType" "AnnouncementType" NOT NULL,
    "sourceId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileCategories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "tag" TEXT,
    "size" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" UUID,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badges" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "criteria" TEXT,
    "points" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" SERIAL NOT NULL,
    "role" "RoleType" NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SessionDivision" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_SessionDivision_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserGroups" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_UserGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SessionTargetGroups" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_SessionTargetGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EventTargetGroups" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_EventTargetGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AssignedTasks" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_AssignedTasks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserNotification" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_UserNotification_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserAnnouncement" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_UserAnnouncement_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserBadges" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_UserBadges_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramUserName_key" ON "User"("telegramUserName");

-- CreateIndex
CREATE UNIQUE INDEX "User_DivisionId_key" ON "User"("DivisionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_UserSettingId_key" ON "User"("UserSettingId");

-- CreateIndex
CREATE UNIQUE INDEX "User_DivisionHeadID_key" ON "User"("DivisionHeadID");

-- CreateIndex
CREATE UNIQUE INDEX "User_AttendanceSummaryId_key" ON "User"("AttendanceSummaryId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_clubStatus_idx" ON "User"("clubStatus");

-- CreateIndex
CREATE INDEX "User_DivisionId_idx" ON "User"("DivisionId");

-- CreateIndex
CREATE INDEX "User_DivisionHeadID_idx" ON "User"("DivisionHeadID");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_phone_number_idx" ON "User"("phone_number");

-- CreateIndex
CREATE INDEX "User_telegramUserName_idx" ON "User"("telegramUserName");

-- CreateIndex
CREATE INDEX "User_lastSeen_idx" ON "User"("lastSeen");

-- CreateIndex
CREATE UNIQUE INDEX "UniversityInfo_universityId_key" ON "UniversityInfo"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "UniversityInfo_userId_key" ON "UniversityInfo"("userId");

-- CreateIndex
CREATE INDEX "UniversityInfo_status_idx" ON "UniversityInfo"("status");

-- CreateIndex
CREATE UNIQUE INDEX "UserSetting_userId_key" ON "UserSetting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Divisions_currentHeadID_key" ON "Divisions"("currentHeadID");

-- CreateIndex
CREATE INDEX "Divisions_name_idx" ON "Divisions"("name");

-- CreateIndex
CREATE INDEX "Groups_divisionId_idx" ON "Groups"("divisionId");

-- CreateIndex
CREATE INDEX "socialLink_DivisionId_idx" ON "socialLink"("DivisionId");

-- CreateIndex
CREATE INDEX "socialLink_userId_idx" ON "socialLink"("userId");

-- CreateIndex
CREATE INDEX "EventTimeSlot_eventId_idx" ON "EventTimeSlot"("eventId");

-- CreateIndex
CREATE INDEX "SessionTimeSlot_sessionId_idx" ON "SessionTimeSlot"("sessionId");

-- CreateIndex
CREATE INDEX "Events_status_idx" ON "Events"("status");

-- CreateIndex
CREATE INDEX "Events_visibility_idx" ON "Events"("visibility");

-- CreateIndex
CREATE INDEX "Events_startDate_idx" ON "Events"("startDate");

-- CreateIndex
CREATE INDEX "Sessions_status_idx" ON "Sessions"("status");

-- CreateIndex
CREATE INDEX "Sessions_startMonth_idx" ON "Sessions"("startMonth");

-- CreateIndex
CREATE INDEX "Tasks_status_idx" ON "Tasks"("status");

-- CreateIndex
CREATE INDEX "Tasks_dueDate_idx" ON "Tasks"("dueDate");

-- CreateIndex
CREATE INDEX "EventParticipation_userId_idx" ON "EventParticipation"("userId");

-- CreateIndex
CREATE INDEX "EventParticipation_EventId_idx" ON "EventParticipation"("EventId");

-- CreateIndex
CREATE INDEX "EventParticipation_EventId_userId_idx" ON "EventParticipation"("EventId", "userId");

-- CreateIndex
CREATE INDEX "SessionParticipation_role_idx" ON "SessionParticipation"("role");

-- CreateIndex
CREATE INDEX "SessionParticipation_userId_idx" ON "SessionParticipation"("userId");

-- CreateIndex
CREATE INDEX "SessionParticipation_sessionId_idx" ON "SessionParticipation"("sessionId");

-- CreateIndex
CREATE INDEX "SessionParticipation_sessionId_userId_idx" ON "SessionParticipation"("sessionId", "userId");

-- CreateIndex
CREATE INDEX "TaskParticipation_userId_idx" ON "TaskParticipation"("userId");

-- CreateIndex
CREATE INDEX "TaskParticipation_taskId_idx" ON "TaskParticipation"("taskId");

-- CreateIndex
CREATE INDEX "TaskParticipation_userId_taskId_idx" ON "TaskParticipation"("userId", "taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_headsUpId_key" ON "Attendance"("headsUpId");

-- CreateIndex
CREATE INDEX "Attendance_userId_idx" ON "Attendance"("userId");

-- CreateIndex
CREATE INDEX "Attendance_sessionId_idx" ON "Attendance"("sessionId");

-- CreateIndex
CREATE INDEX "Attendance_eventId_idx" ON "Attendance"("eventId");

-- CreateIndex
CREATE INDEX "Attendance_headsUpId_idx" ON "Attendance"("headsUpId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_userId_sessionId_key" ON "Attendance"("userId", "sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_userId_eventId_key" ON "Attendance"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceSummary_userId_key" ON "AttendanceSummary"("userId");

-- CreateIndex
CREATE INDEX "AttendanceSummary_userId_idx" ON "AttendanceSummary"("userId");

-- CreateIndex
CREATE INDEX "HeadsUp_type_idx" ON "HeadsUp"("type");

-- CreateIndex
CREATE INDEX "HeadsUp_userId_idx" ON "HeadsUp"("userId");

-- CreateIndex
CREATE INDEX "Notification_type_idx" ON "Notification"("type");

-- CreateIndex
CREATE INDEX "Announcement_visibility_idx" ON "Announcement"("visibility");

-- CreateIndex
CREATE INDEX "Announcement_announcementType_idx" ON "Announcement"("announcementType");

-- CreateIndex
CREATE INDEX "Announcement_sourceId_idx" ON "Announcement"("sourceId");

-- CreateIndex
CREATE INDEX "FileCategories_name_idx" ON "FileCategories"("name");

-- CreateIndex
CREATE INDEX "File_type_idx" ON "File"("type");

-- CreateIndex
CREATE INDEX "File_tag_idx" ON "File"("tag");

-- CreateIndex
CREATE INDEX "File_categoryId_idx" ON "File"("categoryId");

-- CreateIndex
CREATE INDEX "Badges_name_idx" ON "Badges"("name");

-- CreateIndex
CREATE INDEX "Badges_points_idx" ON "Badges"("points");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_key_key" ON "Permission"("key");

-- CreateIndex
CREATE INDEX "Permission_key_idx" ON "Permission"("key");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_role_permissionId_key" ON "RolePermission"("role", "permissionId");

-- CreateIndex
CREATE INDEX "_SessionDivision_B_index" ON "_SessionDivision"("B");

-- CreateIndex
CREATE INDEX "_UserGroups_B_index" ON "_UserGroups"("B");

-- CreateIndex
CREATE INDEX "_SessionTargetGroups_B_index" ON "_SessionTargetGroups"("B");

-- CreateIndex
CREATE INDEX "_EventTargetGroups_B_index" ON "_EventTargetGroups"("B");

-- CreateIndex
CREATE INDEX "_AssignedTasks_B_index" ON "_AssignedTasks"("B");

-- CreateIndex
CREATE INDEX "_UserNotification_B_index" ON "_UserNotification"("B");

-- CreateIndex
CREATE INDEX "_UserAnnouncement_B_index" ON "_UserAnnouncement"("B");

-- CreateIndex
CREATE INDEX "_UserBadges_B_index" ON "_UserBadges"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_DivisionId_fkey" FOREIGN KEY ("DivisionId") REFERENCES "Divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityInfo" ADD CONSTRAINT "UniversityInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSetting" ADD CONSTRAINT "UserSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Divisions" ADD CONSTRAINT "Divisions_currentHeadID_fkey" FOREIGN KEY ("currentHeadID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socialLink" ADD CONSTRAINT "socialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socialLink" ADD CONSTRAINT "socialLink_DivisionId_fkey" FOREIGN KEY ("DivisionId") REFERENCES "Divisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTimeSlot" ADD CONSTRAINT "EventTimeSlot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionTimeSlot" ADD CONSTRAINT "SessionTimeSlot_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipation" ADD CONSTRAINT "EventParticipation_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipation" ADD CONSTRAINT "EventParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionParticipation" ADD CONSTRAINT "SessionParticipation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionParticipation" ADD CONSTRAINT "SessionParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipation" ADD CONSTRAINT "TaskParticipation_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipation" ADD CONSTRAINT "TaskParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_headsUpId_fkey" FOREIGN KEY ("headsUpId") REFERENCES "HeadsUp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceSummary" ADD CONSTRAINT "AttendanceSummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeadsUp" ADD CONSTRAINT "HeadsUp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FileCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionDivision" ADD CONSTRAINT "_SessionDivision_A_fkey" FOREIGN KEY ("A") REFERENCES "Divisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionDivision" ADD CONSTRAINT "_SessionDivision_B_fkey" FOREIGN KEY ("B") REFERENCES "Sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionTargetGroups" ADD CONSTRAINT "_SessionTargetGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SessionTargetGroups" ADD CONSTRAINT "_SessionTargetGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "Sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTargetGroups" ADD CONSTRAINT "_EventTargetGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTargetGroups" ADD CONSTRAINT "_EventTargetGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignedTasks" ADD CONSTRAINT "_AssignedTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignedTasks" ADD CONSTRAINT "_AssignedTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserNotification" ADD CONSTRAINT "_UserNotification_A_fkey" FOREIGN KEY ("A") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserNotification" ADD CONSTRAINT "_UserNotification_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAnnouncement" ADD CONSTRAINT "_UserAnnouncement_A_fkey" FOREIGN KEY ("A") REFERENCES "Announcement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAnnouncement" ADD CONSTRAINT "_UserAnnouncement_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBadges" ADD CONSTRAINT "_UserBadges_A_fkey" FOREIGN KEY ("A") REFERENCES "Badges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBadges" ADD CONSTRAINT "_UserBadges_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
