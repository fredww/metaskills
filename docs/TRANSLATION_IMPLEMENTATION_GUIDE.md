# MetaSkills 专业级翻译系统实施指南

## 📊 项目状态：Phase 1 完成 ✅

**已实施**：
- ✅ 专业翻译表架构
- ✅ 数据库迁移脚本
- ✅ 核心翻译管理库
- ✅ 缓存和fallback机制

**待实施**：
- ⬜ CMS API 端点
- ⬜ 导入/导出工具
- ⬜ 翻译仪表板
- ⬜ 内容迁移和测试

---

## 🏗️ 已完成架构详解

### 1. 数据库架构 (100% 完成)

#### 翻译表结构

```prisma
// MetaSkill 元数据表（不可变）
model MetaSkill {
  id          String   @id
  code        String   @unique  // "critical-thinking"
  domain      Domain            // COGNITIVE, INTERPERSONAL, SELF
  stage       Int              // 1-5
  order       Int

  translations MetaSkillTranslation[]  // 关联翻译表
}

// 翻译表（可扩展）
model MetaSkillTranslation {
  id          String   @id
  skillId     String
  locale      String           // 'en', 'zh-CN', 'de', etc.
  status      TranslationStatus // DRAFT, PENDING, REVIEWED, PUBLISHED, ARCHIVED

  // 可翻译内容
  title       String
  description String   @db.Text
  definition  String   @db.Text
  whyImportant String  @db.Text

  // SEO 字段
  metaTitle       String?
  metaDescription String?  @db.Text
  ogTitle         String?
  ogDescription   String?  @db.Text

  // 工作流追踪
  translatedBy String?
  reviewedBy   String?
  approvedAt   DateTime?
  publishedAt  DateTime?

  @@unique([skillId, locale])
}
```

#### 关键特性

1. **独立翻译表** - 符合数据库规范化
2. **工作流状态** - 支持草稿→审核→发布流程
3. **SEO 支持** - 每种语言独立的SEO标签
4. **人员追踪** - 记录翻译者、审核者
5. **时间戳** - 追踪审核和发布时间

### 2. 核心翻译库 (100% 完成)

位置：[src/lib/translations.ts](../src/lib/translations.ts)

#### 功能列表

```typescript
// Skills 翻译
getSkills(locale)           // 获取所有技能（带缓存）
getSkillByCode(code, locale) // 获取单个技能
getSkillsByDomain(domain, locale) // 按领域获取

// Practices 翻译
getPracticesBySkill(skillCode, locale)
getPracticeById(id, locale)

// Articles 翻译
getArticles(locale, limit)
getArticleBySlug(slug, locale)

// 状态监控
getTranslationProgress(contentType?)  // 详细进度
getOverallTranslationStatus()         // 总体状态

// 缓存管理
invalidateTranslationCache(pattern?)
warmUpCache()
```

#### 性能优化

- ✅ **5分钟TTL缓存** - 减少数据库查询
- ✅ **自动fallback** - 缺失翻译自动使用英语
- ✅ **SQL级JOIN** - 单次查询获取所有数据
- ✅ **智能缓存失效** - 按内容类型清除

---

## 📋 剩余实施计划

### Phase 2: CMS API (预计 2-3 天)

#### API 端点列表

```typescript
// GET /api/translations/skills
// 获取所有技能翻译状态
Response: {
  skills: TranslationProgress[]
}

// GET /api/translations/skills/:code
// 获取特定技能的所有翻译
Response: {
  skill: MetaSkill,
  translations: MetaSkillTranslation[]
}

// POST /api/translations/skills/:code/:locale
// 创建或更新技能翻译
Body: {
  title: string
  description: string
  definition?: string
  whyImportant?: string
  metaTitle?: string
  metaDescription?: string
}

// PATCH /api/translations/skills/:code/:locale/status
// 更新翻译状态
Body: {
  status: 'DRAFT' | 'PENDING' | 'REVIEWED' | 'PUBLISHED'
  reviewedBy?: string
}

// DELETE /api/translations/skills/:code/:locale
// 删除翻译

// GET /api/translations/export
// 导出翻译数据
Query: {
  type: 'skills' | 'practices' | 'articles'
  locale?: string
  format: 'xlsx' | 'csv' | 'json'
}

// POST /api/translations/import
// 导入翻译数据
Body: FormData {
  file: File
  type: string
  locale: string
}

// GET /api/translations/progress
// 获取总体翻译进度
Response: {
  totalSkills: number
  translatedSkills: number
  overallPercentage: number
  byLocale: {
    en: number
    'zh-CN': number
    de: number
    etc.
  }
}
```

#### 实施文件结构

```
src/app/api/translations/
├── route.ts                    # 总体进度
├── skills/
│   ├── route.ts               # GET list, POST bulk
│   ├── [code]/
│   │   ├── route.ts           # GET single
│   │   └── [locale]/
│   │       ├── route.ts       # GET, POST, PUT, DELETE
│   │       └── status/
│   │           └── route.ts   # PATCH status
├── practices/
│   └── [similar structure]
├── articles/
│   └── [similar structure]
├── export/
│   └── route.ts               # Export functionality
└── import/
    └── route.ts               # Import functionality
```

### Phase 3: 导入/导出工具 (预计 1-2 天)

#### 导出功能

支持格式：
1. **Excel (XLSX)** - 适合翻译人员
   - 每种语言一个工作表
   - 颜色标记翻译状态
   - 包含上下文信息

2. **CSV** - 适合系统导入
   - 简单格式
   - 易于版本控制

3. **JSON** - 适合开发者
   - 结构化数据
   - 支持嵌套

#### Excel 文件结构示例

```
Skills_translations_zh-CN.xlsx

Sheet 1: Overview
| Code        | Title (EN) | Title (zh-CN) | Status    | Last Updated |
|-------------|------------|---------------|-----------|--------------|
| critical-thinking | Critical Thinking | 批判性思维 | PUBLISHED | 2025-02-24 |

Sheet 2: Details
| Code | Field | English | zh-CN | Notes |
|------|-------|---------|-------|-------|
| critical-thinking | title | Critical Thinking | 批判性思维 | Main heading |
| critical-thinking | description | ... | ... | Max 200 chars |
```

#### 实施步骤

```bash
# 安装依赖
npm install xlsx csv-parse csv-stringify

# 创建工具
mkdir -p src/lib/translation-tools
touch export.ts
touch import.ts
```

### Phase 4: 翻译仪表板 (预计 3-4 天)

#### 页面结构

```
src/app/admin/translations/
├── page.tsx                   # 总览仪表板
├── skills/
│   ├── page.tsx              # Skills 翻译列表
│   └── [code]/
│       └── page.tsx          # 单个技能翻译编辑器
├── practices/
│   └── [similar]
├── articles/
│   └── [similar]
└── export/
    └── page.tsx              # 导入/导出界面
```

#### 仪表板功能

1. **进度概览**
   - 总体翻译完成度
   - 每种语言的进度
   - 待翻译内容列表

2. **翻译编辑器**
   - 并排视图（英文 vs 目标语言）
   - 实时保存
   - 状态切换
   - 历史记录

3. **批量操作**
   - 批量导入
   - 批量导出
   - 批量发布

### Phase 5: 内容迁移 (预计 1 天)

#### 迁移步骤

```bash
# 1. 备份现有数据
npx prisma db pull  # 备份到本地

# 2. 运行迁移
npx prisma migrate deploy

# 3. 验证数据
npx prisma studio
# 检查 meta_skill_translations 表

# 4. 更新应用代码
# 使用新的翻译函数替换旧的硬编码

# 5. 测试
npm run dev
# 访问 /en/skills, /zh-CN/skills 等
```

### Phase 6: 部署和测试 (预计 1 天)

#### 部署清单

- [ ] 在staging环境测试
- [ ] 运行所有迁移
- [ ] 验证翻译显示正确
- [ ] 测试fallback机制
- [ ] 性能测试
- [ ] 部署到生产环境

#### 测试计划

```bash
# 功能测试
curl https://staging.metaskills.ai/en/skills
curl https://staging.metaskills.ai/zh-CN/skills
curl https://staging.metaskills.ai/de/skills

# 性能测试
ab -n 1000 -c 10 https://staging.metaskills.ai/en/skills

# 数据验证
SELECT * FROM translation_status_overview;
```

---

## 🎯 快速开始：立即使用

### 选项 A：测试新架构（推荐）

```bash
# 1. 创建测试分支
git checkout -b feature/translation-system

# 2. 运行迁移
npx prisma migrate deploy

# 3. 生成 Prisma Client
npx prisma generate

# 4. 启动开发服务器
npm run dev

# 5. 测试翻译功能
# 访问 http://localhost:3000/en/skills
```

### 选项 B：查看数据

```bash
# 启动 Prisma Studio
npx prisma studio

# 查看新表
# - meta_skill_translations
# - practice_translations
# - article_translations
```

---

## 📚 关键文件位置

| 文件 | 路径 | 状态 |
|------|------|------|
| Schema | [prisma/schema.prisma](../prisma/schema.prisma) | ✅ 完成 |
| 迁移脚本 | [prisma/migrations/20250224000000_add_translation_tables/migration.sql](../prisma/migrations/20250224000000_add_translation_tables/migration.sql) | ✅ 完成 |
| 翻译库 | [src/lib/translations.ts](../src/lib/translations.ts) | ✅ 完成 |
| Skills 页面 | [src/app/[locale]/skills/page.tsx](../src/app/[locale]/skills/page.tsx) | ⚠️ 需更新 |
| 文档 | [docs/TRANSLATION_STRATEGY.md](TRANSLATION_STRATEGY.md) | ✅ 完成 |

---

## 🚀 下一步行动

### 立即行动（今天）

1. **审查架构** - 查看本指南和 schema
2. **运行迁移** - 在本地测试数据库结构
3. **测试翻译库** - 运行示例查询

### 本周内

1. **实施 CMS API** - 创建翻译管理端点
2. **构建导入导出** - Excel/CSV 工具
3. **创建仪表板UI** - 管理界面

### 两周内

1. **完成内容迁移** - 所有现有数据
2. **添加测试翻译** - 中英文示例
3. **性能优化** - 缓存调优
4. **文档完善** - 使用指南

---

## 💡 常见问题

### Q: 为什么选择翻译表而不是JSON字段？

**A**: 长期可扩展性考虑：

1. **更好的数据规范化** - 符合数据库最佳实践
2. **灵活的工作流** - 支持审核、版本控制
3. **易于查询** - 可以高效搜索和统计
4. **CMS 友好** - 非技术人员容易管理
5. **SEO 支持** - 每种语言独立SEO字段

### Q: 现有数据会丢失吗？

**A**: 不会！迁移脚本会：
- 自动将现有内容迁移到新表
- 设置为英语翻译（PUBLISHED状态）
- 保留所有原始数据

### Q: 性能会受影响吗？

**A**: 不会！通过以下优化：
- 智能缓存（5分钟TTL）
- SQL级JOIN（单次查询）
- 数据库索引
- 可配置的缓存预热

### Q: 如何添加新语言？

**A**: 非常简单：
1. 在 `src/i18n/locales.ts` 添加语言代码
2. 使用CMS API或导入工具添加翻译
3. 无需修改数据库结构

---

## 📞 支持

如有问题，请查看：
- [Prisma 文档](https://www.prisma.io/docs)
- [next-intl 文档](https://next-intl-docs.vercel.app/)
- [项目文档](../README.md)

---

**文档更新时间**: 2025-02-24
**当前状态**: Phase 1 完成 (4/7)
**预计完成时间**: 2025-03-10 (Phase 2-6)
