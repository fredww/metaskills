import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample challenges
  const challenges = await Promise.all([
    // Reading challenges
    prisma.challenge.upsert({
      where: { id: 'challenge-reading-30' },
      update: {},
      create: {
        id: 'challenge-reading-30',
        title: '30-Day Reading Challenge',
        description: 'Read 3 books on any meta-skill within 30 days. Build a consistent reading habit and expand your knowledge.',
        type: 'READING_CHALLENGE',
        targetCount: 3,
        timeframe: 30,
        badgeTitle: 'Avid Reader',
        badgeUrl: '📚',
        isActive: true
      }
    }),

    prisma.challenge.upsert({
      where: { id: 'challenge-reading-90' },
      update: {},
      create: {
        id: 'challenge-reading-90',
        title: '90-Day Learning Sprint',
        description: 'Read 5 books on a single meta-skill within 90 days. Deep dive into one area and become an expert.',
        type: 'READING_CHALLENGE',
        targetCount: 5,
        timeframe: 90,
        badgeTitle: 'Dedicated Learner',
        badgeUrl: '🎓',
        isActive: true
      }
    }),

    // Skill mastery challenges
    prisma.challenge.upsert({
      where: { id: 'challenge-mastery-critical-thinking' },
      update: {},
      create: {
        id: 'challenge-mastery-critical-thinking',
        title: 'Critical Thinking Master',
        description: 'Complete all practices and read all recommended books for Critical Thinking. Master the art of clear reasoning.',
        type: 'SKILL_MASTERY',
        targetCount: 5,
        timeframe: 60,
        skillCode: 'critical-thinking',
        badgeTitle: 'Critical Thinker',
        badgeUrl: '🧠',
        isActive: true
      }
    }),

    prisma.challenge.upsert({
      where: { id: 'challenge-mastery-learning' },
      update: {},
      create: {
        id: 'challenge-mastery-learning',
        title: 'Learning to Learn Expert',
        description: 'Master the art of learning itself. Complete practices and read all recommended resources.',
        type: 'SKILL_MASTERY',
        targetCount: 5,
        timeframe: 60,
        skillCode: 'learning-to-learn',
        badgeTitle: 'Master Learner',
        badgeUrl: '🧠',
        isActive: true
      }
    }),

    // Tool exploration challenges
    prisma.challenge.upsert({
      where: { id: 'challenge-tool-explorer' },
      update: {},
      create: {
        id: 'challenge-tool-explorer',
        title: 'Tool Explorer',
        description: 'Try out 5 different learning tools and apps within 30 days. Discover what works best for your learning style.',
        type: 'TOOL_EXPLORATION',
        targetCount: 5,
        timeframe: 30,
        badgeTitle: 'Tool Explorer',
        badgeUrl: '🛠️',
        isActive: true
      }
    }),

    // Learning streak challenges
    prisma.challenge.upsert({
      where: { id: 'challenge-streak-7' },
      update: {},
      create: {
        id: 'challenge-streak-7',
        title: '7-Day Learning Streak',
        description: 'Complete at least one practice every day for 7 days straight. Build consistency in your learning journey.',
        type: 'LEARNING_STREAK',
        targetCount: 7,
        timeframe: 7,
        badgeTitle: 'Week Warrior',
        badgeUrl: '🔥',
        isActive: true
      }
    }),

    prisma.challenge.upsert({
      where: { id: 'challenge-streak-30' },
      update: {},
      create: {
        id: 'challenge-streak-30',
        title: '30-Day Learning Marathon',
        description: 'The ultimate test: complete at least one practice every day for 30 days. Transform your habits.',
        type: 'LEARNING_STREAK',
        targetCount: 30,
        timeframe: 30,
        badgeTitle: 'Marathon Master',
        badgeUrl: '🏆',
        isActive: true
      }
    })
  ])

  console.log(`Created ${challenges.length} challenges`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
