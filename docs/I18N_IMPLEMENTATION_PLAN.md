# MetaSkills 多语言站点实施方案

## 📋 语言优先级（已确认）

| 优先级 | 语言 | 代码 | 市场 | 进入时间 |
|--------|------|------|------|----------|
| 🥇 1st | 英语 | `en` | 美国、英国等 | ✅ 已有 |
| 🥈 2nd | 简体中文 | `zh-CN` | 中国大陆 | 2025 Q4 |
| 🥉 3rd | 德语 | `de` | 德国、奥地利 | 2026 Q1 |
| 4th | 日语 | `ja` | 日本 | 2026 Q3 |
| 5th | 法语 | `fr` | 法国、加拿大魁北克 | 2026 Q4 |
| 6th | 西班牙语 | `es` | 拉美、西班牙 | 2027 |
| 7th | 韩语 | `ko` | 韩国 | 2027 |

---

## 🏗️ 技术架构方案

### 推荐技术栈

```json
{
  "framework": "next-intl",
  "reason": "Next.js 13+ App Router 最佳支持",
  "translationManagement": "Crowdin 或 POEditor",
  "seo": "next-intl 内置 + 自定义优化"
}
```

### 为什么选择 next-intl？

| 特性 | next-intl | next-i18next | i18next |
|------|-----------|--------------|---------|
| App Router 支持 | ✅ 原生支持 | ⚠️ 需要适配 | ❌ 不支持 |
| 性能 | ✅ 优秀 | ✅ 良好 | ⚠️ 一般 |
| TypeScript | ✅ 完整支持 | ✅ 支持 | ✅ 支持 |
| SEO 优化 | ✅ 内置 | ✅ 部分 | ⚠️ 需手动 |
| 学习曲线 | ✅ 简单 | ⚠️ 中等 | ❌ 陡峭 |
| 维护状态 | ✅ 活跃 | ✅ 活跃 | ✅ 活跃 |

---

## 🌐 URL 结构设计

### 方案 A: 子路径（推荐）✅

**URL 格式**:
```
https://metaskills.ai/           (英语，默认)
https://metaskills.ai/zh-CN/      (简体中文)
https://metaskills.ai/de/         (德语)
https://metaskills.ai/ja/         (日语)
https://metaskills.ai/fr/         (法语)
https://metaskills.ai/es/         (西班牙语)
https://metaskills.ai/ko/         (韩语)
```

**优点**:
- ✅ SEO 友好（Google 推荐）
- ✅ 易于实现和维护
- ✅ 所有语言共享域名
- ✅ 语言切换简单

**缺点**:
- ⚠️ URL 稍长（但可以接受）

---

### 方案 B: 子域名

**URL 格式**:
```
https://en.metaskills.ai/
https://zh-CN.metaskills.ai/
https://de.metaskills.ai/
...
```

**优点**:
- ✅ URL 简短
- ✅ 可以独立部署

**缺点**:
- ❌ 需要 SSL 证书配置（每个子域名）
- ❌ SEO 不如子路径
- ❌ 部署复杂

**推荐**: 使用**方案 A（子路径）**

---

## 🔧 实施步骤

### 第 1 步: 安装依赖

```bash
npm install next-intl
# 或
yarn add next-intl
# 或
pnpm add next-intl
```

---

### 第 2 步: 创建文件结构

```
src/
├── app/
│   ├── [locale]/              # 新增：语言路由
│   │   ├── layout.tsx         # 本地化 layout
│   │   ├── page.tsx           # 移动现有首页
│   │   ├── about/
│   │   ├── assessment/
│   │   └── ...                # 其他页面
│   ├── globals.css
│   └── layout.tsx             # 根 layout（简化）
├── i18n/                      # 新增：翻译文件
│   ├── locales.ts             # 语言配置
│   ├── request.ts             # 请求配置
│   ├── routing.ts             # 路由配置
│   └── messages/
│       ├── en.json            # 英语翻译
│       ├── zh-CN.json         # 简体中文
│       ├── de.json            # 德语
│       ├── ja.json            # 日语
│       ├── fr.json            # 法语
│       ├── es.json            # 西班牙语
│       └── ko.json            # 韩语
├── middleware.ts              # 新增：语言检测中间件
└── lib/
    └── utils.ts               # 工具函数
```

---

### 第 3 步: 配置 next-intl

#### 创建 `src/i18n/locales.ts`

```typescript
export const locales = [
  'en',      // 英语
  'zh-CN',   // 简体中文
  'de',      // 德语
  'ja',      // 日语
  'fr',      // 法语
  'es',      // 西班牙语
  'ko',      // 韩语
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'de': 'Deutsch',
  'ja': '日本語',
  'fr': 'Français',
  'es': 'Español',
  'ko': '한국어',
};

export const localeRegions: Record<Locale, string[]> = {
  'en': ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'SG'],
  'zh-CN': ['CN', 'MY', 'SG'],
  'de': ['DE', 'AT', 'CH', 'LI', 'LU'],
  'ja': ['JP'],
  'fr': ['FR', 'CA', 'BE', 'CH', 'LU'],
  'es': ['ES', 'MX', 'CO', 'AR', 'PE', 'VE', 'CL'],
  'ko': ['KR'],
};
```

#### 创建 `src/i18n/request.ts`

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
```

#### 创建 `src/i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh-CN', 'de', 'ja', 'fr', 'es', 'ko'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The `pathnames` object holds the mapping of internal routes to their localized versions
  localePrefix: 'as-needed' // 或 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

---

### 第 4 步: 更新根配置

#### 更新 `next.config.ts`

```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 你的其他配置
};

export default withNextIntl(nextConfig);
```

#### 更新 `src/middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh-CN|de|ja|fr|es|ko)/:path*']
};
```

---

### 第 5 步: 创建翻译文件

#### `src/i18n/messages/en.json`

```json
{
  "meta": {
    "title": "MetaSkills - Learn Abilities That Never Expire",
    "description": "Master meta-skills like critical thinking, emotional intelligence, and adaptability. Your lifelong competitive advantage in a rapidly changing world."
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "skills": "Skills",
    "assessment": "Assessment",
    "practices": "Practices",
    "journal": "Journal",
    "pricing": "Pricing",
    "login": "Login",
    "signup": "Sign Up"
  },
  "hero": {
    "title": "Learn Abilities That",
    "titleHighlight": "Never Expire",
    "subtitle": "In a world where technical skills become obsolete every 5 years, meta-skills—the ability to learn, think, adapt, and understand yourself and others—are your lifelong competitive advantage.",
    "cta": {
      "primary": "Start Your Assessment",
      "secondary": "Explore the Framework"
    }
  },
  "language": {
    "switch": "Switch Language",
    "current": "Current Language"
  }
}
```

#### `src/i18n/messages/zh-CN.json`

```json
{
  "meta": {
    "title": "MetaSkills - 学习永不过时的能力",
    "description": "掌握元技能：批判性思维、情商和适应力。在这个快速变化的世界中，这是你的终身竞争优势。"
  },
  "nav": {
    "home": "首页",
    "about": "关于",
    "skills": "技能",
    "assessment": "评估",
    "practices": "练习",
    "journal": "日记",
    "pricing": "定价",
    "login": "登录",
    "signup": "注册"
  },
  "hero": {
    "title": "学习",
    "titleHighlight": "永不过时的能力",
    "subtitle": "在技术技能每5年就过时的世界里，元技能——学习、思考、适应以及理解自己和他人——是你终身的竞争优势。",
    "cta": {
      "primary": "开始评估",
      "secondary": "探索框架"
    }
  },
  "language": {
    "switch": "切换语言",
    "current": "当前语言"
  }
}
```

---

### 第 6 步: 更新页面结构

#### `src/app/[locale]/layout.tsx`

```typescript
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/theme-provider';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
```

---

## 🔍 SEO 优化策略

### 1. Hreflang 标签

自动生成正确的 hreflang 标签：

#### `src/app/[locale]/layout.tsx` (添加)

```typescript
import { routing } from '@/i18n/routing';
import { Transition } from '@/components/transition';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations();

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      languages: {
        'en': 'https://metaskills.ai',
        'zh-CN': 'https://metaskills.ai/zh-CN',
        'de': 'https://metaskills.ai/de',
        'ja': 'https://metaskills.ai/ja',
        'fr': 'https://metaskills.ai/fr',
        'es': 'https://metaskills.ai/es',
        'ko': 'https://metaskills.ai/ko',
        'x-default': 'https://metaskills.ai'
      }
    }
  };
}
```

### 2. Sitemap 生成

#### `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://metaskills.ai';

  // 生成所有语言的 sitemap
  const sitemaps: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    const path = locale === 'en' ? '' : `/${locale}`;

    sitemaps.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: locale === 'en' ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            `${baseUrl}${loc === 'en' ? '' : `/${loc}`}`
          ])
        )
      }
    });
  });

  return sitemaps;
}
```

### 3. Robots.txt

#### `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/']
    },
    sitemap: 'https://metaskills.ai/sitemap.xml'
  };
}
```

### 4. 结构化数据（Schema.org）

#### 为每个语言创建结构化数据

```typescript
// src/app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      alternateLocale: routing.locales.filter(l => l !== locale)
    }
  };
}
```

---

## 🎨 语言切换组件

### 创建 `src/components/language-switcher.tsx`

```typescript
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

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="w-4 h-4 mr-2" />
          {localeNames[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className="flex items-center justify-between"
          >
            <span>{localeNames[loc]}</span>
            {locale === loc && (
              <Check className="w-4 h-4 ml-2 text-green-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## 📊 翻译管理策略

### 翻译文件结构

```
src/i18n/messages/
├── en.json                 # 英语（主语言）
├── zh-CN.json              # 简体中文
├── de.json                 # 德语
├── ja.json                 # 日语
├── fr.json                 # 法语
├── es.json                 # 西班牙语
└── ko.json                 # 韩语
```

### 翻译内容组织

每个 JSON 文件按命名空间组织：

```json
{
  "common": { ... },
  "nav": { ... },
  "hero": { ... },
  "skills": { ... },
  "assessment": { ... },
  "pricing": { ... },
  "auth": { ... },
  "errors": { ... },
  "meta": { ... }
}
```

---

## 🚀 实施时间表

### Phase 1: 基础设置（1-2周）

**目标**: 设置英语 + 简体中文

- [ ] 安装和配置 next-intl
- [ ] 创建文件结构
- [ ] 实现语言切换
- [ ] 翻译核心内容（en + zh-CN）
- [ ] 设置 SEO 标签

### Phase 2: 欧洲语言（2-3周）

**目标**: 添加德语 + 法语

- [ ] 翻译德语内容
- [ ] 翻译法语内容
- [ ] 本地化测试
- [ ] SEO 优化

### Phase 3: 亚洲语言（2-3周）

**目标**: 添加日语 + 韩语

- [ ] 翻译日语内容
- [ ] 翻译韩语内容
- [ ] 本地化测试（文字方向、UI布局）
- [ ] SEO 优化

### Phase 4: 拉美语言（1-2周）

**目标**: 添加西班牙语

- [ ] 翻译西班牙语内容
- [ ] 多地区测试（墨西哥、西班牙、阿根廷）
- [ ] SEO 优化

---

## 💰 预算估算

### 翻译成本

| 语言 | 字数预估 | 费用 ($0.08/字) | 总费用 |
|------|---------|-----------------|--------|
| 英语（主） | 30,000 | - | $0 |
| 简体中文 | 30,000 | $0.06 | $1,800 |
| 德语 | 30,000 | $0.10 | $3,000 |
| 日语 | 30,000 | $0.12 | $3,600 |
| 法语 | 30,000 | $0.10 | $3,000 |
| 西班牙语 | 30,000 | $0.08 | $2,400 |
| 韩语 | 30,000 | $0.11 | $3,300 |
| **总计** | **210,000** | - | **$17,100** |

### 技术实施成本

- 开发时间: 40-60 小时
- 开发费用: $4,000-6,000
- 测试费用: $1,000-2,000

**总预算**: $22,000-25,000

---

## 📈 SEO 关键指标

### 需要跟踪的指标

1. **每个语言的搜索排名**
2. **每个语言的流量**
3. **语言切换率**
4. **跳出率（按语言）**
5. **转化率（按语言）**

### 工具推荐

- **Google Search Console** - 监控多语言 SEO
- **Google Analytics 4** - 流量分析
- **Ahrefs / SEMrush** - 关键词研究
- **Crowdin** - 翻译管理

---

## 🎯 下一步行动

### 立即开始（本周）

1. ✅ 安装 `next-intl`
2. ✅ 创建基础文件结构
3. ✅ 配置英语 + 简体中文
4. ✅ 实现语言切换组件

### 短期（2周内）

1. 翻译核心内容（英语 + 中文）
2. 设置 SEO 标签和 sitemap
3. 测试语言切换
4. 上线中英文版本

### 中期（1-2个月）

1. 添加德语 + 法语
2. 完善翻译内容
3. SEO 优化

### 长期（3-6个月）

1. 添加日语 + 韩语 + 西班牙语
2. 持续优化和本地化
3. A/B 测试不同语言版本

---

## 📚 参考资源

- [next-intl 文档](https://next-intl-docs.vercel.app/)
- [Next.js 国际化](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Google 多语言 SEO](https://developers.google.com/search/docs/specialty/international)
- [hreflang 标签指南](https://developers.google.com/search/docs/specialty/international/localized-versions)

---

*文档创建于: 2025-02-23*
*预计完成时间: 6-8周（全部7种语言）*
