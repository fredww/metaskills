'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, localeNames, type Locale } from '@/i18n/locales';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, Globe } from 'lucide-react';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    // Use next-intl's router to handle locale switching
    // This works with subdirectory routing for both development and production
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isPending}>
          <Globe className="w-4 h-4 mr-2" />
          {localeNames[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">
                {getLanguageFlag(loc)}
              </span>
              <span>{localeNames[loc]}</span>
            </span>
            {locale === loc && (
              <Check className="w-4 h-4 ml-2 text-green-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getLanguageFlag(locale: Locale): string {
  const flags: Record<Locale, string> = {
    'en': '🇺🇸',
    'zh-CN': '🇨🇳',
    'de': '🇩🇪',
    'ja': '🇯🇵',
    'fr': '🇫🇷',
    'es': '🇪🇸',
    'ko': '🇰🇷'
  };
  return flags[locale] || '🌐';
}
