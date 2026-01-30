import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminApi } from '@/lib/auth'

/**
 * GET /api/admin/users
 * Get all users (admin only)
 */
export async function GET(request: Request) {
  try {
    // Check admin permissions
    const authCheck = await requireAdminApi()
    if (authCheck.error) {
      return NextResponse.json(
        { message: authCheck.error },
        { status: authCheck.status }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            resourceClicks: true,
            resourceRatings: true,
            resourceComments: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Admin users fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/users
 * Update user role (admin only)
 */
export async function PATCH(request: Request) {
  try {
    // Check admin permissions
    const authCheck = await requireAdminApi()
    if (authCheck.error) {
      return NextResponse.json(
        { message: authCheck.error },
        { status: authCheck.status }
      )
    }

    const { userId, role } = await request.json()

    if (!userId || !role) {
      return NextResponse.json(
        { message: 'Missing userId or role' },
        { status: 400 }
      )
    }

    if (role !== 'USER' && role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Invalid role. Must be USER or ADMIN' },
        { status: 400 }
      )
    }

    // Prevent admin from demoting themselves
    const currentUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (userId === currentUser?.id && role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Cannot demote yourself from admin' },
        { status: 403 }
      )
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role }
    })

    return NextResponse.json({
      success: true,
      user: updated
    })
  } catch (error) {
    console.error('Admin user update error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
