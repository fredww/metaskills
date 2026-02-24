// Supported locales
export const locales = [
  'en',      // English
  'zh-CN',   // Simplified Chinese
  'de',      // German
  'ja',      // Japanese
  'fr',      // French
  'es',      // Spanish
  'ko',      // Korean
] as const;

export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Locale names for display
export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'de': 'Deutsch',
  'ja': '日本語',
  'fr': 'Français',
  'es': 'Español',
  'ko': '한국어',
};

// Domain mapping for subdomain strategy
export const localeDomains: Record<Locale, string> = {
  'en': 'metaskills.ai',
  'zh-CN': 'zh.metaskills.ai',
  'de': 'de.metaskills.ai',
  'ja': 'ja.metaskills.ai',
  'fr': 'fr.metaskills.ai',
  'es': 'es.metaskills.ai',
  'ko': 'ko.metaskills.ai',
};

// Regions where each locale is spoken
export const localeRegions: Record<Locale, string[]> = {
  'en': ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'SG'],
  'zh-CN': ['CN', 'MY', 'SG'],
  'de': ['DE', 'AT', 'CH', 'LI', 'LU'],
  'ja': ['JP'],
  'fr': ['FR', 'CA', 'BE', 'CH', 'LU'],
  'es': ['ES', 'MX', 'CO', 'AR', 'PE', 'VE', 'CL'],
  'ko': ['KR'],
};
