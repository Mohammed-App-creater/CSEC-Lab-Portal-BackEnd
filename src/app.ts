import { ClubStatus, PrismaClient, UniversityStatus } from './generated/prisma'
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
dotenv.config()


const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')
  


  console.log('✅ Seed complete')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
