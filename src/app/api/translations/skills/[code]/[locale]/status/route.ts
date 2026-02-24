/**
 * Translation Status Update API
 * PATCH /api/translations/skills/:code/:locale/status - Update translation status
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { invalidateTranslationCache } from '@/lib/translations';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ code: string; locale: string }> }
) {
  try {
    const { code, locale } = await params;
    const body = await request.json();
    const { status, reviewedBy, approvedBy } = body;

    // Validate status
    const validStatuses = ['DRAFT', 'PENDING', 'REVIEWED', 'PUBLISHED', 'ARCHIVED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const skill = await prisma.metaSkill.findUnique({
      where: { code }
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    const updateData: any = {
      status,
      updatedAt: new Date()
    };

    // Add timestamps based on status
    if (status === 'PUBLISHED' && !approvedBy) {
      updateData.publishedAt = new Date();
      updateData.approvedBy = reviewedBy || 'System';
    } else if (status === 'REVIEWED') {
      updateData.reviewedBy = reviewedBy;
    }

    if (reviewedBy) {
      updateData.reviewedBy = reviewedBy;
    }

    const translation = await prisma.metaSkillTranslation.update({
      where: {
        skillId_locale: {
          skillId: skill.id,
          locale
        }
      },
      data: updateData
    });

    // Invalidate cache
    invalidateTranslationCache('skills');

    return NextResponse.json({
      success: true,
      translation,
      message: `Translation status updated to ${status}`
    });
  } catch (error) {
    console.error('Error updating translation status:', error);
    return NextResponse.json(
      { error: 'Failed to update translation status' },
      { status: 500 }
    );
  }
}
