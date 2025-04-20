import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Replace with an actual user ID from your seeded users or database
    const userId = 'f1b1e1d8-c033-4be9-9ee3-0b24952d6be3';


    await prisma.resourceLink.createMany({
        data: [
            {
                resourceLinkName: 'Official Prisma Docs',
                resourceLinkUrl: 'https://www.prisma.io/docs',
                userId: userId,
            },
            {
                resourceLinkName: 'Clean Architecture Overview',
                resourceLinkUrl: 'https://blog.cleancoder.com/clean-code-architecture',
                userId: userId,
            },
            {
                userId,
                resourceLinkName: 'TypeScript Handbook',
                resourceLinkUrl: 'https://www.typescriptlang.org/docs/handbook/intro.html',
            },
        ],
    });

    console.log('✅ ResourceLinks seeded!');
}

const seedResourceLinks = async () => {
    try {
        await main();
    } catch (e) {
        console.error(e);
    }
}



export default seedResourceLinks;
