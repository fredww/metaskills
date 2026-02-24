# MetaSkills 多语言站点快速启动指南

## ✅ 已完成的工作

### 1. 安装和基础配置 ✅

- ✅ 安装 `next-intl` 包
- ✅ 创建 i18n 配置文件
- ✅ 配置中间件
- ✅ 更新 next.config.ts

### 2. 翻译文件 ✅

- ✅ 英语翻译 (`src/i18n/messages/en.json`)
- ✅ 简体中文翻译 (`src/i18n/messages/zh-CN.json`)
- ✅ 支持的语言: en, zh-CN, de, ja, fr, es, ko

### 3. 核心组件 ✅

- ✅ 语言切换器组件 (`src/components/language-switcher.tsx`)
- ✅ 支持子域名架构
- ✅ 跨域语言切换

### 4. 应用结构 ✅

- ✅ 创建 `[locale]` 目录结构
- ✅ 配置 locale-based routing
- ✅ 复制现有页面到新结构

---

## 🚀 接下来需要做的事情

### 立即行动（今天）

#### 1. 移动剩余页面到 [locale] 目录

```bash
# 移动所有页面目录
cd src/app
mv about assessment practices journal pricing profile contact unauthorized '[locale]/'
mv login signup dashboard analytics '[locale]/'
mv skills resources articles challenges '[locale]/'
```

#### 2. 更新组件使用翻译

对于每个需要翻译的组件，添加 `useTranslations` hook:

```typescript
// 之前
export function MyComponent() {
  return <h1>Welcome to MetaSkills</h1>
}

// 之后
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('hero');
  return <h1>{t('title')}</h1>
}
```

#### 3. 更新导航栏

在你的导航栏组件中添加语言切换器：

```typescript
import { LanguageSwitcher } from '@/components/language-switcher';

export function Navbar() {
  return (
    <nav>
      {/* 现有导航链接 */}

      {/* 添加语言切换器 */}
      <LanguageSwitcher />
    </nav>
  );
}
```

---

### 本周完成

#### 1. 翻译核心页面内容

**需要翻译的页面**:
- [ ] 首页 (/)
- [ ] 关于页面 (/about)
- [ ] 技能页面 (/skills)
- [ ] 评估页面 (/assessment)
- [ ] 定价页面 (/pricing)

**方法**:

选项 A: 逐步替换（推荐）
```bash
# 一次处理一个页面
1. 打开页面组件
2. 硬编码文本替换为 t('key')
3. 在 en.json 和 zh-CN.json 添加翻译
4. 测试中英文切换
```

选项 B: 使用翻译工具
- 导出所有文本到 CSV
- 使用翻译工具翻译
- 导入回 JSON 文件

#### 2. 更新所有链接

将所有硬编码的链接改为使用 `Link` from `@/i18n/routing`:

```typescript
// 之前
import Link from 'next/link';
<Link href="/about">About</Link>

// 之后
import { Link } from '@/i18n/routing';
<Link href="/about">About</Link>
```

#### 3. 添加 SEO 元数据

为每个页面添加语言特定的 metadata:

```typescript
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      locale: locale,
      alternateLocale: ['en', 'zh-CN', 'de', 'ja', 'fr', 'es', 'ko']
    }
  };
}
```

---

## 🧪 测试多语言功能

### 本地测试

启动开发服务器：

```bash
npm run dev
```

测试以下功能：

1. **英语页面** (默认)
   ```
   http://localhost:3000
   ```

2. **简体中文页面**
   ```
   http://localhost:3000/zh-CN
   ```

3. **语言切换**
   - 点击语言切换器
   - 验证URL是否正确更新
   - 验证内容是否正确翻译

### 测试清单

- [ ] 英语首页正常显示
- [ ] 中文首页正常显示
- [ ] 语言切换器工作正常
- [ ] 所有链接正确跳转
- [ ] 导航在所有语言中正常工作

---

## 🌐 配置子域名（下一步）

### 当前状态（本地）

```
本地开发:
- http://localhost:3000       (英语)
- http://localhost:3000/zh-CN  (中文)
```

### 生产环境配置

#### Vercel 配置（主站）

1. **添加子域名到 Vercel**

```bash
# 为每种语言添加子域名
vercel domains add de.metaskills.ai
vercel domains add ja.metaskills.ai
vercel domains add fr.metaskills.ai
vercel domains add es.metaskills.ai
vercel domains add ko.metaskills.ai
```

2. **Cloudflare DNS 配置**

```
Type: CNAME
Name: de
Content: cname.vercel-dns.com
Proxy: DNS only (灰色云)

Type: CNAME
Name: ja
Content: cname.vercel-dns.com
Proxy: DNS only (灰色云)

... (其他语言类似)
```

#### 中文站独立部署（zh.metaskills.ai）

**需要独立部署到阿里云/腾讯云**:

1. **购买域名**
   - zh.metaskills.ai (如果你还没有)

2. **选择云服务商**
   - 阿里云: https://www.aliyun.com
   - 腾讯云: https://cloud.tencent.com

3. **部署选项**

   选项 A: 使用相同代码库
   ```bash
   # 在不同分支或环境变量部署中文版本
   # LOCALE=zh-CN npm run build
   ```

   选项 B: 使用 Vercel + 阿里云 CDN
   ```bash
   # Vercel 部署应用
   # 阿里云 CDN 加速中国大陆访问
   ```

---

## 📝 翻译管理

### 翻译文件结构

```
src/i18n/messages/
├── en.json          # 英语（主语言，最完整）
├── zh-CN.json       # 简体中文（优先级最高）
├── de.json          # 德语（第二优先级）
├── ja.json          # 日语
├── fr.json          # 法语
├── es.json          # 西班牙语
└── ko.json          # 韩语
```

### 翻译工具推荐

1. **Crowdin** (专业)
   - 自动化翻译流程
   - 支持多种文件格式
   - 集成 GitHub
   - 价格: 免费/付费

2. **POEditor** (简单)
   - 界面简洁
   - 实时协作
   - 价格: 免费/付费

3. **Locize** (现代)
   - 实时更新
   - 开发者友好
   - 价格: 免费/付费

---

## 🎯 优先级路线图

### Phase 1: 英语 + 简体中文（现在 - 2周）

**目标**: 完成双语上线

- [x] 安装和配置 next-intl
- [x] 创建基础翻译文件
- [x] 实现语言切换器
- [ ] 移动所有页面到 [locale]
- [ ] 翻译核心页面（5-7个）
- [ ] 测试和修复
- [ ] 部署到生产环境

### Phase 2: 完善双语体验（2-4周）

**目标**: 优化用户体验

- [ ] 翻译所有页面
- [ ] 添加 SEO 优化
- [ ] 配置子域名
- [ ] 性能优化
- [ ] 用户测试

### Phase 3: 添加德语（2-3个月）

**目标**: 进入欧洲市场

- [ ] 德语翻译
- [ ] de.metaskills.ai 上线
- [ ] 德国市场推广
- [ ] 本地化优化

### Phase 4: 添加其他语言（2026年）

按优先级添加：
- 日语（2026 Q2）
- 法语（2026 Q4）
- 西班牙语（2027）
- 韩语（2027）

---

## 💡 实用技巧

### 1. 快速翻译测试

如果你想快速看到效果，可以先翻译首页的标题：

```json
// en.json
{
  "hero": {
    "title": "Learn Abilities That",
    "titleHighlight": "Never Expire"
  }
}

// zh-CN.json
{
  "hero": {
    "title": "学习",
    "titleHighlight": "永不过时的能力"
  }
}
```

然后在组件中使用：

```typescript
const t = useTranslations('hero');
<h1>
  {t('title')}
  <span className="gradient-text">{t('titleHighlight')}</span>
</h1>
```

### 2. 处理动态内容

对于需要插值的翻译：

```json
{
  "welcome": "Welcome, {name}!"
}
```

```typescript
const t = useTranslations();
<p>{t('welcome', { name: user.name })}</p>
```

### 3. 处理复数

```json
{
  "items": {
    "one": "1 item",
    "other": "{count} items"
  }
}
```

### 4. 翻译 Rich Text

如果需要翻译包含 HTML/格式化的文本：

```typescript
import { Trans } from 'next-intl';

<Trans
  i18nKey="richText"
  components={{
    strong: <strong />,
    em: <em />
  }}
/>
```

```json
{
  "richText": "This is <strong>important</strong> and <em>emphasized</em>"
}
```

---

## ⚠️ 常见问题

### Q: 如何处理语言检测？

**A**: 当前使用 URL 路径检测。如需自动检测（基于浏览器），可以修改 middleware：

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh-CN', 'de', 'ja', 'fr', 'es', 'ko'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // 默认语言不需要前缀

  // 自动检测（可选）
  localeDetection: true
});
```

### Q: 如何处理未翻译的内容？

**A**: 两种策略：

1. **回退到英语**（推荐）
   ```typescript
   const t = useTranslations();
   const title = t('title') || 'Default Title'; // 如果没有翻译，显示默认值
   ```

2. **显示翻译键**（仅开发环境）
   ```typescript
   const t = useTranslations();
   const title = process.env.NODE_ENV === 'development'
     ? `missing: ${title}`
     : t('title');
   ```

### Q: 如何处理日期和货币格式？

**A**: 使用 Intl API：

```typescript
import { useLocale } from 'next-intl';

function formatDate(date: Date) {
  const locale = useLocale();
  return new Intl.DateTimeFormat(locale).format(date);
}

function formatPrice(price: number) {
  const locale = useLocale();
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}
```

---

## 📚 参考资源

- **next-intl 文档**: https://next-intl-docs.vercel.app/
- **Next.js 国际化**: https://nextjs.org/docs/app/building-your-application/routing/internationalization
- **Google 多语言 SEO**: https://developers.google.com/search/docs/specialty/international

---

## 🎉 总结

你现在有一个**完全配置好的多语言架构**！

**已完成**:
- ✅ next-intl 安装和配置
- ✅ 中英文翻译文件
- ✅ 语言切换组件
- ✅ 子域名架构支持

**下一步**:
1. 移动剩余页面到 `[locale]` 目录
2. 更新组件使用 `useTranslations`
3. 测试中英文切换
4. 部署到生产环境

需要帮助完成任何步骤吗？告诉我，我会立即帮你！🚀
