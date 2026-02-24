# MetaSkills 多语言内容翻译策略决策文档

## 📋 执行摘要

**决策**：采用**混合策略**管理翻译

- ✅ **数据库存储**：Skills, Practices, Articles 等动态内容
- ✅ **JSON 文件**：UI 界面元素（按钮、标签、导航）

**实施时间**：立即开始
**预计完成**：2-3 周

---

## 🎯 为什么选择混合策略？

### 对比分析

| 内容类型 | 存储方式 | 理由 |
|---------|---------|------|
| **Skills** | 🗄️ 数据库 | 动态内容，需要搜索、过滤、排序 |
| **Practices** | 🗄️ 数据库 | 用户生成数据，需要更新和管理 |
| **Articles** | 🗄️ 数据库 | CMS 内容，频繁更新 |
| **导航菜单** | 📄 JSON | 静态 UI，不常变化 |
| **按钮文本** | 📄 JSON | 简单文本，数量少 |
| **错误信息** | 📄 JSON | 标准化消息，固定不变 |

---

## 🏗️ 技术方案

### 方案选择：JSON 字段存储（推荐 MVP）

#### 数据库 Schema

```prisma
model MetaSkill {
  id          String   @id @default(cuid())
  code        String   @unique // "critical-thinking"
  domain      Domain   // COGNITIVE, INTERPERSONAL, SELF
  stage       Int      // 1-5

  // 翻译存储为 JSON
  title_translations       Json   // {"en": "...", "zh-CN": "..."}
  description_translations Json   @db.Text
  definition_translations   Json   @db.Text
  why_important_translations Json @db.Text

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### 数据示例

```json
{
  "code": "critical-thinking",
  "domain": "COGNITIVE",
  "stage": 3,
  "title_translations": {
    "en": "Critical Thinking",
    "zh-CN": "批判性思维",
    "de": "Kritisches Denken",
    "ja": "批判的思考",
    "fr": "Esprit Critique",
    "es": "Pensamiento Crítico",
    "ko": "비판적 사고"
  },
  "description_translations": {
    "en": "Objective analysis and evaluation to form judgments",
    "zh-CN": "客观分析和评估以形成判断"
  }
}
```

---

## 📦 已创建的文件

### 1. 数据库迁移
- [prisma/migrations/add_translatable_content/migration.sql](../prisma/migrations/add_translatable_content/migration.sql)
  - 添加 JSON 翻译字段
  - 迁移现有数据
  - 创建性能索引

### 2. 翻译工具库
- [src/lib/translations.ts](../src/lib/translations.ts)
  - `getTranslation()` - 提取翻译，支持 fallback
  - `getEntityTranslations()` - 批量翻译实体
  - `hasTranslation()` - 检查翻译是否存在
  - `getTranslationStatus()` - CMS 状态报告

### 3. Skills 数据服务
- [src/app/[locale]/skills/data-service.ts](../src/app/[locale]/skills/data-service.ts)
  - `getSkills()` - 获取所有技能（已翻译）
  - `getSkillByCode()` - 获取单个技能
  - `getSkillsByDomain()` - 按领域过滤

### 4. 新的 Skills 页面
- [src/app/[locale]/skills/page_new.tsx](../src/app/[locale]/skills/page_new.tsx)
  - 从数据库读取翻译
  - 使用 `next-intl` 获取 UI 文本

### 5. Schema 示例
- [prisma/schema_new.prisma](../prisma/schema_new.prisma)
  - 完整的翻译支持 schema
  - 实用代码示例

---

## 🚀 实施步骤

### 第 1 步：数据库迁移（1 天）

```bash
# 1. 更新 schema
cp prisma/schema_new.prisma prisma/schema.prisma

# 2. 运行迁移
npx prisma migrate dev --name add_translatable_content

# 3. 验证数据
npx prisma studio
```

### 第 2 步：更新页面代码（2-3 天）

```bash
# 替换旧的硬编码页面
mv src/app/[locale]/skills/page.tsx src/app/[locale]/skills/page_old.tsx
mv src/app/[locale]/skills/page_new.tsx src/app/[locale]/skills/page.tsx

# 同样的操作应用于：
# - practices pages
# - articles pages
```

### 第 3 步：添加翻译内容（1-2 周）

**选项 A：直接 SQL 插入**

```sql
-- 示例：添加中文翻译
UPDATE "meta_skills"
SET "title_translations" = jsonb_set(
  COALESCE("title_translations", '{}'::jsonb),
  '{zh-CN}',
  '"批判性思维"'
)
WHERE "code" = 'critical-thinking';
```

**选项 B：使用 Seed 脚本**

```typescript
// prisma/seed-translations.ts
const skillsData = [
  {
    code: 'critical-thinking',
    title_translations: {
      en: 'Critical Thinking',
      'zh-CN': '批判性思维',
      de: 'Kritisches Denken'
    }
  },
  // ...
];
```

### 第 4 步：测试和验证（2-3 天）

```bash
# 测试所有语言版本
curl https://www.metaskills.ai/en/skills
curl https://www.metaskills.ai/zh-CN/skills
curl https://www.metaskills.ai/de/skills
# ... 等等

# 验证翻译完整性
SELECT
  code,
  title_translations->>'en' as en_title,
  title_translations->>'zh-CN' as zh_title,
  title_translations->>'de' as de_title
FROM "meta_skills";
```

---

## 📊 成本估算

### 开发时间

| 任务 | 时间 | 负责人 |
|------|------|--------|
| 数据库迁移 | 4-8 小时 | 开发者 |
| 页面重构 | 16-24 小时 | 开发者 |
| 工具函数开发 | 8-12 小时 | 开发者 |
| 翻译内容 | 40-60 小时 | 翻译团队 |
| 测试 | 8-12 小时 | QA |
| **总计** | **76-116 小时** | - |

### 翻译成本

| 语言 | 字数估算 | 费用 (USD) |
|------|---------|-----------|
| 英语（源） | 10,000 | $0 |
| 简体中文 | 10,000 | $600 |
| 德语 | 10,000 | $1,000 |
| 日语 | 10,000 | $1,200 |
| 法语 | 10,000 | $1,000 |
| 西班牙语 | 10,000 | $800 |
| 韩语 | 10,000 | $1,100 |
| **总计** | **60,000** | **$5,700** |

---

## 🎁 附加功能

### CMS 后台管理

未来可以添加管理后台：

```typescript
// app/admin/skills/edit/[code]/page.tsx

export default async function EditSkillPage({ params }) {
  const skill = await getSkillByCode(params.code);

  return (
    <form action={updateSkillTranslations}>
      <TranslatableField
        fieldName="title"
        locales={['en', 'zh-CN', 'de', 'ja', 'fr', 'es', 'ko']}
        defaultValue={skill.title_translations}
      />
      <TranslatableTextarea
        fieldName="description"
        locales={['en', 'zh-CN', 'de', 'ja', 'fr', 'es', 'ko']}
        defaultValue={skill.description_translations}
      />
      <TranslationStatus
        translations={skill.title_translations}
        requiredLocales={['en', 'zh-CN', 'de']}
      />
      <Button type="submit">Save Translations</Button>
    </form>
  );
}
```

### 翻译进度跟踪

```typescript
// API 端点：获取翻译进度
// app/api/translations/status/route.ts

export async function GET() {
  const skills = await prisma.metaSkill.findMany();

  const status = {
    total: skills.length,
    translated: {
      en: skills.length,
      'zh-CN': skills.filter(s => s.title_translations['zh-CN']).length,
      de: skills.filter(s => s.title_translations['de']).length,
    },
    percentage: {
      en: 100,
      'zh-CN': 0, // 计算百分比
      de: 0
    }
  };

  return Response.json(status);
}
```

---

## ⚖️ 优缺点分析

### 优点 ✅

1. **性能好** - JSON 查询快速，可以缓存
2. **灵活性强** - 易于添加新语言
3. **部署简单** - 无需额外服务
4. **成本低** - 无需第三方翻译平台
5. **可控性强** - 完全控制翻译数据

### 缺点 ⚠️

1. **需要开发 CMS** - 如果要非技术人员管理
2. **无翻译记忆** - 无法利用已有的翻译
3. **需要手动同步** - 与翻译平台集成需额外开发

---

## 🔄 迁移路径

### Phase 1: MVP（当前）

- JSON 字段存储
- 手动管理翻译
- 简单的 CRUD API

### Phase 2: CMS 集成（3-6 个月后）

- 管理后台界面
- 翻译状态跟踪
- 批量导入/导出

### Phase 3: 专业翻译平台（1 年后）

如果需要，可以集成专业平台：

- **Crowdin** - 翻译管理平台
- **POEditor** - 简单的翻译工具
- **Lokalise** - 强大的本地化平台

集成方式：
```typescript
// 从 Crowdin 同步翻译
async function syncTranslationsFromCrowdin() {
  const crowdin = new CrowdinAPI({ apiKey: process.env.CROWDIN_API_KEY });

  const translations = await crowdin.listFiles('metaskills-project');

  for (const file of translations) {
    const content = await crowdin.downloadFile(file.id);
    await prisma.metaSkill.updateMany({
      data: {
        title_translations: content.translations
      }
    });
  }
}
```

---

## 📈 成功指标

### 技术指标

- ✅ 页面加载时间 < 1s
- ✅ 数据库查询时间 < 100ms
- ✅ 翻译覆盖率 > 95%

### 业务指标

- ✅ 用户语言切换率 < 5%（说明自动检测工作良好）
- ✅ 非英语用户停留时间增加 30%
- ✅ 多语言市场转化率提升

---

## 🎯 下一步行动

### 本周（立即开始）

1. ✅ 审查并批准本方案
2. ⬜ 运行数据库迁移
3. ⬜ 更新 skills 页面使用数据库
4. ⬜ 添加中文翻译测试数据

### 下周

1. ⬜ 添加所有 7 种语言的翻译
2. ⬜ 更新 practices 页面
3. ⬜ 更新 articles 页面
4. ⬜ 开始 QA 测试

### 两周后

1. ⬜ 部署到生产环境
2. ⬜ 监控性能指标
3. ⬜ 收集用户反馈
4. ⬜ 计划 CMS 后台开发

---

## 📚 相关资源

- [Prisma JSON 字段文档](https://www.prisma.io/docs/concepts/components/prisma-schema/json-fields)
- [next-intl 文档](https://next-intl-docs.vercel.app/)
- [Google 多语言 SEO 指南](https://developers.google.com/search/docs/specialty/international)
- [i18n 最佳实践](https://www.w3.org/International/questions/qa-best-practices)

---

**文档创建时间**: 2025-02-24
**状态**: ✅ 已批准
**负责人**: 开发团队
**预计完成**: 2025-03-10
