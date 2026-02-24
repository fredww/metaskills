# Cloudflare 多语言域名配置指南

## 📋 概述

本指南将帮助你使用 Cloudflare DNS 配置 MetaSkills 的多语言站点。我们使用的是**子路径方案**（Subdirectory Approach），这是 Google 推荐的最佳实践。

### 当前 URL 结构

```
https://www.metaskills.ai/           (英语，默认)
https://www.metaskills.ai/zh-CN/     (简体中文)
https://www.metaskills.ai/de/        (德语)
https://www.metaskills.ai/ja/        (日语)
https://www.metaskills.ai/fr/        (法语)
https://www.metaskills.ai/es/        (西班牙语)
https://www.metaskills.ai/ko/        (韩语)
```

---

## 🎯 为什么选择子路径而不是子域名？

### ✅ 子路径的优势（当前方案）

1. **SEO 友好** - Google 明确推荐子路径方案
2. **域名权重集中** - 所有语言版本共享同一个域名的 SEO 权重
3. **易于维护** - 只需要一个 SSL 证书
4. **部署简单** - 单一部署，无需多个环境

### ❌ 子域名的劣势（不推荐）

```
❌ https://en.metaskills.ai/
❌ https://zh-CN.metaskills.ai/
```

1. **需要多个 SSL 证书**（或使用通配符证书）
2. **SEO 权重分散** - 每个子域名需要独立建立权威性
3. **部署复杂** - 需要配置多个域名指向
4. **Google 不推荐** - 对于翻译内容，子路径更优

---

## 🚀 Cloudflare DNS 配置步骤

### 步骤 1：登录 Cloudflare

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择你的域名 `metaskills.ai`

### 步骤 2：检查当前 DNS 记录

你的 DNS 配置应该已经包含以下记录：

```
Type    Name              Content                    Proxy Status
A       www               [你的 Vercel IP]           Proxied (橙云)
A       @ (root)          [你的 Vercel IP]           Proxied (橙云)
CNAME   * (wildcard)      [Vercel 域名]              Proxied (橙云)
```

### 步骤 3：验证配置（当前方案已就绪）

✅ **好消息**：由于我们使用子路径方案，你**不需要**添加任何额外的 DNS 记录！

所有语言版本都通过同一个域名（`www.metaskills.ai`）访问，路径差异由 Next.js 应用内部的路由处理。

---

## 🔧 高级配置（可选）

### 方案 A：添加国家/地区特定域名（如果需要）

如果你将来想要为特定市场使用独立域名，可以按以下方式配置：

#### 示例：为中文市场添加独立域名

```
1. 添加域名：metaskills.cn（中文市场）
2. DNS 记录：
   Type: CNAME
   Name: www
   Content: metaskills.ai
   Proxy: Proxied (橙云)
```

然后在 Vercel 中将该域名添加到项目中。

#### 示例：为德语市场添加本地域名

```
1. 添加域名：metaskills.de（德语市场）
2. DNS 记录：
   Type: CNAME
   Name: www
   Content: metaskills.ai
   Proxy: Proxied (橙云)
```

### 方案 B：配置区域特定的负载均衡（高级）

如果需要为不同地区提供更快的访问速度：

#### 1. 创建 Cloudflare Load Balancer

```
1. 在 Cloudflare Dashboard 中：
   Traffic → Load Balancing → Create Load Balancer

2. 配置：
   Hostname: www.metaskills.ai
   Regions: 根据用户位置分配
```

#### 2. 设置区域健康检查

```
Pool 1: US East (维吉尼亚)
Pool 2: EU West (法兰克福)
Pool 3: Asia Pacific (东京)
```

---

## 🌐 语言检测和重定向配置

### 自动语言检测（已实现）

你的 Next.js 应用已经通过 `middleware.ts` 实现了自动语言检测：

1. **Accept-Language 头部** - 根据浏览器语言设置自动重定向
2. **Cookie 记忆** - 记住用户选择的语言
3. **URL 路径** - 显式语言选择（如 `/zh-CN/`）

### Cloudflare 页面规则（可选）

如果你想为特定地区添加强制重定向：

```
规则 1：中文用户自动重定向到中文版本
├── 如果访问者国家：CN, MO, TW, HK, SG
├── 且 URL 路径：/
└── 则重定向到：/zh-CN/

规则 2：德语用户
├── 如果访问者国家：DE, AT, CH
├── 且 URL 路径：/
└── 则重定向到：/de/
```

**注意**：这不是必需的，因为你的应用已经内置了语言检测。

---

## 📊 监控和分析

### 1. Cloudflare Analytics

访问 Cloudflare Dashboard 查看：

```
1. Traffic → Analytics
2. 过滤器：
   - 按国家/地区查看流量
   - 按路径模式查看（如 `/zh-CN/*`）
   - 按语言设置查看
```

### 2. 为不同语言设置 UTM 参数

跟踪不同语言版本的流量：

```
English:  https://www.metaskills.ai/?utm_source=google&utm_lang=en
Chinese:  https://www.metaskills.ai/zh-CN/?utm_source=google&utm_lang=zh-CN
German:   https://www.metaskills.ai/de/?utm_source=google&utm_lang=de
```

### 3. A/B 测试不同语言版本

使用 Cloudflare A/B 测试功能：

```
Traffic → A/B Testing → Create Test

测试名称：Language Localization Impact
目标 URL：/
测试方案：
  - 方案 A：默认英语
  - 方案 B：根据地区自动重定向

指标：
  - 跳出率
  - 页面停留时间
  - 转化率
```

---

## 🔒 安全配置

### 1. 启用 Cloudflare Bot Fight Mode

```
Security → Bots → Toggle "Bot Fight Mode"
```

保护所有语言版本免受恶意爬虫攻击。

### 2. 配置 WAF 规则

为不同地区设置特定规则：

```
Security → WAF → Custom Rules

规则：限制特定国家对 API 的访问
If:
  - URI Path contains "/api/"
  - Country not in [US, GB, CA, DE, CN, JP]
Then:
  - Block
```

### 3. Rate Limiting

防止 API 滥用：

```
Security → Rate Limiting → Create Rate Limit

规则：API 请求限制
When:
  - URI Path contains "/api/"
Then:
  - Limit to 100 requests per minute
  - Period: 1 minute
```

---

## 🚦 CDN 缓存配置

### 为多语言内容优化缓存

```
Caching → Configuration → Browser Cache TTL

设置：1 year（对于静态资源）

Caching → Configuration → Cache Level

设置：Standard（缓存 HTML、CSS、JS）
```

### 缓存键配置

确保不同语言版本有独立的缓存：

```
Page Rules → Create Page Rule

规则 1：中文内容独立缓存
URL: www.metaskills.ai/zh-CN/*
Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month

规则 2：德语内容独立缓存
URL: www.metaskills.ai/de/*
Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
```

---

## 📈 性能优化

### 1. 启用 HTTP/3

```
Network → HTTP/3 → Toggle "On"
```

所有语言版本都会受益于更快的连接。

### 2. 启用 Auto Minify

```
Speed → Optimization → Auto Minify

✅ JavaScript
✅ CSS
✅ HTML
```

### 3. Rocket Loader

```
Speed → Optimization → Rocket Loader → Toggle "On"
```

加速所有语言版本的 JavaScript 加载。

### 4. Brotli 压缩

```
Speed → Optimization → Brotli → Toggle "On"
```

压缩所有语言内容，减少传输大小。

---

## 🌍 国际化 SEO 配置

### Hreflang 标签（已在应用中实现）

你的应用已经通过 `next-intl` 自动生成了正确的 hreflang 标签。验证：

```bash
# 检查首页
curl -s https://www.metaskills.ai/ | grep -i "hreflang"

# 应该看到：
<link rel="alternate" hreflang="en" href="https://www.metaskills.ai/" />
<link rel="alternate" hreflang="zh-CN" href="https://www.metaskills.ai/zh-CN/" />
<link rel="alternate" hreflang="de" href="https://www.metaskills.ai/de/" />
...
```

### Sitemap 配置

确保你的 sitemap.xml 包含所有语言版本：

访问：`https://www.metaskills.ai/sitemap.xml`

应该看到所有语言的 URL 列表。

---

## 🔍 验证和测试

### 测试清单

- [ ] **测试 1**：访问 `https://www.metaskills.ai/` - 应显示英语（或根据浏览器语言）
- [ ] **测试 2**：访问 `https://www.metaskills.ai/zh-CN/` - 应显示简体中文
- [ ] **测试 3**：访问 `https://www.metaskills.ai/de/` - 应显示德语
- [ ] **测试 4**：测试语言切换器 - 应正确切换语言并更新 URL
- [ ] **测试 5**：检查浏览器语言检测 - 改变浏览器语言设置，重新访问
- [ ] **测试 6**：验证所有页面的翻译 - 确保没有遗漏的硬编码文本
- [ ] **测试 7**：检查 SEO 标签 - 使用浏览器开发工具查看 `<head>` 标签
- [ ] **测试 8**：测试移动端响应式 - 在不同设备上测试

### 使用命令行测试

```bash
# 测试中文版本
curl -I https://www.metaskills.ai/zh-CN/

# 应该返回：
# HTTP/2 200
# content-language: zh-CN

# 测试德语版本
curl -I https://www.metaskills.ai/de/

# 应该返回：
# HTTP/2 200
# content-language: de
```

---

## 📝 故障排除

### 问题 1：某些语言版本返回 404

**可能原因**：
- DNS 配置错误（对于子路径方案不太可能）
- Vercel 部署未完成
- 缓存问题

**解决方案**：
```bash
# 1. 清除 Cloudflare 缓存
Caching → Configuration → Purge Everything

# 2. 检查 Vercel 部署状态
vercel list

# 3. 重新部署
vercel --prod
```

### 问题 2：语言切换不工作

**可能原因**：
- Cookie 被阻止
- JavaScript 错误
- 中间件配置问题

**解决方案**：
```javascript
// 检查浏览器控制台是否有错误
// 清除浏览器 Cookies
// 测试无 Cookie 模式
```

### 问题 3：SEO 标签不正确

**检查步骤**：
```bash
# 1. 验证 sitemap
curl https://www.metaskills.ai/sitemap.xml

# 2. 使用 Google Search Console 验证
https://search.google.com/search-console

# 3. 使用富媒体结果测试
https://search.google.com/test/rich-results
```

---

## 📚 相关文档

- [Vercel 自定义域名文档](https://vercel.com/docs/custom-domains)
- [Cloudflare DNS 文档](https://developers.cloudflare.com/dns/)
- [Google 多语言 SEO 指南](https://developers.google.com/search/docs/specialty/international)
- [next-intl 文档](https://next-intl-docs.vercel.app/)

---

## 🎯 下一步

### 短期（本周）

1. ✅ **验证部署** - 测试所有语言版本
2. ✅ **配置 Analytics** - 设置 Google Analytics 4 跟踪
3. ⬜ **提交 Sitemap** - 向 Google Search Console 提交

### 中期（本月）

1. ⬜ **A/B 测试** - 测试不同语言版本的转化率
2. ⬜ **本地化审核** - 请母语人士审核翻译质量
3. ⬜ **性能优化** - 监控各语言版本的加载速度

### 长期（本季度）

1. ⬜ **SEO 优化** - 为每种语言进行关键词研究
2. ⬜ **内容本地化** - 创建特定地区的内容
3. ⬜ **市场推广** - 在目标市场进行推广

---

## 💡 最佳实践建议

### 1. URL 结构一致性

```
✅ 好的 URL:
https://www.metaskills.ai/zh-CN/skills/learning-to-learn
https://www.metaskills.ai/de/skills/critical-thinking

❌ 不一致的 URL:
https://www.metaskills.ai/zh-CN/skills/learning-to-learn
https://www.metaskills.ai/de/fertigkeiten/kritisches-denken
```

### 2. 语言切换按钮

始终在页面顶部提供明显的语言切换器，并使用：
- 地球图标 🌍
- 当前语言名称（如 "简体中文"）
- 下拉菜单显示所有可用语言

### 3. 404 页面本地化

确保每种语言都有自己的 404 页面：

```typescript
// /zh-CN/404
"页面未找到"

// /de/404
"Seite nicht gefunden"
```

### 4. 开箱即用的语言检测

不要强迫用户手动选择语言。使用：
- Accept-Language 头部
- IP 地理位置（可选）
- Cookie 记忆用户选择

---

**文档更新时间**: 2025-02-24
**部署状态**: ✅ 已部署到生产环境
**生产 URL**: https://www.metaskills.ai
