# Translation CMS API Documentation

完整的翻译管理 API 端点文档和使用示例。

## 📋 目录

- [快速开始](#快速开始)
- [进度监控](#进度监控)
- [Skills 翻译管理](#skills-翻译管理)
- [Practices 翻译管理](#practices-翻译管理)
- [Articles 翻译管理](#articles-翻译管理)
- [导入/导出](#导入导出)

---

## 🚀 快速开始

### 基础 URL

```
http://localhost:3000/api/translations
```

### 认证

所有 API 端点需要管理员权限（待实施）：

```javascript
headers: {
  'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
}
```

---

## 📊 进度监控

### 1. 获取总体翻译状态

```http
GET /api/translations
```

**响应示例**:
```json
{
  "totalSkills": 8,
  "totalPractices": 24,
  "totalArticles": 10,
  "translatedSkills": 8,
  "translatedPractices": 24,
  "translatedArticles": 5,
  "overallPercentage": 89
}
```

### 2. 获取特定类型进度

```http
GET /api/translations?type=skills
```

**响应示例**:
```json
{
  "contentType": "skills",
  "items": [
    {
      "itemCode": "critical-thinking",
      "hasEn": 1,
      "hasZhCn": 1,
      "hasDe": 0,
      "hasJa": 0,
      "hasFr": 0,
      "hasEs": 0,
      "hasKo": 0,
      "totalTranslations": 2,
      "requiredTranslations": 7,
      "percentage": 29
    }
  ],
  "total": 8,
  "translated": 1,
  "averagePercentage": 29
}
```

---

## 🎯 Skills 翻译管理

### 1. 获取所有技能翻译列表

```http
GET /api/translations/skills
```

**查询参数**:
- `locale` (可选): 过滤特定语言
- `status` (可选): 过滤状态 (DRAFT, PENDING, REVIEWED, PUBLISHED)

**示例**:
```bash
# 获取所有中文翻译
GET /api/translations/skills?locale=zh-CN

# 获取所有已发布的翻译
GET /api/translations/skills?status=PUBLISHED
```

**响应**:
```json
{
  "total": 16,
  "translations": [
    {
      "id": "clm...",
      "skillId": "clm...",
      "locale": "zh-CN",
      "status": "PUBLISHED",
      "title": "批判性思维",
      "description": "客观分析和评估以形成判断",
      "definition": "清晰理性地思考...",
      "whyImportant": "批判性思维对于...",
      "skill": {
        "code": "critical-thinking",
        "domain": "COGNITIVE",
        "stage": 3
      },
      "publishedAt": "2025-02-24T04:00:00.000Z"
    }
  ]
}
```

### 2. 获取单个技能的所有翻译

```http
GET /api/translations/skills/{code}
```

**示例**:
```bash
GET /api/translations/skills/critical-thinking
```

**响应**:
```json
{
  "skill": {
    "id": "clm...",
    "code": "critical-thinking",
    "domain": "COGNITIVE",
    "stage": 3,
    "order": 1
  },
  "translations": [
    {
      "id": "clm...",
      "locale": "en",
      "status": "PUBLISHED",
      "title": "Critical Thinking",
      "description": "Objective analysis...",
      "publishedAt": "2025-02-24T04:00:00.000Z"
    },
    {
      "id": "clm...",
      "locale": "zh-CN",
      "status": "PUBLISHED",
      "title": "批判性思维",
      "description": "客观分析和评估...",
      "publishedAt": "2025-02-24T04:00:00.000Z"
    }
  ],
  "stats": {
    "totalLocales": 7,
    "translated": 2,
    "byStatus": {
      "PUBLISHED": 2,
      "DRAFT": 0
    }
  }
}
```

### 3. 创建或更新翻译

```http
PUT /api/translations/skills/{code}/{locale}
```

**请求体**:
```json
{
  "title": "批判性思维",
  "description": "客观分析和评估以形成判断",
  "definition": "清晰理性地思考，理解观点之间逻辑联系的能力",
  "whyImportant": "批判性思维对于做出明智决策和解决复杂问题至关重要",
  "status": "DRAFT",
  "metaTitle": "批判性思维 - MetaSkills",
  "metaDescription": "掌握批判性思维，提升决策能力"
}
```

**响应**:
```json
{
  "success": true,
  "translation": {
    "id": "clm...",
    "title": "批判性思维",
    "status": "DRAFT",
    "createdAt": "2025-02-24T04:30:00.000Z",
    "updatedAt": "2025-02-24T04:30:00.000Z"
  }
}
```

### 4. 部分更新翻译

```http
PATCH /api/translations/skills/{code}/{locale}
```

**请求体**:
```json
{
  "title": "批判性思维（更新版）",
  "status": "PENDING"
}
```

### 5. 更新翻译状态

```http
PATCH /api/translations/skills/{code}/{locale}/status
```

**请求体**:
```json
{
  "status": "PUBLISHED",
  "reviewedBy": "admin@metaskills.ai"
}
```

**状态流转**:
```
DRAFT → PENDING → REVIEWED → PUBLISHED
  ↓                          ↓
ARCHIVED                ARCHIVED
```

### 6. 删除翻译

```http
DELETE /api/translations/skills/{code}/{locale}
```

**响应**:
```json
{
  "success": true,
  "message": "Translation deleted successfully"
}
```

### 7. 批量创建/更新

```http
POST /api/translations/skills
```

**请求体**:
```json
{
  "translations": [
    {
      "code": "critical-thinking",
      "locale": "zh-CN",
      "title": "批判性思维",
      "description": "...",
      "status": "PUBLISHED"
    },
    {
      "code": "learning-to-learn",
      "locale": "zh-CN",
      "title": "学会学习",
      "description": "...",
      "status": "DRAFT"
    }
  ]
}
```

**响应**:
```json
{
  "success": true,
  "processed": 2,
  "results": [
    {
      "code": "critical-thinking",
      "locale": "zh-CN",
      "success": true,
      "id": "clm..."
    },
    {
      "code": "learning-to-learn",
      "locale": "zh-CN",
      "success": true,
      "id": "clm..."
    }
  ]
}
```

---

## 📚 Practices 翻译管理

### 获取所有练习翻译

```http
GET /api/translations/practices
```

**查询参数**:
- `locale` (可选): 过滤语言
- `status` (可选): 过滤状态
- `skillCode` (可选): 过滤特定技能的练习

**示例**:
```bash
GET /api/translations/practices?skillCode=critical-thinking&locale=zh-CN
```

### 批量创建练习翻译

```http
POST /api/translations/practices
```

**请求体**:
```json
{
  "translations": [
    {
      "practiceId": "clm...",
      "locale": "zh-CN",
      "title": "批判性反思练习",
      "description": "...",
      "instructions": {...},
      "benefits": ["加深理解", "识别偏见"],
      "tips": ["保持开放心态", "质疑假设"],
      "status": "DRAFT"
    }
  ]
}
```

---

## 📰 Articles 翻译管理

### 获取所有文章翻译

```http
GET /api/translations/articles
```

### 批量创建文章翻译

```http
POST /api/translations/articles
```

**请求体**:
```json
{
  "translations": [
    {
      "slug": "critical-thinking-interview",
      "locale": "zh-CN",
      "title": "批判性思维专家访谈",
      "content": "...",
      "excerpt": "我们采访了...",
      "status": "PUBLISHED",
      "isPublished": true,
      "publishedAt": "2025-02-24T04:00:00.000Z"
    }
  ]
}
```

---

## 📥📤 导入/导出

### 导出翻译数据

```http
GET /api/translations/export?type={type}&locale={locale}&format={format}
```

**参数**:
- `type`: `skills` | `practices` | `articles`
- `locale`: `en` | `zh-CN` | `de` | `ja` | `fr` | `es` | `ko` | `all`
- `format`: `json` (xlsx, csv coming soon)

**示例**:
```bash
# 导出所有中文技能翻译
GET /api/translations/export?type=skills&locale=zh-CN&format=json

# 导出所有语言的所有翻译
GET /api/translations/export?type=skills&locale=all&format=json
```

**响应**:
```json
{
  "type": "skills",
  "locale": "zh-CN",
  "exportDate": "2025-02-24T04:30:00.000Z",
  "total": 8,
  "data": [
    {
      "id": "clm...",
      "skillId": "clm...",
      "locale": "zh-CN",
      "title": "批判性思维",
      "description": "...",
      "skill": {
        "code": "critical-thinking",
        "domain": "COGNITIVE",
        "stage": 3
      }
    }
  ]
}
```

### 导入翻译数据

```http
POST /api/translations/import
```

**请求**: `multipart/form-data`

**字段**:
- `file`: JSON 文件
- `type`: `skills` | `practices` | `articles`
- `locale`: 目标语言代码

**示例** (使用 cURL):
```bash
curl -X POST http://localhost:3000/api/translations/import \
  -F "file=@translations_zh-CN.json" \
  -F "type=skills" \
  -F "locale=zh-CN"
```

**文件格式** (`translations_zh-CN.json`):
```json
[
  {
    "code": "critical-thinking",
    "title": "批判性思维",
    "description": "客观分析和评估以形成判断",
    "definition": "...",
    "whyImportant": "...",
    "status": "PUBLISHED"
  },
  {
    "code": "learning-to-learn",
    "title": "学会学习",
    "description": "快速有效地学习新事物的能力",
    "definition": "...",
    "whyImportant": "...",
    "status": "DRAFT"
  }
]
```

**响应**:
```json
{
  "success": true,
  "type": "skills",
  "locale": "zh-CN",
  "processed": 2,
  "succeeded": 2,
  "failed": 0,
  "results": [
    {
      "code": "critical-thinking",
      "success": true,
      "id": "clm..."
    },
    {
      "code": "learning-to-learn",
      "success": true,
      "id": "clm..."
    }
  ]
}
```

---

## 🔧 使用示例

### JavaScript/TypeScript

```typescript
// 获取翻译进度
const response = await fetch('/api/translations');
const status = await response.json();
console.log(`Overall progress: ${status.overallPercentage}%`);

// 创建新的中文翻译
const createResponse = await fetch('/api/translations/skills/critical-thinking/zh-CN', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: '批判性思维',
    description: '客观分析和评估以形成判断',
    status: 'DRAFT'
  })
});

const result = await createResponse.json();
console.log('Created translation:', result.translation.id);

// 更新状态为已发布
const publishResponse = await fetch('/api/translations/skills/critical-thinking/zh-CN/status', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'PUBLISHED',
    reviewedBy: 'admin@metaskills.ai'
  })
});
```

### Python

```python
import requests

# 获取总体状态
response = requests.get('http://localhost:3000/api/translations')
status = response.json()
print(f"Overall progress: {status['overallPercentage']}%")

# 创建翻译
translation_data = {
    "title": "批判性思维",
    "description": "客观分析和评估以形成判断",
    "status": "DRAFT"
}

response = requests.put(
    'http://localhost:3000/api/translations/skills/critical-thinking/zh-CN',
    json=translation_data
)

result = response.json()
print(f"Created translation: {result['translation']['id']}")
```

### cURL

```bash
# 获取技能翻译列表
curl -X GET http://localhost:3000/api/translations/skills?locale=zh-CN

# 创建新翻译
curl -X PUT http://localhost:3000/api/translations/skills/critical-thinking/zh-CN \
  -H "Content-Type: application/json" \
  -d '{
    "title": "批判性思维",
    "description": "客观分析和评估以形成判断",
    "status": "DRAFT"
  }'

# 更新状态
curl -X PATCH http://localhost:3000/api/translations/skills/critical-thinking/zh-CN/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "PUBLISHED",
    "reviewedBy": "admin@metaskills.ai"
  }'

# 导出翻译
curl -X GET "http://localhost:3000/api/translations/export?type=skills&locale=zh-CN&format=json" \
  -o skills_zh-CN.json

# 导入翻译
curl -X POST http://localhost:3000/api/translations/import \
  -F "file=@skills_zh-CN.json" \
  -F "type=skills" \
  -F "locale=zh-CN"
```

---

## ⚠️ 错误处理

所有端点返回标准错误格式：

```json
{
  "error": "Error message",
  "details": "Detailed error information (optional)"
}
```

**HTTP 状态码**:
- `200` - 成功
- `400` - 请求参数错误
- `404` - 资源未找到
- `500` - 服务器错误

---

## 🧪 测试

### 使用 Postman

1. 导入以下集合到 Postman
2. 设置环境变量：`BASE_URL=http://localhost:3000/api/translations`

### 使用测试脚本

```bash
# 运行 API 测试（需要创建）
npm run test:api
```

---

## 📚 相关文档

- [翻译库文档](../src/lib/translations.ts)
- [实施指南](TRANSLATION_IMPLEMENTATION_GUIDE.md)
- [策略文档](TRANSLATION_STRATEGY.md)

---

**最后更新**: 2025-02-24
