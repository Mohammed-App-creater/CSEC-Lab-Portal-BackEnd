
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  gender: 'gender',
  email: 'email',
  password: 'password',
  phone_number: 'phone_number',
  telegramUserName: 'telegramUserName',
  bio: 'bio',
  berthDate: 'berthDate',
  profileImageUrl: 'profileImageUrl',
  clubStatus: 'clubStatus',
  specialty: 'specialty',
  cvUrl: 'cvUrl',
  lastSeen: 'lastSeen',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  DivisionId: 'DivisionId',
  UserSettingId: 'UserSettingId',
  DivisionHeadID: 'DivisionHeadID',
  AttendanceSummaryId: 'AttendanceSummaryId'
};

exports.Prisma.UniversityInfoScalarFieldEnum = {
  id: 'id',
  currentYear: 'currentYear',
  expectedGraduationYear: 'expectedGraduationYear',
  major: 'major',
  universityId: 'universityId',
  status: 'status',
  department: 'department',
  userId: 'userId'
};

exports.Prisma.UserSettingScalarFieldEnum = {
  id: 'id',
  theme: 'theme',
  phonePublic: 'phonePublic',
  authUpdateCalendar: 'authUpdateCalendar',
  userId: 'userId'
};

exports.Prisma.DivisionsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  imageUrl: 'imageUrl',
  establishedAt: 'establishedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  currentHeadID: 'currentHeadID'
};

exports.Prisma.GroupsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  divisionId: 'divisionId'
};

exports.Prisma.SocialLinkScalarFieldEnum = {
  id: 'id',
  socialLinkName: 'socialLinkName',
  socialLinkUrl: 'socialLinkUrl',
  userId: 'userId',
  DivisionId: 'DivisionId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EventTimeSlotScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  startTime: 'startTime',
  endTime: 'endTime'
};

exports.Prisma.SessionTimeSlotScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  startTime: 'startTime',
  endTime: 'endTime'
};

exports.Prisma.EventsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  startDate: 'startDate',
  startTime: 'startTime',
  endTime: 'endTime',
  location: 'location',
  tags: 'tags',
  visibility: 'visibility',
  state: 'state',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  creatorId: 'creatorId'
};

exports.Prisma.SessionsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  startMonth: 'startMonth',
  endTMonth: 'endTMonth',
  location: 'location',
  tags: 'tags',
  state: 'state',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  creatorId: 'creatorId'
};

exports.Prisma.TasksScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  dueDate: 'dueDate',
  status: 'status',
  completedNotes: 'completedNotes',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  creatorId: 'creatorId',
  eventId: 'eventId',
  sessionId: 'sessionId'
};

exports.Prisma.EventParticipationScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  userId: 'userId',
  role: 'role',
  score: 'score',
  feedback: 'feedback',
  feedbackScore: 'feedbackScore',
  createdAt: 'createdAt'
};

exports.Prisma.SessionParticipationScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  userId: 'userId',
  role: 'role',
  score: 'score',
  feedback: 'feedback',
  feedbackScore: 'feedbackScore',
  createdAt: 'createdAt'
};

exports.Prisma.TaskParticipationScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  userId: 'userId',
  role: 'role',
  score: 'score',
  feedback: 'feedback',
  feedbackScore: 'feedbackScore',
  createdAt: 'createdAt'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  sessionId: 'sessionId',
  eventId: 'eventId',
  status: 'status',
  timestamp: 'timestamp',
  headsUpId: 'headsUpId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AttendanceSummaryScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  totalEvents: 'totalEvents',
  totalSessions: 'totalSessions',
  totalTasks: 'totalTasks',
  totalAttendance: 'totalAttendance',
  totalHeadsUps: 'totalHeadsUps',
  totalPresent: 'totalPresent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HeadsUpScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  body: 'body',
  sentAt: 'sentAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  type: 'type',
  isRead: 'isRead',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AnnouncementScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  visibility: 'visibility',
  Tags: 'Tags',
  announcementType: 'announcementType',
  sourceId: 'sourceId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FileCategoriesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FileScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  type: 'type',
  tag: 'tag',
  size: 'size',
  fileUrl: 'fileUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  categoryId: 'categoryId'
};

exports.Prisma.BadgesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  imageUrl: 'imageUrl',
  criteria: 'criteria',
  points: 'points',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  key: 'key',
  label: 'label'
};

exports.Prisma.RolePermissionScalarFieldEnum = {
  id: 'id',
  role: 'role',
  permissionId: 'permissionId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Gender = exports.$Enums.Gender = {
  Male: 'Male',
  Female: 'Female'
};

exports.ClubStatus = exports.$Enums.ClubStatus = {
  Active: 'Active',
  Alumni: 'Alumni',
  Banned: 'Banned'
};

exports.RoleType = exports.$Enums.RoleType = {
  SuperAdmin: 'SuperAdmin',
  President: 'President',
  VicePresident: 'VicePresident',
  DivisionHead: 'DivisionHead',
  Coordinator: 'Coordinator',
  Member: 'Member'
};

exports.UniversityStatus = exports.$Enums.UniversityStatus = {
  onCampus: 'onCampus',
  offCampus: 'offCampus',
  withdraw: 'withdraw',
  dropOut: 'dropOut'
};

exports.Theme = exports.$Enums.Theme = {
  Light: 'Light',
  Dark: 'Dark',
  System: 'System'
};

exports.EventVisibility = exports.$Enums.EventVisibility = {
  PUBLIC: 'PUBLIC',
  MEMBERS_ONLY: 'MEMBERS_ONLY'
};

exports.state = exports.$Enums.state = {
  Planned: 'Planned',
  Ongoing: 'Ongoing',
  Completed: 'Completed',
  Canceled: 'Canceled',
  Postponed: 'Postponed'
};

exports.Tag = exports.$Enums.Tag = {
  CPD: 'CPD',
  CBD: 'CBD',
  SEC: 'SEC',
  DEV: 'DEV',
  DS: 'DS',
  ENTIRE: 'ENTIRE'
};

exports.TaskStatus = exports.$Enums.TaskStatus = {
  Pending: 'Pending',
  InProgress: 'InProgress',
  Completed: 'Completed',
  Rejected: 'Rejected',
  CANCELED: 'CANCELED'
};

exports.EventRole = exports.$Enums.EventRole = {
  ORGANIZER: 'ORGANIZER',
  PARTICIPANT: 'PARTICIPANT',
  SPEAKER: 'SPEAKER',
  COORDINATOR: 'COORDINATOR',
  HOST: 'HOST',
  MENTOR: 'MENTOR'
};

exports.SessionRole = exports.$Enums.SessionRole = {
  Speaker: 'Speaker',
  Coordinator: 'Coordinator',
  Host: 'Host',
  Organizer: 'Organizer',
  Mentor: 'Mentor'
};

exports.AttendanceStatus = exports.$Enums.AttendanceStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  EXCUSED: 'EXCUSED',
  UNMARKED: 'UNMARKED'
};

exports.HeadsUpType = exports.$Enums.HeadsUpType = {
  SICK: 'SICK',
  TRAVEL: 'TRAVEL',
  PERSONAL: 'PERSONAL',
  OTHER: 'OTHER'
};

exports.AnnouncementVisibility = exports.$Enums.AnnouncementVisibility = {
  PUBLIC: 'PUBLIC',
  Division_ONLY: 'Division_ONLY',
  GROUP_ONLY: 'GROUP_ONLY'
};

exports.AnnouncementType = exports.$Enums.AnnouncementType = {
  EVENT: 'EVENT',
  SESSION: 'SESSION',
  TASK: 'TASK',
  GENERAL: 'GENERAL'
};

exports.Prisma.ModelName = {
  User: 'User',
  UniversityInfo: 'UniversityInfo',
  UserSetting: 'UserSetting',
  Divisions: 'Divisions',
  Groups: 'Groups',
  socialLink: 'socialLink',
  EventTimeSlot: 'EventTimeSlot',
  SessionTimeSlot: 'SessionTimeSlot',
  Events: 'Events',
  Sessions: 'Sessions',
  Tasks: 'Tasks',
  EventParticipation: 'EventParticipation',
  SessionParticipation: 'SessionParticipation',
  TaskParticipation: 'TaskParticipation',
  Attendance: 'Attendance',
  AttendanceSummary: 'AttendanceSummary',
  HeadsUp: 'HeadsUp',
  Notification: 'Notification',
  Announcement: 'Announcement',
  FileCategories: 'FileCategories',
  File: 'File',
  Badges: 'Badges',
  Permission: 'Permission',
  RolePermission: 'RolePermission'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
