#!/bin/bash

# MetaSkills Web - Vercel 快速部署脚本
# 使用方法: chmod +x deploy-vercel.sh && ./deploy-vercel.sh

set -e

echo "🚀 MetaSkills Web - Vercel 部署助手"
echo "======================================"
echo ""

# 检查是否已安装 Vercel CLI
if ! command -v vercel &> /dev/null
then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

# 检查环境变量
echo "🔑 生成 NEXTAUTH_SECRET..."
if [ -z "$NEXTAUTH_SECRET" ]
then
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    echo "生成的密钥: $NEXTAUTH_SECRET"
    echo "⚠️  请保存此密钥，稍后需要添加到环境变量中"
fi

echo ""
echo "📋 部署前检查清单："
echo "1. ✅ Vercel CLI 已安装"
echo "2. ⚠️  是否已创建数据库？"
echo "   - Vercel Postgres (推荐): https://vercel.com/docs/storage/vercel-postgres"
echo "   - Supabase: https://supabase.com"
echo "   - Neon: https://neon.tech"
echo ""
read -p "按 Enter 继续部署..."

echo ""
echo "🚀 开始部署到 Vercel..."
echo ""

# 部署到 Vercel
vercel

echo ""
echo "✅ 部署完成！"
echo ""
echo "📝 下一步："
echo "1. 在 Vercel Dashboard 中配置环境变量："
echo "   - DATABASE_URL"
echo "   - NEXTAUTH_SECRET (使用上面生成的密钥)"
echo "   - NEXTAUTH_URL"
echo "   - NEXT_PUBLIC_SITE_URL"
echo ""
echo "2. 运行数据库迁移："
echo "   vercel exec npx prisma db push"
echo ""
echo "3. 设置管理员账号（需要手动创建或通过 API）"
echo ""
echo "🎉 详细部署指南请查看: DEPLOYMENT.md"
