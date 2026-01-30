import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'test@gmail.com'
  const password = 'admin123' // 你可以修改这个密码

  console.log(`🔑 Setting password for ${email}...`)

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    console.log('❌ User not found')
    process.exit(1)
  }

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword }
  })

  console.log(`✅ Password set successfully!`)
  console.log(`\n登录信息:`)
  console.log(`邮箱: ${email}`)
  console.log(`密码: ${password}`)
  console.log(`\n访问: http://localhost:3001/login`)
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
