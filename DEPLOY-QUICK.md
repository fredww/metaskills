# 🚀 快速部署到 Vercel

## 最简单的方法（5分钟部署）

### 1. 准备数据库

**选项 A：Vercel Postgres（最简单）**
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入项目 → Storage → Create Database
3. 选择 Postgres → Hobby（免费）
4. 创建后会自动获得 `DATABASE_URL`

**选项 B：Supabase（免费）**
1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 复制连接字符串

### 2. 获取密钥

```bash
# 生成 NEXTAUTH_SECRET
openssl rand -base64 32
```

### 3. 部署

**通过 Vercel Dashboard：**

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 导入你的 GitHub 仓库
3. 配置环境变量：

```bash
DATABASE_URL=你的数据库连接字符串
NEXTAUTH_SECRET=上面生成的密钥
NEXTAUTH_URL=https://你的项目名.vercel.app
NEXT_PUBLIC_SITE_URL=https://你的项目名.vercel.app
```

4. 点击 "Deploy"

### 4. 数据库迁移

部署成功后，在本地终端运行：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 连接到项目
vercel link

# 推送数据库结构
npx prisma db push

# 设置管理员（替换为你的邮箱）
npx tsx prisma/admin-seed.ts
```

### 5. 完成！

访问 `https://你的项目名.vercel.app`，使用你设置的邮箱和密码登录。

---

## 🔧 详细配置

查看完整部署文档：[DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📱 部署脚本

我们提供了自动化部署脚本：

```bash
# 赋予执行权限
chmod +x deploy-vercel.sh

# 运行脚本
./deploy-vercel.sh
```

---

## ✅ 验证部署

- [ ] 网站可访问
- [ ] 用户可注册/登录
- [ ] 管理后台正常
- [ ] 数据读写正常
- [ ] API 端点工作正常

---

## 🆘 遇到问题？

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 中的"常见问题"部分。
