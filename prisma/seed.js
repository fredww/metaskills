const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@metaskills.ai' },
    update: {},
    create: {
      email: 'admin@metaskills.ai',
      name: 'Admin User',
      password: hashedPassword,
    }
  })
  console.log('✅ Admin user created')

  // Create meta-skills (sample of 8 skills for now)
  const skills = [
    {
      name: 'Learning to Learn',
      domain: 'COGNITIVE',
      description: 'The ability to learn new things quickly and effectively.',
      benefits: ['Faster skill acquisition', 'Adaptability', 'Growth mindset'],
      tips: ['Focus on principles', 'Teach others', 'Connect knowledge'],
      difficulty: 'INTERMEDIATE'
    },
    {
      name: 'Critical Thinking',
      domain: 'COGNITIVE',
      description: 'Objective analysis and evaluation to form judgments.',
      benefits: ['Better decisions', 'Reduced bias', 'Problem-solving'],
      tips: ['Question assumptions', 'Seek evidence', 'Use frameworks'],
      difficulty: 'ADVANCED'
    },
    {
      name: 'Emotional Intelligence',
      domain: 'INTERPERSONAL',
      description: 'Recognize and understand emotions in yourself and others.',
      benefits: ['Better relationships', 'Conflict resolution', 'Leadership'],
      tips: ['Name emotions', 'Practice active listening', 'Pause before reacting'],
      difficulty: 'INTERMEDIATE'
    },
    {
      name: 'Communication',
      domain: 'INTERPERSONAL',
      description: 'Effective exchange of information and feelings.',
      benefits: ['Clearer understanding', 'Stronger relationships', 'Success'],
      tips: ['Listen to understand', 'Match audience', 'Use stories'],
      difficulty: 'BEGINNER'
    },
    {
      name: 'Empathy',
      domain: 'INTERPERSONAL',
      description: 'Understand and feel what another person is experiencing.',
      benefits: ['Deeper connections', 'Reduced conflict', 'Collaboration'],
      tips: ['Cultivate curiosity', 'Suspend judgment', 'Practice perspective-taking'],
      difficulty: 'INTERMEDIATE'
    },
    {
      name: 'Self-Awareness',
      domain: 'SELF',
      description: 'Conscious knowledge of your character, feelings, motives, and desires.',
      benefits: ['Better life choices', 'Authentic living', 'Emotional regulation'],
      tips: ['Reflect regularly', 'Journal for discovery', 'Seek honest feedback'],
      difficulty: 'BEGINNER'
    },
    {
      name: 'Mindfulness',
      domain: 'SELF',
      description: 'Present-moment awareness without judgment.',
      benefits: ['Reduced stress', 'Improved focus', 'Life satisfaction'],
      tips: ['Start with 5 min daily', 'Focus on breath', 'Be patient'],
      difficulty: 'BEGINNER'
    },
    {
      name: 'Resilience',
      domain: 'SELF',
      description: 'Recover quickly from difficulties and adversity.',
      benefits: ['Bounce back from setbacks', 'Stress tolerance', 'Long-term success'],
      tips: ['Reframe setbacks', 'Build support network', 'Practice self-compassion'],
      difficulty: 'INTERMEDIATE'
    }
  ]

  console.log('📝 Creating meta-skills...')
  for (const skill of skills) {
    await prisma.metaSkill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill
    })
  }
  console.log(`✅ Created ${skills.length} meta-skills`)

  // Create practices (sample of 10)
  const practices = [
    {
      name: 'Morning Check-In',
      description: 'Start each day with 5 minutes of self-awareness.',
      duration: 5,
      skillName: 'Self-Awareness',
      emotion: 'CALM',
      instructions: ['Sit quietly', 'Notice physical state', 'Identify emotions', 'Set intention']
    },
    {
      name: 'Active Listening',
      description: 'Listen for 5 minutes without interrupting or planning response.',
      duration: 5,
      skillName: 'Communication',
      emotion: 'CALM',
      instructions: ['Find a partner', 'Set timer', 'Listen fully', 'Reflect on what you noticed']
    },
    {
      name: 'Body Scan',
      description: '10-minute systematic awareness of body sensations.',
      duration: 10,
      skillName: 'Mindfulness',
      emotion: 'CALM',
      instructions: ['Sit comfortably', 'Close eyes', 'Move attention from head to toe', 'Notice sensations']
    },
    {
      name: 'The 5 Whys',
      description: 'Ask "why" five times to find root causes.',
      duration: 10,
      skillName: 'Critical Thinking',
      emotion: 'CALM',
      instructions: ['State problem', 'Ask why repeatedly', 'Reach root cause', 'Address it']
    },
    {
      name: 'Information Diet Audit',
      description: 'Review and curate what information you consume.',
      duration: 15,
      skillName: 'Attention Management',
      emotion: 'REFLECTIVE',
      instructions: ['List all information sources', 'Rate by value', 'Identify low-value inputs', 'Set filters']
    },
    {
      name: 'Empathy Mapping',
      description: 'Map what someone else is thinking, feeling, seeing, doing.',
      duration: 20,
      skillName: 'Empathy',
      emotion: 'REFLECTIVE',
      instructions: ['Choose a person', 'Complete four quadrants', 'Consider their context', 'Use insights']
    },
    {
      name: 'Gratitude Letter',
      description: 'Write a detailed letter of gratitude.',
      duration: 30,
      skillName: 'Emotional Intelligence',
      emotion: 'GRATEFUL',
      instructions: ['Choose someone', 'Write specifically what they did', 'Describe impact', 'Consider delivering']
    },
    {
      name: 'The Feynman Technique',
      description: 'Explain a concept simply as if teaching.',
      duration: 15,
      skillName: 'Learning to Learn',
      emotion: 'CURIOUS',
      instructions: ['Choose concept', 'Explain simply', 'Identify gaps', 'Fill gaps from sources']
    },
    {
      name: 'Comfort Zone Stretch',
      description: 'Do one small thing that makes you slightly uncomfortable.',
      duration: 10,
      skillName: 'Resilience',
      emotion: 'COURAGEOUS',
      instructions: ['Choose something uncomfortable', 'Do it despite hesitation', 'Notice what happened', 'Celebrate courage']
    },
    {
      name: 'The Pause',
      description: 'Practice taking a 3-second pause before responding.',
      duration: 1440,
      skillName: 'Emotional Regulation',
      emotion: 'CALM',
      instructions: ['Choose trigger situation', 'Count to 3', 'Take a breath', 'Choose response']
    }
  ]

  console.log('💪 Creating practices...')
  for (const practice of practices) {
    const skill = await prisma.metaSkill.findUnique({
      where: { name: practice.skillName }
    })

    if (skill) {
      await prisma.practice.upsert({
        where: { name: practice.name },
        update: {},
        create: {
          ...practice,
          skillId: skill.id
        }
      })
    }
  }
  console.log(`✅ Created ${practices.length} practices`)

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
