# MetaSkills 域名与部署策略（修订版）

## 🎯 推荐方案：混合域名策略

基于你的需求和各市场的技术限制，我推荐采用**混合域名策略**：

---

## 📊 完整域名架构

### 方案对比

| 语言 | 子域名方案 | 子路径方案 | 推荐 | 原因 |
|------|-----------|-----------|------|------|
| 🇺🇸 英语 | metaskills.ai | metaskills.ai/ | ✅ **主域名** | 默认语言 |
| 🇨🇳 简体中文 | **zh.metaskills.ai** | metaskills.ai/zh-CN | ✅ **子域名** | **需国内部署** |
| 🇩🇪 德语 | de.metaskills.ai | metaskills.ai/de | ✅ **子域名** | 独立优化 |
| 🇯🇵 日语 | ja.metaskills.ai | metaskills.ai/ja | ✅ **子域名** | 独立优化 |
| 🇫🇷 法语 | fr.metaskills.ai | metaskills.ai/fr | ✅ **子域名** | 独立优化 |
| 🇪🇸 西班牙语 | es.metaskills.ai | metaskills.ai/es | ⚠️ **可选** | 看预算 |
| 🇰🇷 韩语 | ko.metaskills.ai | metaskills.ai/ko | ⚠️ **可选** | 看预算 |

---

## ✅ 为什么推荐子域名方案？

### 1. 中国市场的特殊需求 ⭐️⭐️⭐️⭐️⭐️

**必须独立部署**:
```
主站: Vercel (海外)
中文站: 阿里云/腾讯云 (国内)
```

如果使用子路径 (`metaskills.ai/zh-CN`)，意味着：
- ❌ 整个站点部署在国内（海外用户访问慢）
- ❌ 或者无法实现（Vercel 在国内被墙）

**解决方案**:
```
主站:     https://metaskills.ai        (Vercel，美国)
中文站:    https://zh.metaskills.ai     (阿里云，中国)
德语站:    https://de.metaskills.ai     (Vercel，德国)
其他语言:  https://xx.metaskills.ai     (Vercel，各地区)
```

### 2. SEO 的优势（实际上）⭐️⭐️⭐️⭐️

**Google 的立场变化**:
- 早期 Google 推荐子路径
- 现在认为**子域名和子路径在 SEO 上等价**
- 重要的是正确的 hreflang 标签

**子域名 SEO 优势**:
- ✅ 每个语言可以独立优化
- ✅ 可以针对特定地区设置服务器位置
- ✅ 可以为每个语言建立独立的反向链接
- ✅ 更容易做地区化内容策略

### 3. 技术优势 ⭐️⭐️⭐️⭐️

| 优势 | 说明 |
|------|------|
| **独立部署** | 中文站可以部署在国内，其他语言在 Vercel |
| **CDN 优化** | 每个子域名可以设置独立的 CDN 节点 |
| **SSL 证书** | 使用 Let's Encrypt Wildcard 证书一次覆盖所有子域名 |
| **监控** | 可以为每个语言设置独立的监控和错误追踪 |
| **扩展性** | 添加新语言不影响现有站点 |

### 4. 用户体验优势 ⭐️⭐️⭐️⭐️

**URL 更专业**:
```
子路径:    metaskills.ai/zh-CN/about
子域名:    zh.metaskills.ai/about  ✅ 更清晰
```

**更好的品牌认知**:
- `de.metaskills.ai` 显得更重视德国市场
- `ja.metaskills.ai` 显示对日本的承诺

---

## 🏗️ 最终推荐的域名架构

```
主域名: metaskills.ai
├── (默认)        → https://metaskills.ai        (英语)
├── zh            → https://zh.metaskills.ai     (简体中文)
├── de            → https://de.metaskills.ai     (德语)
├── ja            → https://ja.metaskills.ai     (日语)
├── fr            → https://fr.metaskills.ai     (法语)
├── es            → https://es.metaskills.ai     (西班牙语)
└── ko            → https://ko.metaskills.ai     (韩语)
```

---

## 🔧 技术实施方案

### 1. DNS 配置

#### Cloudflare DNS 设置

```
Type    Name                    Content                    Proxy
------------------------------------------------------------------------------------
A       metaskills.ai           76.76.21.21                DNS only (灰色云)
A       metaskills.ai           76.76.19.19                DNS only (灰色云)
CNAME   www                     cname.vercel-dns.com        DNS only (灰色云)

CNAME   zh                      zh.metaskills.ai.cdn...     DNS only (灰色云)
        (指向阿里云/腾讯云)

CNAME   de                      cname.vercel-dns.com        DNS only (灰色云)
CNAME   ja                      cname.vercel-dns.com        DNS only (灰色云)
CNAME   fr                      cname.vercel-dns.com        DNS only (灰色云)
CNAME   es                      cname.vercel-dns.com        DNS only (灰色云)
CNAME   ko                      cname.vercel-dns.com        DNS only (灰色云)
```

### 2. Vercel 项目配置

#### 创建多个 Vercel 项目

```bash
# 项目 1: 主站（包含所有非中文语言）
Project: metaskills-main
Domains:
  - metaskills.ai
  - de.metaskills.ai
  - ja.metaskills.ai
  - fr.metaskills.ai
  - es.metaskills.ai
  - ko.metaskills.ai

# 项目 2: 中文站（独立部署）
Project: metaskills-cn
Domain: zh.metaskills.ai
Deploy: 阿里云/腾讯云（不在 Vercel）
```

### 3. Next.js 配置更新

#### `next.config.ts`

```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 为每个子域名配置
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Language',
            value: 'en'
          }
        ]
      }
    ];
  }
};

export default withNextIntl(nextConfig);
```

---

## 🔍 SEO 优化策略（子域名版）

### 1. Hreflang 标签配置

每个站点需要正确配置 hreflang：

```typescript
// metaskills.ai (英语)
export function generateMetadata() {
  return {
    alternates: {
      canonical: 'https://metaskills.ai',
      languages: {
        'en': 'https://metaskills.ai',
        'zh-CN': 'https://zh.metaskills.ai',
        'de': 'https://de.metaskills.ai',
        'ja': 'https://ja.metaskills.ai',
        'fr': 'https://fr.metaskills.ai',
        'es': 'https://es.metaskills.ai',
        'ko': 'https://ko.metaskills.ai',
        'x-default': 'https://metaskills.ai'
      }
    }
  };
}

// zh.metaskills.ai (简体中文)
export function generateMetadata() {
  return {
    alternates: {
      canonical: 'https://zh.metaskills.ai',
      languages: {
        'en': 'https://metaskills.ai',
        'zh-CN': 'https://zh.metaskills.ai',
        'de': 'https://de.metaskills.ai',
        'ja': 'https://ja.metaskills.ai',
        'fr': 'https://fr.metaskills.ai',
        'es': 'https://es.metaskills.ai',
        'ko': 'https://ko.metaskills.ai',
        'x-default': 'https://metaskills.ai'
      }
    }
  };
}
```

### 2. Sitemap 生成

#### 主站 sitemap

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://metaskills.ai';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    // ... 其他页面
  ];
}
```

#### 中文站 sitemap (独立)

```typescript
// zh.metaskills.ai 的 sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zh.metaskills.ai';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    // ... 中文站的其他页面
  ];
}
```

### 3. robots.txt

每个站点需要独立的 robots.txt：

```typescript
// metaskills.ai/robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ],
    sitemap: 'https://metaskills.ai/sitemap.xml'
  };
}

// zh.metaskills.ai/robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ],
    sitemap: 'https://zh.metaskills.ai/sitemap.xml'
  };
}
```

---

## 🎨 语言切换实现

### 更新语言切换器

```typescript
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/locales';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // 构建目标 URL
    const targetDomain = getDomainForLocale(newLocale);
    const targetUrl = `https://${targetDomain}${pathname}`;

    // 如果是当前域名，使用客户端路由
    if (targetDomain === getDomainForLocale(locale)) {
      router.push(pathname);
    } else {
      // 跨域切换，直接跳转
      window.location.href = targetUrl;
    }
  };

  return (
    <select value={locale} onChange={(e) => switchLocale(e.target.value as Locale)}>
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}

function getDomainForLocale(locale: Locale): string {
  const domainMap: Record<Locale, string> = {
    'en': 'metaskills.ai',
    'zh-CN': 'zh.metaskills.ai',
    'de': 'de.metaskills.ai',
    'ja': 'ja.metaskills.ai',
    'fr': 'fr.metaskills.ai',
    'es': 'es.metaskills.ai',
    'ko': 'ko.metaskills.ai'
  };

  return domainMap[locale];
}
```

---

## 💰 成本对比

### 子路径方案（原计划）

```
Vercel 部署:       $20/月
SSL 证书:          $0 (Let's Encrypt)
翻译费用:          $17,100
开发时间:          40-60 小时
─────────────────────────────
总成本:            $17,120-17,320
```

### 子域名方案（推荐）

```
Vercel (主站):     $20/月
阿里云 (中文站):    $50-100/月
SSL Wildcard:      $0 (Let's Encrypt)
翻译费用:          $17,100
开发时间:          60-80 小时 (稍复杂)
─────────────────────────────
总成本:            $17,170-17,500
```

**差异**: 仅增加 $50-180/月，但获得更好的灵活性和性能

---

## ✅ 最终推荐

### 采用子域名方案

**域名分配**:
1. ✅ **metaskills.ai** - 英语（默认）
2. ✅ **zh.metaskills.ai** - 简体中文（独立部署）
3. ✅ **de.metaskills.ai** - 德语
4. ✅ **ja.metaskills.ai** - 日语
5. ✅ **fr.metaskills.ai** - 法语
6. ✅ **es.metaskills.ai** - 西班牙语
7. ✅ **ko.metaskills.ai** - 韩语

### 核心优势

✅ **完美解决中国市场问题**（独立部署）
✅ **每个语言独立优化**（SEO 和性能）
✅ **更专业的品牌形象**
✅ **更好的扩展性**
✅ **成本增加很小**（仅 $50-180/月）

---

## 🚀 实施步骤

### 第 1 步：DNS 配置（1天）

1. 在 Cloudflare 添加所有子域名
2. 配置 DNS 记录
3. 申请 Wildcard SSL 证书

### 第 2 步：主站开发（2周）

1. 更新 Next.js 配置
2. 实现英语 + 德语 + 日语 + 法语
3. 配置 hreflang 标签
4. 生成 sitemap

### 第 3 步：中文站开发（2-3周）

1. 准备国内部署环境
2. 翻译内容到简体中文
3. 完成中文站上线
4. 配置国内监控和分析

### 第 4 步：其他语言（按需）

1. 西班牙语（2027年）
2. 韩语（2027年）

---

## 📊 总结

### 你的直觉是对的！

对于 MetaSkills 项目，**子域名方案确实更好**：

| 维度 | 子路径 | 子域名 | 赢家 |
|------|--------|--------|------|
| SEO | 良好 | 优秀 | 🏆 子域名 |
| 中国市场 | ❌ 不可行 | ✅ 完美 | 🏆 子域名 |
| 用户体验 | 一般 | 优秀 | 🏆 子域名 |
| 技术灵活性 | 有限 | 优秀 | 🏆 子域名 |
| 实施难度 | 简单 | 中等 | - |
| 成本 | 低 | 略高 | - |

**结论**: 子域名方案虽然稍复杂，但**收益远大于成本**！

---

*修订于: 2025-02-23*
*基于用户反馈和更深入的技术分析*
