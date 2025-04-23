import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createSuperAdmin() {
    // Check if SuperAdmin role exists
    let superAdminRole = await prisma.role.findUnique({
        where: { name: 'SuperAdmin' },
    });

    if (!superAdminRole) {
        superAdminRole = await prisma.role.create({
            data: {
                id: uuidv4(),
                name: 'SuperAdmin',
                // Removed 'type' property as it is not part of RoleCreateInput
            },
        });
        console.log('✅ SuperAdmin role created');
    } else {
        console.log('⚠️ SuperAdmin role already exists');
    }

    // Check if a user with the SuperAdmin role already exists
    const existingAdmin = await prisma.user.findFirst({
        where: { roleId: superAdminRole.id },
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('supersecurepassword', 10);

        await prisma.user.create({
            data: {
                id: uuidv4(),
                firstName: 'Super Admin',
                middleName: 'Super Admin',
                lastName: 'Super Admin',
                email: 'superadmin@example.com',
                password: hashedPassword,
                roleId: superAdminRole.id,
                phone_number: '0000000000',
                clubStatus: 'Active',
                lastSeen: new Date(),
            },
        });

        console.log('✅ SuperAdmin user created');
    } else {
        console.log('⚠️ SuperAdmin user already exists');
    }
}

// Run it
createSuperAdmin()
    .catch((err) => {
        console.error('❌ Error creating SuperAdmin:', err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export default createSuperAdmin;
