# Cloudflare 域名配置到 Vercel 指南

## 📋 前置条件

- ✅ 拥有 Cloudflare 账户和域名
- ✅ 拥有 Vercel 项目（已部署）
- ✅ 域名 DNS 托管在 Cloudflare

---

## 🎯 配置步骤总览

### 方法一：推荐配置（保留 Cloudflare 代理）

**优点：**
- 保留 Cloudflare CDN 和防护
- 保留 Cloudflare 缓存
- 可以使用 Cloudflare 的 Page Rules
- 更好的 DDoS 防护

**缺点：**
- 配置稍微复杂一些
- 需要关闭 Cloudflare 的某些优化功能

### 方法二：快速配置（仅 DNS）

**优点：**
- 配置简单快速
- Vercel 处理所有 SSL

**缺点：**
- 失去 Cloudflare CDN 和防护

---

## 📝 方法一：推荐配置（保留 Cloudflare 代理）

### 步骤 1: 在 Vercel 中添加域名

#### 通过 Vercel Dashboard：

1. 访问 https://vercel.com/fredwws-projects/metaskills-web/settings/domains
2. 点击 **Add Domain**
3. 输入你的域名（例如：`metaskills.com` 或 `www.metaskills.com`）
4. 点击 **Add**

#### 通过 Vercel CLI：

```bash
# 添加根域名
vercel domains add metaskills.com

# 添加 www 子域名
vercel domains add www.metaskills.com
```

Vercel 会提供 DNS 记录信息，例如：

```
Add the following DNS records to your DNS provider:

Type: A
Name: @
Value: 76.76.21.21

Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**注意这些 IP 地址和 CNAME，下一步会用到。**

---

### 步骤 2: 在 Cloudflare 配置 DNS

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择你的域名
3. 进入 **DNS** → **Records**
4. 添加以下记录：

#### 对于根域名（@ 或 metaskills.com）：

**选项 A: 使用 A 记录（推荐用于根域名）**

| Type | Name | IPv4 address | Proxy status | TTL |
|------|------|--------------|--------------|-----|
| A | @ | 76.76.21.21 | **DNS only** (灰色云) | Auto |
| A | @ | 76.76.21.21 | **DNS only** (灰色云) | Auto |

**重要：** 必须将 Proxy status 设置为 **DNS only**（灰色云朵），而不是 Proxied（橙色云朵）。

#### 对于 www 子域名：

| Type | Name | Target | Proxy status | TTL |
|------|------|--------|--------------|-----|
| CNAME | www | cname.vercel-dns.com | **DNS only** (灰色云) | Auto |

**关键配置说明：**
- ⚠️ **必须关闭 Cloudflare 代理**（DNS only 模式）
- ⚠️ 如果启用代理（橙色云），会导致 SSL 证书问题
- ✅ Vercel 会自动处理 SSL 证书

---

### 步骤 3: 配置 Cloudflare SSL/TLS 设置

1. 在 Cloudflare 中，进入 **SSL/TLS** → **Overview**
2. 设置加密模式为 **Full (strict)** 或 **Full**

推荐配置：

```
Encryption mode: Full (strict)
Always Use HTTPS: ON
Automatic HTTPS Rewrites: ON
```

**为什么选择 "Full (strict)"：**
- Vercel 提供有效的 SSL 证书
- Cloudflare 会验证 Vercel 的证书
- 最安全的配置

---

### 步骤 4: 等待 DNS 传播

DNS 记录更新通常需要 **5 分钟到 48 小时**，但通常在 10-30 分钟内完成。

验证 DNS 传播：

```bash
# 检查 A 记录
dig metaskills.com

# 检查 CNAME 记录
dig www.metaskills.com

# 或使用在线工具
# https://dnschecker.org/
```

---

### 步骤 5: 在 Vercel 中验证

1. 返回 Vercel Dashboard → Domains
2. 等待域名状态变为 **Valid Configuration**
3. SSL 证书会自动颁发（通常需要几分钟到几小时）

---

## 🚀 方法二：快速配置（仅 DNS）

如果你想快速完成配置，可以完全跳过 Cloudflare 代理：

### 步骤 1: 在 Vercel 添加域名

同方法一的步骤 1

### 步骤 2: 在 Cloudflare 配置 DNS

所有记录都设置为 **DNS only**（灰色云）：

| Type | Name | Content | Proxy status | TTL |
|------|------|---------|--------------|-----|
| A | @ | 76.76.21.21 | DNS only | Auto |
| A | @ | 76.76.21.21 | DNS only | Auto |
| CNAME | www | cname.vercel-dns.com | DNS only | Auto |

### 步骤 3: 完成

就这样！Vercel 会处理所有 SSL 和 CDN。

---

## 🎨 高级配置选项

### 配置多个子域名

如果你想要配置 `app.metaskills.com`、`admin.metaskills.com` 等：

```bash
vercel domains add app.metaskills.com
vercel domains add admin.metaskills.com
```

然后在 Cloudflare 中为每个子域名添加 CNAME 记录：

| Type | Name | Target | Proxy status |
|------|------|--------|--------------|
| CNAME | app | cname.vercel-dns.com | DNS only |
| CNAME | admin | cname.vercel-dns.com | DNS only |

### 配置通配符子域名

Vercel 支持通配符子域名（*.metaskills.com）：

```bash
vercel domains add '*.metaskills.com'
```

Cloudflare 配置：

| Type | Name | Target | Proxy status |
|------|------|--------|--------------|
| CNAME | * | cname.vercel-dns.com | DNS only |

---

## 🔧 故障排除

### 问题 1: 域名显示 "Invalid Configuration"

**可能原因：**
- DNS 记录配置错误
- Cloudflare 代理未关闭（橙色云）

**解决方案：**
1. 检查 DNS 记录是否正确
2. 确保所有记录都是 **DNS only**（灰色云）
3. 等待 DNS 传播完成

### 问题 2: SSL 证书未生成

**可能原因：**
- DNS 未正确指向 Vercel
- DNS 传播未完成

**解决方案：**
1. 使用 `dig` 命令验证 DNS
2. 在 Vercel Dashboard 中点击 "Retry Verification"
3. 等待更长时间（最长 24 小时）

### 问题 3: 访问域名显示 404

**可能原因：**
- 域名未正确添加到 Vercel 项目
- DNS 缓存问题

**解决方案：**
1. 确认域名在 Vercel Dashboard 中显示为 "Valid Configuration"
2. 清除本地 DNS 缓存：`ipconfig /flushdns`（Windows）或 `sudo killall -HUP mDNSResponder`（macOS）
3. 使用隐私模式测试

### 问题 4: HTTPS 不工作

**可能原因：**
- Cloudflare SSL 模式设置错误
- SSL 证书未完全颁发

**解决方案：**
1. 确认 Cloudflare SSL 模式为 **Full** 或 **Full (strict)**
2. 在 Vercel Dashboard 中确认 SSL 证书状态为 "Issued"
3. 强制 HTTPS：在 Cloudflare 中启用 "Always Use HTTPS"

---

## 📊 配置检查清单

配置完成后，确认以下所有项：

### Vercel Dashboard
- [ ] 域名已添加到项目
- [ ] 域名状态显示 "Valid Configuration"
- [ ] SSL 证书状态显示 "Issued"
- [ ] 正确的生产环境已关联

### Cloudflare Dashboard
- [ ] A 记录指向正确的 Vercel IP
- [ ] CNAME 记录指向 cname.vercel-dns.com
- [ ] 所有记录的 Proxy status 为 "DNS only"（灰色云）
- [ ] SSL/TLS 模式设置为 "Full" 或 "Full (strict)"
- [ ] "Always Use HTTPS" 已启用

### 功能测试
- [ ] 访问根域名（https://metaskills.com）正常工作
- [ ] 访问 www 子域名（https://www.metaskills.com）正常工作
- [ ] HTTPS 重定向正常工作
- [ ] SSL 证书有效（浏览器显示锁图标）

---

## 🔄 域名重定向

如果你想要将所有流量重定向到主域名（例如 www → 根域名）：

### 方法 1: 在 Vercel 中配置

创建 `vercel.json` 文件：

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.metaskills.com"
        }
      ],
      "destination": "https://metaskills.com/:path*",
      "permanent": true
    }
  ]
}
```

### 方法 2: 在 Cloudflare 中配置

1. 进入 **Rules** → **Page Rules**
2. 创建新规则：
   - URL: `www.metaskills.com/*`
   - 设置: `Forwarding URL`
   - 目标: `https://metaskills.com/$1`
   - 状态码: `301 - Permanent Redirect`

---

## 📚 相关文档

- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Vercel & Cloudflare Integration](https://vercel.com/docs/concepts/projects/edge-network/regions)

---

## 💡 最佳实践

1. **始终使用 HTTPS**：确保在 Vercel 和 Cloudflare 中都启用了 HTTPS
2. **关闭 Cloudflare 代理**：对于 Vercel 项目，使用 DNS only 模式
3. **监控 DNS 传播**：使用工具如 DNSChecker 监控全球 DNS 传播
4. **设置适当的 TTL**：生产环境使用 Auto（300 秒），维护时可以降低
5. **备份 DNS 配置**：截图或记录 DNS 配置，以防需要恢复

---

*最后更新：2025-02-23*
