import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedABTests() {
  console.log('🧪 Seeding A/B tests...')

  // Test 1: Resource card layout on skill pages
  const layoutTest = await prisma.aBTest.upsert({
    where: { id: 'default-layout-test' },
    create: {
      id: 'default-layout-test',
      name: 'Resource Card Layout Test',
      description: 'Testing horizontal vs vertical card layouts on skill pages',
      isActive: true,
      trafficAllocation: 50,
      testType: 'RESOURCE_LAYOUT',
      testContext: 'skill-page',
      variantA: {
        layout: 'vertical',
        ctaPosition: 'bottom',
        showThumbnail: false,
        cardStyle: 'detailed'
      },
      variantB: {
        layout: 'horizontal',
        ctaPosition: 'inline',
        showThumbnail: true,
        thumbnailSize: 'medium',
        cardStyle: 'minimal'
      }
    },
    update: {}
  })

  // Test 2: CTA button position
  const ctaTest = await prisma.aBTest.upsert({
    where: { id: 'cta-position-test' },
    create: {
      id: 'cta-position-test',
      name: 'CTA Button Position Test',
      description: 'Testing CTA button placement for higher click-through rates',
      isActive: true,
      trafficAllocation: 50,
      testType: 'CTA_POSITION',
      testContext: 'skill-page',
      variantA: {
        ctaPosition: 'bottom',
        layout: 'vertical',
        cardStyle: 'minimal'
      },
      variantB: {
        ctaPosition: 'inline',
        layout: 'vertical',
        cardStyle: 'minimal'
      }
    },
    update: {}
  })

  // Test 3: Thumbnail visibility and size
  const thumbnailTest = await prisma.aBTest.upsert({
    where: { id: 'thumbnail-test' },
    create: {
      id: 'thumbnail-test',
      name: 'Thumbnail Test',
      description: 'Testing whether showing thumbnails improves engagement',
      isActive: true,
      trafficAllocation: 50,
      testType: 'THUMBNAIL_SIZE',
      testContext: 'skill-page',
      variantA: {
        showThumbnail: false,
        layout: 'vertical',
        cardStyle: 'minimal'
      },
      variantB: {
        showThumbnail: true,
        thumbnailSize: 'medium',
        layout: 'vertical',
        cardStyle: 'minimal'
      }
    },
    update: {}
  })

  // Test 4: Card orientation
  const orientationTest = await prisma.aBTest.upsert({
    where: { id: 'orientation-test' },
    create: {
      id: 'orientation-test',
      name: 'Card Orientation Test',
      description: 'Testing horizontal vs horizontal card orientation',
      isActive: true,
      trafficAllocation: 50,
      testType: 'CARD_ORIENTATION',
      testContext: 'skill-page',
      variantA: {
        layout: 'vertical',
        cardStyle: 'detailed'
      },
      variantB: {
        layout: 'horizontal',
        cardStyle: 'detailed'
      }
    },
    update: {}
  })

  // Test 5: Description length
  const descriptionTest = await prisma.aBTest.upsert({
    where: { id: 'description-test' },
    create: {
      id: 'description-test',
      name: 'Description Length Test',
      description: 'Testing short vs medium description lengths',
      isActive: true,
      trafficAllocation: 50,
      testType: 'DESCRIPTION_LENGTH',
      testContext: 'skill-page',
      variantA: {
        descriptionLength: 'short',
        layout: 'vertical',
        cardStyle: 'minimal'
      },
      variantB: {
        descriptionLength: 'medium',
        layout: 'vertical',
        cardStyle: 'minimal'
      }
    },
    update: {}
  })

  console.log('✅ A/B tests seeded successfully!')
}

async function main() {
  await seedABTests()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
