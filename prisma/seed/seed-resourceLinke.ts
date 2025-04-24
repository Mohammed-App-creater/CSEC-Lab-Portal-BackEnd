import { prisma } from '@/shared/utils/prisma';
import { faker } from '@faker-js/faker'; // Import faker



async function main() {
    // Fetch some users dynamically
    const users = await prisma.user.findMany();

    if (users.length === 0) {
        console.error('❌ No users found. Please seed users first.');
        process.exit(1);
    }

    // Loop through users and create fake resource links for each
    for (const user of users) {
        const resourceLinks = [
            {
                resourceLinkName: faker.company.catchPhrase(), // Random name
                resourceLinkUrl: faker.internet.url(), // Random URL
                userId: user.id,
            },
            {
                resourceLinkName: faker.hacker.phrase(), // Random name
                resourceLinkUrl: faker.internet.url(), // Random URL
                userId: user.id,
            },
            {
                resourceLinkName: faker.lorem.words(12), // Random name
                resourceLinkUrl: faker.internet.url(), // Random URL
                userId: user.id,
            },
        ];

        // Seed resource links for each user
        await prisma.resourceLink.createMany({
            data: resourceLinks,
        });

        console.log(`✅ ResourceLinks seeded for user ${user.firstName} ${user.lastName}`);
    }
}

const seedResourceLinks = async () => {
    try {
        await main();
    } catch (e) {
        console.error(e);
    }
};

seedResourceLinks().finally(async () => {
    await prisma.$disconnect();
});

export default seedResourceLinks;
