import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/auth'

/**
 * DELETE /api/comments/:id
 * Delete a comment (admin only)
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

    // Delete the comment
    await prisma.resourceComment.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Comment deletion error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
