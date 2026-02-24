# Vercel 部署指南 - 数据库配置

## 📚 目录

- [数据库选项](#数据库选项)
- [方案一：Vercel Postgres（推荐）](#方案一vercel-postgres推荐)
- [方案二：Supabase](#方案二supabase)
- [方案三：Neon](#方案三neon)
- [部署步骤](#部署步骤)
- [常见问题](#常见问题)

---

## 数据库选项

### 对比表

| 提供商 | 免费额度 | 优点 | 缺点 | 推荐场景 |
|--------|----------|------|------|----------|
| **Vercel Postgres** | 60小时/月 | 无缝集成、自动扩展 | 仅限 Vercel | ⭐️ 首选推荐 |
| **Supabase** | 500MB 存储 | 功能丰富、实时订阅 | 需单独配置 | 需要额外功能 |
| **Neon** | 0.5GB | 无服务器、分支功能 | 较新 | 开发/测试环境 |
| **Railway** | $5/月起 | 简单易用、多服务 | 非亚洲较快 | 微服务架构 |

---

## 方案一：Vercel Postgres（推荐）

### 优点

✅ 与 Vercel 无缝集成，自动环境变量
✅ 自动扩展，按需付费
✅ 内置连接池（PgBouncer）
✅ 接近零冷启动
✅ 自动备份

### 步骤 1: 创建数据库

#### 方法 A: 通过 Vercel Dashboard

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入你的项目
3. 点击 **Storage** → **Create Database**
4. 选择 **Postgres**
5. 配置：
   - **Region**: `Singapore` 或 `Tokyo`（亚洲用户推荐）
   - **Name**: `metaskills-db`
6. 点击 **Create**

#### 方法 B: 通过 CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 链接项目
vercel link

# 创建数据库
vercel postgres create
```

### 步骤 2: 配置环境变量

创建数据库后，Vercel 会自动添加以下环境变量：

```bash
POSTGRES_URL                # 主连接字符串（包含连接池）
POSTGRES_PRISMA_URL         # Prisma 专用连接字符串
POSTGRES_URL_NON_POOLING    # 无连接池连接（用于迁移）
POSTGRES_USER               # 数据库用户
POSTGRES_PASSWORD           # 数据库密码
POSTGRES_DATABASE           # 数据库名称
```

#### 在 Vercel Dashboard 中设置：

进入 **Settings** → **Environment Variables**，添加：

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `@postgres_url` | Production, Preview |
| `DIRECT_URL` | `@postgres_url_non_pooling` | Production, Preview |
| `NEXTAUTH_SECRET` | `<generated-secret>` | All |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Production |

**生成 NEXTAUTH_SECRET：**
```bash
openssl rand -base64 32
```

### 步骤 3: 本地开发配置

#### 选项 A: 使用云端数据库（推荐）

```bash
# 拉取 Vercel 环境变量到本地
vercel env pull .env.local

# 生成 Prisma Client
npx prisma generate

# 推送 schema
npx prisma db push
```

#### 选项 B: 继续使用本地数据库

保持 `.env.local` 中的本地 `DATABASE_URL`，只在部署时使用云端。

### 步骤 4: 部署

```bash
# 使用提供的自动化脚本
./scripts/deploy-vercel-db.sh

# 或手动部署
npx prisma generate
vercel --prod
```

### 步骤 5: 验证

```bash
# 查看数据库日志
vercel logs

# 在 Vercel Dashboard 查看 Storage 状态
```

---

## 方案二：Supabase

### 优点

✅ 丰富的功能（认证、存储、实时）
✅ 生成式 AI 友好
✅ 开源
✅ 慷慨的免费额度

### 步骤 1: 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 点击 **New Project**
3. 配置：
   - **Name**: `metaskills`
   - **Database Password**: （生成强密码）
   - **Region**: `Southeast Asia (Singapore)`
4. 等待数据库创建（2-3分钟）

### 步骤 2: 获取连接字符串

在 Supabase 项目中：

1. 进入 **Settings** → **Database**
2. 找到 **Connection string** → **URI**
3. 选择 **Session pooling** 或 **Transaction pooling**
4. 复制连接字符串：

```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres
```

### 步骤 3: 配置环境变量

在 Vercel Dashboard 中添加：

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres?pgbouncer=true` | Production |
| `DIRECT_URL` | `postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres` | Production |
| `NEXTAUTH_SECRET` | `<generated>` | All |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Production |

**注意：**
- `DATABASE_URL` 添加 `?pgbouncer=true` 启用连接池
- `DIRECT_URL` 不添加，用于数据库迁移

### 步骤 4: 部署

```bash
# 推送 schema 到 Supabase
DATABASE_URL="postgresql://..." npx prisma db push

# 部署到 Vercel
vercel --prod
```

---

## 方案三：Neon

### 优点

✅ 无服务器 PostgreSQL
✅ 数据库分支功能
✅ 自动休眠节省成本
✅ 快速扩展

### 步骤 1: 创建 Neon 项目

1. 访问 [Neon](https://neon.tech)
2. 点击 **Create a project**
3. 配置：
   - **Name**: `metaskills`
   - **Region**: `ap-southeast-1` (Singapore)
4. 创建后复制连接字符串

### 步骤 2: 配置环境变量

在 Vercel 中添加：

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `postgresql://...pooler.neon.tech/neondb?sslmode=require` | Production |
| `DIRECT_URL` | `postgresql://...neon.tech/neondb?sslmode=require` | Production |

**注意：**
- `DATABASE_URL` 使用 `-pooler` 端点（连接池）
- `DIRECT_URL` 使用默认端点（用于迁移）

### 步骤 3: 部署

```bash
npx prisma db push
vercel --prod
```

---

## 部署步骤

### 使用自动化脚本（推荐）

```bash
# 运行自动化脚本
./scripts/deploy-vercel-db.sh
```

脚本会自动完成：
1. ✅ 检查 Vercel 登录状态
2. ✅ 创建/检查 Vercel Postgres 数据库
3. ✅ 拉取环境变量到本地
4. ✅ 生成 Prisma Client
5. ✅ 推送数据库 schema
6. ✅ 运行数据种子（可选）
7. ✅ 部署到 Vercel

### 手动部署

```bash
# 1. 链接到 Vercel（如果未链接）
vercel link

# 2. 创建数据库
vercel postgres create

# 3. 拉取环境变量
vercel env pull .env.local

# 4. 生成 Prisma Client
npx prisma generate

# 5. 推送 schema 到云端数据库
npx prisma db push

# 6. 运行种子数据（可选）
npx prisma db seed

# 7. 部署
vercel --prod
```

### 在 Vercel Dashboard 中设置环境变量

1. 进入项目 **Settings** → **Environment Variables**
2. 添加以下变量：

```bash
DATABASE_URL=@postgres_url
DIRECT_URL=@postgres_url_non_pooling
NEXTAUTH_SECRET=<生成的密钥>
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

3. 确保应用到所有环境：`Production`, `Preview`, `Development`

---

## 常见问题

### Q1: 本地开发时如何使用云端数据库？

**方法 A: 使用 `vercel env pull`（推荐）**

```bash
# 拉取生产环境变量
vercel env pull .env.local

# 本地开发时就会使用云端数据库
npm run dev
```

**方法 B: 使用本地数据库**

保持 `.env.local` 中的本地 `DATABASE_URL`，只在部署时使用云端。

### Q2: 如何在 Vercel 中运行数据库迁移？

Vercel Postgres 使用 `prisma db push` 而不是迁移：

```bash
# 开发环境
npx prisma db push

# 或者使用 Vercel CLI
vercel env pull .env.local
npx prisma db push
```

如果需要真正的迁移：

```bash
# 创建迁移
npx prisma migrate dev --name init

# 应用到生产环境
npx prisma migrate deploy
```

### Q3: 数据库连接超时怎么办？

确保使用连接池：

**Vercel Postgres：** 自动配置连接池 ✅

**Supabase：**
```bash
DATABASE_URL="...?pgbouncer=true"
```

**Neon：**
```bash
DATABASE_URL="...pooler.neon.tech/..."
```

### Q4: 如何备份数据？

**Vercel Postgres：** 自动备份，保留 7 天

**Supabase：**
- Dashboard → Database → Backups
- 或使用 CLI：`supabase db dump`

**Neon：**
- 自动备份
- 或使用：`pg_dump`

### Q5: 如何监控数据库性能？

**Vercel Postgres：**
- Dashboard → Storage → Metrics

**Supabase：**
- Dashboard → Database → Metrics

**通用方法：**
在代码中启用查询日志：

```typescript
// lib/prisma.ts
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
```

### Q6: 如何恢复/重置数据库？

```bash
# 重置数据库（删除所有数据）
npx prisma migrate reset

# 或手动推送 schema
npx prisma db push --force-reset
```

### Q7: 部署后出现数据库连接错误？

检查清单：

1. ✅ 环境变量是否正确设置
2. ✅ `DIRECT_URL` 是否配置（用于迁移）
3. ✅ 数据库区域是否合适（延迟）
4. ✅ 是否使用了连接池
5. ✅ Vercel 部署日志中是否有错误

```bash
# 查看 Vercel 部署日志
vercel logs --prod
```

---

## 🎯 下一步

1. ✅ 选择数据库提供商（推荐 Vercel Postgres）
2. ✅ 运行 `./scripts/deploy-vercel-db.sh`
3. ✅ 在 Vercel Dashboard 设置环境变量
4. ✅ 验证部署是否成功

---

## 📞 获取帮助

- **Vercel 文档**: https://vercel.com/docs/storage/vercel-postgres
- **Prisma 文档**: https://www.prisma.io/docs
- **Supabase 文档**: https://supabase.com/docs
- **Neon 文档**: https://neon.tech/docs

---

## 🔗 相关链接

- [Prisma Vercel 集成](https://www.prisma.io/docs/guides/deployment/vercel)
- [NextAuth.js Vercel 部署](https://next-auth.js.org/deployment)
- [Vercel 环境变量](https://vercel.com/docs/projects/environment-variables)
