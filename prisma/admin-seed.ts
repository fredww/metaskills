import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedAdminUser() {
  console.log('🔑 Setting up admin user...')

  // Get the first user (you) and make them admin
  const user = await prisma.user.findFirst()

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' }
    })
    console.log(`✅ User ${user.email} is now an ADMIN`)
  } else {
    console.log('⚠️  No users found. Please sign up first, then run this script again.')
  }

  console.log('✅ Admin setup complete!')
}

async function main() {
  await seedAdminUser()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
