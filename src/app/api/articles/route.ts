import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const skillCode = searchParams.get('skillCode')

    const where: any = {
      isPublished: true
    }

    if (type && type !== 'all') {
      where.type = type.toUpperCase()
    }

    if (skillCode) {
      where.skillCode = skillCode
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' }
    })

    // Increment view count for tracking
    // This could be done asynchronously to not block the response

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Articles fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
