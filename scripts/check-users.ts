import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      accounts: {
        select: {
          provider: true,
          providerAccountId: true
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  })

  console.log('📋 All Users:')
  console.log('================')
  users.forEach((user) => {
    const i = users.indexOf(user) + 1
    console.log(`\n${i}. ${user.name || 'No name'} (${user.email})`)
    console.log(`   Role: ${user.role}`)
    console.log(`   Created: ${user.createdAt.toISOString()}`)
    console.log(`   Auth Providers: ${user.accounts.map(a => a.provider).join(', ') || 'None'}`)
  })

  console.log('\n================')
  console.log(`Total users: ${users.length}`)
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
