import { PrismaClient } from '@prisma/client';



const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['info', 'error'],
    }

    );

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

