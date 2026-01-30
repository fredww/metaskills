import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/auth'

/**
 * DELETE /api/ratings/:id
 * Delete a rating (admin only)
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin permissions
    const authCheck = await requireAdminApi()
    if (authCheck.error) {
      return NextResponse.json(
        { message: authCheck.error },
        { status: authCheck.status }
      )
    }

    const { id } = await params

    // Delete the rating
    await prisma.resourceRating.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Rating deletion error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
