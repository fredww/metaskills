# MetaSkills Web - Vercel 部署指南

本文档详细说明如何将 MetaSkills Web 项目部署到 Vercel 平台。

## 📋 部署前准备清单

### 1. 数据库准备

本项目使用 PostgreSQL 数据库，推荐以下选项：

#### 选项 A：Vercel Postgres (推荐)
```bash
# 在 Vercel Dashboard 中
1. 进入你的项目
2. 点击 "Storage" 标签
3. 选择 "Create Database"
4. 选择 "Postgres"
5. 选择合适的计划（免费版支持 256MB，适合开发和小型项目）
6. 创建数据库
```

#### 选项 B：Supabase
```bash
# 访问 https://supabase.com
1. 创建新项目
2. 获取数据库连接字符串
3. 格式：postgresql://postgres:[password]@[host].supabase.co:5432/postgres
```

#### 选项 C：Neon
```bash
# 访问 https://neon.tech
1. 创建新项目
2. 获取连接字符串
```

### 2. 生成 NEXTAUTH_SECRET

```bash
# 在终端运行以下命令生成随机密钥
openssl rand -base64 32
```

### 3. 准备 Git 仓库

确保你的代码已推送到 GitHub/GitLab/Bitbucket。

## 🚀 部署步骤

### 方法一：通过 Vercel Dashboard 部署（推荐）

#### 步骤 1：连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub/GitLab/Bitbucket 账号登录
3. 点击 "Add New Project"

#### 步骤 2：导入项目

1. 选择你的 Git 仓库
2. 选择 `metaskills-web` 目录
3. 点击 "Import"

#### 步骤 3：配置项目

**项目设置**：
- **Project Name**: `metaskills-web` (或自定义)
- **Framework Preset**: Next.js (自动检测)
- **Root Directory**: `./` (保持默认)
- **Build Command**: `npm run build` (自动检测)

**环境变量配置**：

点击 "Environment Variables" 添加以下变量：

| 名称 | 值 | 说明 |
|------|-----|------|
| `DATABASE_URL` | 你的 PostgreSQL 连接字符串 | 必需 |
| `NEXTAUTH_SECRET` | 使用 `openssl rand -base64 32` 生成的密钥 | 必需 |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | 必需 |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` | 必需 |

#### 步骤 4：连接数据库

如果你使用 **Vercel Postgres**：

1. 在项目中点击 "Storage"
2. 点击 "Link Database"
3. 选择或创建 Postgres 数据库
4. Vercel 会自动添加 `DATABASE_URL` 环境变量

如果你使用 **外部数据库**：

1. 复制你的数据库连接字符串
2. 在环境变量中添加 `DATABASE_URL`

#### 步骤 5：数据库迁移

部署后，你需要运行数据库迁移：

```bash
# 在本地终端，设置 Vercel 环境变量
vercel env pull .env.development

# 或者直接在 Vercel Dashboard 中添加环境变量

# 然后运行数据库推送
npx prisma db push

# 或运行迁移
npx prisma migrate deploy
```

#### 步骤 6：设置管理员账号

```bash
# 运行管理员设置脚本
npx tsx prisma/admin-seed.ts
```

#### 步骤 7：部署

点击 "Deploy" 按钮，等待部署完成。

---

### 方法二：通过 Vercel CLI 部署

#### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

#### 步骤 2：登录

```bash
vercel login
```

#### 步骤 3：部署项目

```bash
# 在项目根目录
cd /Users/niaoqing/Sites/ai/metaskills/metaskills-web

# 部署
vercel
```

#### 步骤 4：配置环境变量

```bash
# 添加环境变量
vercel env add DATABASE_URL "your-database-url" production
vercel env add NEXTAUTH_SECRET "your-secret" production
vercel env add NEXTAUTH_URL "https://your-project.vercel.app" production
vercel env add NEXT_PUBLIC_SITE_URL "https://your-project.vercel.app" production
```

#### 步骤 5：重新部署

```bash
vercel --prod
```

---

## 🔧 部署后配置

### 1. 数据库初始化

首次部署后，运行以下命令初始化数据库：

```bash
# 推送数据库 schema
vercel exec npx prisma db push

# 生成 Prisma Client
vercel exec npx prisma generate

# 设置管理员账号
# 你需要创建一个 API 路由来执行这个操作
# 或使用 Prisma Studio 手动设置
```

### 2. 配置自定义域名

1. 在 Vercel Dashboard 中进入项目
2. 点击 "Settings" → "Domains"
3. 添加你的自定义域名
4. 配置 DNS 记录
5. 等待 SSL 证书生成

### 3. 监控和日志

- **查看日志**: Vercel Dashboard → Project → Logs
- **监控**: Vercel Dashboard → Project → Analytics
- **错误追踪**: Vercel Dashboard → Project → Logs → Runtime

---

## 🔄 持续部署

配置完成后，每次推送到主分支都会自动部署：

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel 会自动：
1. 检测到代码变更
2. 运行构建命令
3. 运行测试（如果配置）
4. 部署新版本
5. 更新域名指向

---

## 🎯 重要注意事项

### 数据库连接

确保你的数据库允许来自 Vercel 的连接：

- **Vercel Postgres**: 自动配置
- **Supabase**: 需要在设置中添加 Vercel IP 到白名单
- **其他**: 检查防火墙设置

### 环境变量

⚠️ **安全提示**：
- 永远不要将 `.env` 文件提交到 Git
- 使用不同的 `NEXTAUTH_SECRET` 用于开发和生产
- 定期轮换密钥

### 性能优化

1. **启用 Vercel Analytics**
   - 在 Dashboard 中点击 Analytics
   - 安装脚本到项目

2. **配置图片优化**
   - 使用 Next.js Image 组件
   - 配置图片域名

3. **设置缓存策略**
   - 静态资源自动缓存
   - API 路由可以配置缓存头

---

## 🐛 常见问题

### 1. 构建失败

```bash
# 检查构建日志
vercel logs

# 常见原因：
# - 缺少环境变量
# - Prisma schema 不匹配
# - TypeScript 错误
```

### 2. 数据库连接错误

```bash
# 验证 DATABASE_URL
vercel env ls

# 检查数据库是否允许外部连接
# 测试连接
psql $DATABASE_URL
```

### 3. 运行时错误

```bash
# 查看实时日志
vercel logs --follow

# 常见原因：
# - Prisma Client 未生成
# - 环境变量缺失
# - 数据库迁移未运行
```

---

## 📚 更多资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Prisma Vercel 部署指南](https://www.prisma.io/docs/guides/deployment/vercel)

---

## ✅ 部署检查清单

部署前检查：

- [ ] 数据库已创建并可访问
- [ ] `NEXTAUTH_SECRET` 已生成
- [ ] 所有环境变量已配置
- [ ] `.env` 文件未提交到 Git
- [ ] 项目在本地可成功构建
- [ ] 数据库迁移已测试

部署后验证：

- [ ] 网站可访问
- [ ] 用户注册/登录正常
- [ ] 管理后台可访问
- [ ] 数据库读写正常
- [ ] 所有 API 端点正常工作

---

## 🎉 完成！

你的 MetaSkills 平台现在已经成功部署到 Vercel！

**访问地址**: `https://your-project.vercel.app`

**管理员登录**:
- 邮箱: 你设置的邮箱
- 密码: 你设置的密码
