import {
  PrismaClient,
  TaskStatus,
} from '../src/core/generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seedTasks() {
  // Clean old data
  await prisma.taskParticipation.deleteMany({});
  await prisma.tasks.deleteMany({});
  console.log('🧼 Old tasks and participations deleted');

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
    console.error('❌ Required data missing — users, sessions, or events');
    process.exit(1);
  }

  const now = new Date();

  // Task 1 – CPD Session task
  const task1 = await prisma.tasks.create({
    data: {
      id: uuidv4(),
      title: 'Prepare Hackathon Slides',
      description: 'Create and polish the intro presentation for CPD Hackathon',
      dueDate: new Date('2025-05-28'),
      status: TaskStatus.Pending,
      creatorId: abel.id,
      sessionId: cpdSession.id,
      assignedTo: {
        connect: [{ id: musa.id }],
      },
    },
  });

  await prisma.taskParticipation.create({
    data: {
      id: uuidv4(),
      taskId: task1.id,
      userId: musa.id,
      role: 'Slide Designer',
      score: 80,
      feedback: 'Good structure, could improve visuals',
      feedbackScore: 4,
      createdAt: now,
    },
  });

  // Task 2 – DEV Event task
  const task2 = await prisma.tasks.create({
    data: {
      id: uuidv4(),
      title: 'Set Up Demo Booths',
      description: 'Prepare demo stations for DEV Product Showcase',
      dueDate: new Date('2025-07-08'),
      status: TaskStatus.InProgress,
      creatorId: selam.id,
      eventId: devEvent.id,
      assignedTo: {
        connect: [{ id: hanna.id }],
      },
    },
  });

  await prisma.taskParticipation.create({
    data: {
      id: uuidv4(),
      taskId: task2.id,
      userId: hanna.id,
      role: 'Booth Coordinator',
      score: 90,
      feedback: 'Executed setup efficiently',
      feedbackScore: 5,
      createdAt: now,
    },
  });

  console.log('✅ Tasks and participations seeded');
}

async function SeedTasks() {
  seedTasks()
    .catch((e) => {
      console.error('❌ Seeding tasks failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      prisma.$disconnect();
    });
}

export default SeedTasks;