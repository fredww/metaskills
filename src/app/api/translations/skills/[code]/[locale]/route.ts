/**
 * Skill Translation by Locale API
 * GET /api/translations/skills/:code/:locale - Get specific translation
 * PUT /api/translations/skills/:code/:locale - Create/update translation
 * PATCH /api/translations/skills/:code/:locale - Partial update
 * DELETE /api/translations/skills/:code/:locale - Delete translation
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { invalidateTranslationCache } from '@/lib/translations';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string; locale: string }> }
) {
  try {
    const { code, locale } = await params;

    const skill = await prisma.metaSkill.findUnique({
      where: { code }
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    const translation = await prisma.metaSkillTranslation.findUnique({
      where: {
        skillId_locale: {
          skillId: skill.id,
          locale
        }
      }
    });

    if (!translation) {
      return NextResponse.json(
        { error: 'Translation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(translation);
  } catch (error) {
    console.error('Error fetching translation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch translation' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ code: string; locale: string }> }
) {
  try {
    const { code, locale } = await params;
    const body = await request.json();

    const skill = await prisma.metaSkill.findUnique({
      where: { code }
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    const translation = await prisma.metaSkillTranslation.upsert({
      where: {
        skillId_locale: {
          skillId: skill.id,
          locale
        }
      },
      update: {
        ...body,
        updatedAt: new Date()
      },
      create: {
        skillId: skill.id,
        locale,
        ...body
      }
    });

    // Invalidate cache
    invalidateTranslationCache('skills');

    return NextResponse.json({
      success: true,
      translation
    });
  } catch (error) {
    console.error('Error updating translation:', error);
    return NextResponse.json(
      { error: 'Failed to update translation' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ code: string; locale: string }> }
) {
  try {
    const { code, locale } = await params;
    const body = await request.json();

    const skill = await prisma.metaSkill.findUnique({
      where: { code }
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    const translation = await prisma.metaSkillTranslation.update({
      where: {
        skillId_locale: {
          skillId: skill.id,
          locale
        }
      },
      data: {
        ...body,
        updatedAt: new Date()
      }
    });

    // Invalidate cache
    invalidateTranslationCache('skills');

    return NextResponse.json({
      success: true,
      translation
    });
  } catch (error) {
    console.error('Error patching translation:', error);
    return NextResponse.json(
      { error: 'Failed to patch translation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ code: string; locale: string }> }
) {
  try {
    const { code, locale } = await params;

    const skill = await prisma.metaSkill.findUnique({
      where: { code }
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    await prisma.metaSkillTranslation.delete({
      where: {
        skillId_locale: {
          skillId: skill.id,
          locale
        }
      }
    });

    // Invalidate cache
    invalidateTranslationCache('skills');

    return NextResponse.json({
      success: true,
      message: 'Translation deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting translation:', error);
    return NextResponse.json(
      { error: 'Failed to delete translation' },
      { status: 500 }
    );
  }
}
