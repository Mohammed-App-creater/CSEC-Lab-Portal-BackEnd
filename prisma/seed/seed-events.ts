import {
  PrismaClient,
  Status,
  Tag,
  EventVisibility,
  EventRole
} from '../src/core/generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seedEvents() {
  // Cleanup
  await prisma.eventParticipation.deleteMany({});
  await prisma.eventTimeSlot.deleteMany({});
  await prisma.events.deleteMany({});
  console.log('🧼 Old events, time slots, participations deleted');

  // Fetch required data
  const users = await prisma.user.findMany({ where: { role: { not: 'SuperAdmin' } } });
  const groups = await prisma.groups.findMany();

  const abel = users.find(u => u.firstName === 'Abel');
  const musa = users.find(u => u.firstName === 'Musa');
  if (!musa) {
    console.error('❌ User "Musa" not found');
    process.exit(1);
  }
  const selam = users.find(u => u.firstName === 'Selam');
  const hanna = users.find(u => u.firstName === 'Hanna');
  if (!hanna) {
    console.error('❌ User "Hanna" not found');
    process.exit(1);
  }

  const cpdGroup = groups.find(g => g.name.includes('CPD'));
  const devGroup = groups.find(g => g.name.includes('DEV'));

  if (!abel || !selam || !cpdGroup || !devGroup) {
    console.error('❌ Required users or groups not found');
    process.exit(1);
  }

  const now = new Date();

  // 🟢 Event 1: CPD Hackathon
  const event1 = await prisma.events.create({
    data: {
      id: uuidv4(),
      title: 'CPD Hackathon 2025',
      description: 'Annual CPD hackathon for all devs',
      startDate: new Date('2025-06-01'),
      startTime: new Date('2025-06-01T10:00:00'),
      endTime: new Date('2025-06-01T20:00:00'),
      location: 'Tech Park Auditorium',
      tags: [Tag.CPD],
      visibility: EventVisibility.PUBLIC,
      status: Status.Planned,
      creatorId: abel.id,
      groups: {
        connect: [{ id: cpdGroup.id }],
      },
    },
  });

  await prisma.eventTimeSlot.create({
    data: {
      id: uuidv4(),
      eventId: event1.id,
      startTime: new Date('2025-06-01T10:00:00'),
      endTime: new Date('2025-06-01T20:00:00'),
    },
  });

  await prisma.eventParticipation.createMany({
    data: [
      {
        id: uuidv4(),
        EventId: event1.id,
        userId: abel.id,
        role: EventRole.ORGANIZER,
        score: 100,
        feedback: 'Well-organized event',
        feedbackScore: 5,
        createdAt: now,
      },
      {
        id: uuidv4(),
        EventId: event1.id,
        userId: musa.id,
        role: EventRole.PARTICIPANT,
        score: 90,
        feedback: 'Awesome hackathon',
        feedbackScore: 5,
        createdAt: now,
      },
    ],
  });

  // 🟢 Event 2: DEV Product Showcase
  const event2 = await prisma.events.create({
    data: {
      id: uuidv4(),
      title: 'DEV Product Showcase',
      description: 'Teams demo their final project builds',
      startDate: new Date('2025-07-10'),
      startTime: new Date('2025-07-10T14:00:00'),
      endTime: new Date('2025-07-10T17:30:00'),
      location: 'Innovation Hub Stage A',
      tags: [Tag.DEV],
      visibility: EventVisibility.MEMBERS_ONLY,
      status: Status.Ongoing,
      creatorId: selam.id,
      groups: {
        connect: [{ id: devGroup.id }],
      },
    },
  });

  await prisma.eventTimeSlot.create({
    data: {
      id: uuidv4(),
      eventId: event2.id,
      startTime: new Date('2025-07-10T14:00:00'),
      endTime: new Date('2025-07-10T17:30:00'),
    },
  });

  await prisma.eventParticipation.createMany({
    data: [
      {
        id: uuidv4(),
        EventId: event2.id,
        userId: selam.id,
        role: EventRole.SPEAKER,
        score: 100,
        feedback: 'Excellent keynote',
        feedbackScore: 5,
        createdAt: now,
      },
      {
        id: uuidv4(),
        EventId: event2.id,
        userId: hanna.id,
        role: EventRole.PARTICIPANT,
        score: 88,
        feedback: 'Very informative sessions',
        feedbackScore: 4,
        createdAt: now,
      },
    ],
  });

  console.log('✅ Events, time slots, and participations seeded');
}


async function SeedEvents() {
  seedEvents()
    .catch((e) => {
      console.error('❌ Event seeding failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      prisma.$disconnect();
    });
}

export default SeedEvents;
