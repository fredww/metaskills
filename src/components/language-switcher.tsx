'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, localeNames, localeDomains, type Locale } from '@/i18n/locales';
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
    const isDevelopment = process.env.NODE_ENV === 'development' ||
                          window.location.hostname === 'localhost' ||
                          window.location.hostname === '127.0.0.1';

    if (isDevelopment) {
      // Development: use path-based routing (e.g., http://localhost:3000/de)
      startTransition(() => {
        router.replace(pathname, { locale: newLocale });
      });
    } else {
      // Production: use subdomain-based routing (e.g., https://de.metaskills.ai/)
      const targetDomain = localeDomains[newLocale];
      const currentDomain = localeDomains[locale];

      // If same domain, use client-side navigation
      if (targetDomain === currentDomain) {
        startTransition(() => {
          router.replace(pathname);
        });
      } else {
        // Cross-domain navigation
        window.location.href = `https://${targetDomain}${pathname}`;
      }
    }
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
