/**
 * Translation utilities for database-stored content
 */

export interface Translations {
  en: string;
  'zh-CN'?: string;
  de?: string;
  ja?: string;
  fr?: string;
  es?: string;
  ko?: string;
}

/**
 * Get translation for a specific locale with fallback
 * @param translations - Object containing translations for different locales
 * @param locale - Target locale (e.g., 'en', 'zh-CN', 'de')
 * @param fallback - Fallback text if no translation found
 * @returns Translated string
 */
export function getTranslation(
  translations: Record<string, string> | Translations | null | undefined,
  locale: string,
  fallback: string = ''
): string {
  if (!translations) return fallback;

  // Try the requested locale first
  if (translations[locale]) {
    return translations[locale];
  }

  // Fallback to English
  if (translations['en']) {
    return translations['en'];
  }

  // Fallback to first available translation
  const availableLocales = Object.keys(translations);
  if (availableLocales.length > 0) {
    return translations[availableLocales[0]];
  }

  return fallback;
}

/**
 * Get all translated fields for an entity
 * @param entity - Entity with translation fields
 * @param locale - Target locale
 * @param fields - Array of field names to translate
 * @returns Object with translated fields
 */
export function getEntityTranslations<T extends Record<string, any>>(
  entity: T,
  locale: string,
  fields: (keyof T & string)[]
): Record<string, any> {
  const result: Record<string, any> = { ...entity };

  for (const field of fields) {
    const translations = entity[`${field}_translations` as keyof T];
    if (translations) {
      result[field] = getTranslation(
        translations as Record<string, string>,
        locale,
        entity[field] || ''
      );
    }
  }

  // Remove _translations fields from result
  for (const field of fields) {
    delete result[`${field}_translations` as keyof typeof result];
  }

  return result;
}

/**
 * Check if a translation exists for a locale
 * @param translations - Translation object
 * @param locale - Locale to check
 * @returns Boolean indicating if translation exists
 */
export function hasTranslation(
  translations: Record<string, string> | Translations | null | undefined,
  locale: string
): boolean {
  return !!translations && !!translations[locale];
}

/**
 * Get all available locales for a translation
 * @param translations - Translation object
 * @returns Array of available locale codes
 */
export function getAvailableLocales(
  translations: Record<string, string> | Translations | null | undefined
): string[] {
  if (!translations) return [];
  return Object.keys(translations);
}

/**
 * Format translation status (e.g., for CMS dashboard)
 * @param translations - Translation object
 * @param requiredLocales - Array of required locales
 * @returns Object with translation status
 */
export function getTranslationStatus(
  translations: Record<string, string> | Translations | null | undefined,
  requiredLocales: string[]
): {
  total: number;
  translated: number;
  missing: string[];
  percentage: number;
} {
  const available = getAvailableLocales(translations);
  const missing = requiredLocales.filter(locale => !available.includes(locale));

  return {
    total: requiredLocales.length,
    translated: requiredLocales.length - missing.length,
    missing,
    percentage: ((requiredLocales.length - missing.length) / requiredLocales.length) * 100
  };
}
