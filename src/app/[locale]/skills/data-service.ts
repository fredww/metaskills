/**
 * Skills data service with translation support
 */

import { prisma } from '@/lib/prisma';
import { getTranslation, getEntityTranslations } from '@/lib/translations';
import type { Locale } from '@/i18n/locales';

export interface SkillData {
  code: string;
  title: string;
  description: string;
  domain: string;
  stage: number;
  benefits: string[];
}

/**
 * Get all skills translated for a specific locale
 */
export async function getSkills(locale: Locale): Promise<SkillData[]> {
  const skills = await prisma.metaSkill.findMany({
    orderBy: [
      { domain: 'asc' },
      { order: 'asc' }
    ]
  });

  return skills.map(skill => ({
    code: skill.code,
    domain: skill.domain,
    stage: skill.stage,
    title: getTranslation(skill.title_translations, locale, skill.code),
    description: getTranslation(skill.description_translations, locale, ''),
    benefits: extractBenefits(skill, locale)
  }));
}

/**
 * Get a single skill by code with translations
 */
export async function getSkillByCode(code: string, locale: Locale) {
  const skill = await prisma.metaSkill.findUnique({
    where: { code }
  });

  if (!skill) return null;

  return {
    code: skill.code,
    domain: skill.domain,
    stage: skill.stage,
    title: getTranslation(skill.title_translations, locale, skill.code),
    description: getTranslation(skill.description_translations, locale),
    definition: getTranslation(skill.definition_translations, locale),
    whyImportant: getTranslation(skill.why_important_translations, locale),
    lifeApplications: skill.life_applications || []
  };
}

/**
 * Get skills by domain with translations
 */
export async function getSkillsByDomain(domain: string, locale: Locale): Promise<SkillData[]> {
  const skills = await prisma.metaSkill.findMany({
    where: { domain: domain as any },
    orderBy: { order: 'asc' }
  });

  return skills.map(skill => ({
    code: skill.code,
    domain: skill.domain,
    stage: skill.stage,
    title: getTranslation(skill.title_translations, locale, skill.code),
    description: getTranslation(skill.description_translations, locale),
    benefits: extractBenefits(skill, locale)
  }));
}

/**
 * Extract and translate benefits from life_applications
 */
function extractBenefits(skill: any, locale: Locale): string[] {
  // If life_applications is already an array of strings, return as-is
  if (Array.isArray(skill.life_applications)) {
    return skill.life_applications.slice(0, 3);
  }

  // If it's an object with translations, extract the appropriate locale
  if (typeof skill.life_applications === 'object' && skill.life_applications !== null) {
    return skill.life_applications[locale] ||
           skill.life_applications['en'] ||
           [];
  }

  return [];
}

/**
 * Server Action for getting skills (for use in Client Components)
 */
export async function getSkillsAction(locale: Locale) {
  'use server';

  const skills = await getSkills(locale);
  return skills;
}
