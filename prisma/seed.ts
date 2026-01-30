import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create Skills
  const skills = await Promise.all([
    prisma.metaSkill.upsert({
      where: { code: 'learning-to-learn' },
      update: {},
      create: {
        code: 'learning-to-learn',
        title: 'Learning to Learn',
        domain: 'COGNITIVE',
        stage: 2,
        description: 'The ability to learn new things quickly and effectively',
        definition: 'Learning to learn is the ability to rapidly and effectively acquire new knowledge and skills.',
        whyImportant: 'In a world where knowledge becomes obsolete quickly, the ability to learn new things fast is more valuable than any specific technical skill.',
        lifeApplications: ['Picking up new software tools', 'Learning new hobbies', 'Adapting to industry changes'],
        scientificBackground: null,
        order: 1
      }
    }),
    prisma.metaSkill.upsert({
      where: { code: 'critical-thinking' },
      update: {},
      create: {
        code: 'critical-thinking',
        title: 'Critical Thinking',
        domain: 'COGNITIVE',
        stage: 3,
        description: 'Objective analysis and evaluation to form judgments',
        definition: 'Critical thinking is the objective analysis and evaluation of an issue in order to form a judgment.',
        whyImportant: 'In an age of information overload, the ability to think critically helps you distinguish fact from fiction.',
        lifeApplications: ['Evaluating news sources', 'Making major decisions', 'Analyzing problems at work'],
        scientificBackground: null,
        order: 2
      }
    }),
    prisma.metaSkill.upsert({
      where: { code: 'communication' },
      update: {},
      create: {
        code: 'communication',
        title: 'Communication',
        domain: 'INTERPERSONAL',
        stage: 1,
        description: 'Effective exchange of information and feelings',
        definition: 'Communication is the process of exchanging information, ideas, thoughts, and feelings between people.',
        whyImportant: 'Poor communication is the root cause of most relationship problems, workplace conflicts, and misunderstandings.',
        lifeApplications: ['Giving presentations', 'Resolving conflicts', 'Negotiating deals'],
        scientificBackground: null,
        order: 3
      }
    }),
    prisma.metaSkill.upsert({
      where: { code: 'empathy' },
      update: {},
      create: {
        code: 'empathy',
        title: 'Empathy',
        domain: 'INTERPERSONAL',
        stage: 2,
        description: 'Understand and feel what another person is experiencing',
        definition: 'Empathy is the capacity to understand or feel what another person is experiencing from within their frame of reference.',
        whyImportant: 'Empathy is what makes us human. It is essential for leadership, teamwork, parenting, and friendships.',
        lifeApplications: ['Supporting friends', 'Leading teams', 'Navigating family conflicts'],
        scientificBackground: null,
        order: 4
      }
    }),
    prisma.metaSkill.upsert({
      where: { code: 'self-awareness' },
      update: {},
      create: {
        code: 'self-awareness',
        title: 'Self-Awareness',
        domain: 'SELF',
        stage: 1,
        description: 'Conscious knowledge of your character, feelings, motives, and desires',
        definition: 'Self-awareness is the conscious knowledge of one\'s own character, feelings, motives, and desires.',
        whyImportant: 'Self-awareness enables you to understand your strengths and weaknesses, recognize your patterns, and make intentional choices.',
        lifeApplications: ['Choosing a career', 'Changing bad habits', 'Improving relationships'],
        scientificBackground: null,
        order: 5
      }
    }),
    prisma.metaSkill.upsert({
      where: { code: 'mindfulness' },
      update: {},
      create: {
        code: 'mindfulness',
        title: 'Mindfulness',
        domain: 'SELF',
        stage: 1,
        description: 'Present-moment awareness without judgment',
        definition: 'Mindfulness is the quality of being present and fully engaged with whatever you\'re doing in the moment.',
        whyImportant: 'Most unhappiness comes from living in the past or worrying about the future. Mindfulness brings you back to the present.',
        lifeApplications: ['Reducing stress', 'Improving focus', 'Enjoying food more'],
        scientificBackground: null,
        order: 6
      }
    }),
    prisma.metaSkill.upsert({
      where: { code: 'resilience' },
      update: {},
      create: {
        code: 'resilience',
        title: 'Resilience',
        domain: 'SELF',
        stage: 2,
        description: 'Recover quickly from difficulties and adversity',
        definition: 'Resilience is the capacity to recover quickly from difficulties. It\'s not about avoiding stress, but about adapting and growing.',
        whyImportant: 'Life inevitably brings challenges. Resilience determines whether those challenges break you or make you stronger.',
        lifeApplications: ['Coping with job loss', 'Navigating crises', 'Dealing with health issues'],
        scientificBackground: null,
        order: 7
      }
    }),
    prisma.metaSkill.upsert({
      where: { code: 'emotional-intelligence' },
      update: {},
      create: {
        code: 'emotional-intelligence',
        title: 'Emotional Intelligence',
        domain: 'INTERPERSONAL',
        stage: 3,
        description: 'Recognize and understand emotions in yourself and others',
        definition: 'Emotional intelligence is the ability to recognize, understand, and manage your own emotions and those of others.',
        whyImportant: 'Emotions drive behavior. Understanding and managing emotions effectively is crucial for success in relationships and work.',
        lifeApplications: ['Leading teams', 'Navigating difficult conversations', 'Managing stress'],
        scientificBackground: null,
        order: 8
      }
    })
  ])

  console.log(`Created ${skills.length} skills`)

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
