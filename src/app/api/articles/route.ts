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
      include: {
        translations: {
          where: { locale: 'en', isPublished: true }
        }
      },
      orderBy: { publishedAt: 'desc' }
    })

    // Transform articles to match the interface
    const transformedArticles = articles.map(article => ({
      id: article.id,
      title: article.translations[0]?.title || article.code,
      slug: article.slug,
      excerpt: article.translations[0]?.excerpt || '',
      type: article.type,
      skillCode: article.skillCode,
      authorName: article.authorName,
      authorTitle: article.authorTitle,
      coverImage: article.coverImage,
      category: article.category,
      publishedAt: article.publishedAt.toISOString()
    }))

    return NextResponse.json({ articles: transformedArticles })
  } catch (error) {
    console.error('Articles fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
