/**
 * Skills data service with translation support
 */

import { getSkills as getTranslatedSkills, getSkillByCode as getTranslatedSkillByCode, getSkillsByDomain as getTranslatedSkillsByDomain } from '@/lib/translations';
import type { Locale } from '@/i18n/locales';

export type { Locale };

export interface SkillData {
  code: string;
  title: string;
  description: string;
  domain: string;
  stage: number;
  benefits: string[];
  definition?: string;
  whyImportant?: string;
  lifeApplications?: any;
}

/**
 * Get all skills translated for a specific locale
 */
export async function getSkills(locale: Locale): Promise<SkillData[]> {
  const skills = await getTranslatedSkills(locale);

  return skills.map(skill => ({
    code: skill.code,
    domain: skill.domain,
    stage: skill.stage,
    title: skill.title,
    description: skill.description,
    definition: skill.definition,
    whyImportant: skill.whyImportant,
    benefits: extractBenefits(skill)
  }));
}

/**
 * Get a single skill by code with translations
 */
export async function getSkillByCode(code: string, locale: Locale) {
  const skill = await getTranslatedSkillByCode(code, locale);

  if (!skill) return null;

  return {
    code: skill.code,
    domain: skill.domain,
    stage: skill.stage,
    title: skill.title,
    description: skill.description,
    definition: skill.definition,
    whyImportant: skill.whyImportant,
    lifeApplications: []
  };
}

/**
 * Get skills by domain with translations
 */
export async function getSkillsByDomain(domain: string, locale: Locale): Promise<SkillData[]> {
  const skills = await getTranslatedSkillsByDomain(domain, locale);

  return skills.map(skill => ({
    code: skill.code,
    domain: skill.domain,
    stage: skill.stage,
    title: skill.title,
    description: skill.description,
    definition: skill.definition,
    whyImportant: skill.whyImportant,
    benefits: extractBenefits(skill)
  }));
}

/**
 * Extract and translate benefits from skill data
 * Note: Benefits are now stored separately in the database schema
 * This function returns a placeholder array for now
 */
function extractBenefits(skill: any): string[] {
  // The new translation system doesn't include benefits in the main skill object
  // Benefits would need to be fetched separately or included in the translation query
  // For now, return empty array
  return [];

  // If benefits were stored in the skill object:
  // if (Array.isArray(skill.benefits)) {
  //   return skill.benefits.slice(0, 3);
  // }
  // return [];
}

/**
 * Server Action for getting skills (for use in Client Components)
 */
export async function getSkillsAction(locale: Locale) {
  'use server';

  const skills = await getSkills(locale);
  return skills;
}
