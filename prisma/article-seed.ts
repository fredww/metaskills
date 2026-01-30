import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const articles = await Promise.all([
    // Expert Interview
    prisma.article.upsert({
      where: { slug: 'conversation-with-barbara-oakley' },
      update: {},
      create: {
        title: 'A Conversation with Dr. Barbara Oakley on Learning How to Learn',
        slug: 'conversation-with-barbara-oakley',
        type: 'EXPERT_INTERVIEW',
        skillCode: 'learning-to-learn',
        excerpt: 'We sat down with Dr. Barbara Oakley, author of "A Mind for Numbers," to discuss effective learning strategies.',
        content: 'A Conversation with Dr. Barbara Oakley\n\nBarbara Oakley transformed from math phobe to renowned learning expert. Her course "Learning How to Learn" has over 2 million enrollments.\n\nKey insights:\n- Alternate between focused and diffuse thinking modes\n- Starting a task activates the brain and overcomes procrastination\n- Sleep consolidates memories and improves learning\n\nHer journey proves anyone can transform their learning capabilities.',
        authorName: 'MetaSkills Team',
        authorTitle: 'Editorial Team',
        category: 'Learning Science',
        isPublished: true,
        publishedAt: new Date('2025-01-15')
      }
    }),

    prisma.article.upsert({
      where: { slug: 'mindful-attention-conversation' },
      update: {},
      create: {
        title: 'The Art of Mindful Attention: A Conversation with Jon Kabat-Zinn',
        slug: 'mindful-attention-conversation',
        type: 'EXPERT_INTERVIEW',
        skillCode: 'mindfulness',
        excerpt: 'Jon Kabat-Zinn discusses the science of attention and why mindfulness matters more than ever.',
        content: 'The Art of Mindful Attention\n\nJon Kabat-Zinn brought mindfulness to mainstream Western medicine. He defines mindfulness as "paying attention, on purpose, in the present moment, and non-judgmentally."\n\nKey points:\n- Mindfulness changes brain structure\n- It is not about emptying the mind\n- Consistency matters more than duration\n- It is particularly valuable in our distracted digital age',
        authorName: 'MetaSkills Team',
        authorTitle: 'Editorial Team',
        category: 'Mindfulness',
        isPublished: true,
        publishedAt: new Date('2025-01-10')
      }
    }),

    // Learning Insights
    prisma.article.upsert({
      where: { slug: 'how-to-build-resilience' },
      update: {},
      create: {
        title: 'How to Build Resilience: Lessons from People Who Mastered It',
        slug: 'how-to-build-resilience',
        type: 'LEARNING_INSIGHTS',
        skillCode: 'resilience',
        excerpt: 'Resilience is about how quickly you get back up, not about never falling down.',
        content: 'How to Build Resilience\n\nResilience is often misunderstood. Key patterns from people who overcame setbacks:\n\n1. Reframing the narrative - view setbacks as learning opportunities\n2. Building support networks - no one bounces back alone\n3. Finding meaning - having a "why" helps you bear any "how"\n4. Small consistent actions - progress over perfection\n5. Embracing vulnerability - acknowledging struggle is strength\n\nPractical strategies include gratitude practices, reframing exercises, and maintaining diverse identities.',
        authorName: 'MetaSkills Team',
        authorTitle: 'Research & Analysis',
        category: 'Personal Growth',
        isPublished: true,
        publishedAt: new Date('2025-01-20')
      }
    })
  ])

  console.log(`Created ${articles.length} articles`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
