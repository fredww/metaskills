#!/bin/bash

# Vercel Postgres 数据库迁移和部署脚本
# 使用方法: ./scripts/deploy-vercel-db.sh

set -e

echo "🚀 Vercel Postgres 部署脚本"
echo "================================"

# 检查是否已登录 Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ 请先登录 Vercel: vercel login"
    exit 1
fi

# 检查是否已链接项目
if [ ! -f ".vercel/project.json" ]; then
    echo "📦 链接到 Vercel 项目..."
    vercel link
fi

echo ""
echo "📋 步骤 1: 创建/检查 Vercel Postgres 数据库"
echo "----------------------------------------"
vercel postgres create || echo "✅ 数据库已存在"

echo ""
echo "📋 步骤 2: 将环境变量注入到本地环境"
echo "----------------------------------------"
vercel env pull .env.local

echo ""
echo "📋 步骤 3: 生成 Prisma Client"
echo "----------------------------------------"
npx prisma generate

echo ""
echo "📋 步骤 4: 推送数据库 Schema 到云端"
echo "----------------------------------------"
# 使用 DIRECT_URL 进行 schema 推送（避免连接池问题）
npx prisma db push

echo ""
echo "📋 步骤 5: 运行数据种子（可选）"
echo "----------------------------------------"
read -p "是否运行数据种子？(y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma db seed
fi

echo ""
echo "📋 步骤 6: 部署到 Vercel"
echo "----------------------------------------"
vercel --prod

echo ""
echo "✅ 部署完成！"
echo ""
echo "📝 重要提示:"
echo "  1. 在 Vercel Dashboard 中设置环境变量:"
echo "     - DATABASE_URL=@postgres_url"
echo "     - DIRECT_URL=@postgres_url_non_pooling"
echo "     - NEXTAUTH_SECRET=$(openssl rand -base64 32)"
echo "     - NEXTAUTH_URL=https://your-domain.vercel.app"
echo ""
echo "  2. 本地开发时使用: vercel dev"
echo "  3. 数据库管理: https://vercel.com/storage"
