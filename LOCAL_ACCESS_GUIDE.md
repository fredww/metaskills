# MetaSkills 本地开发访问指南

## 🚀 服务器状态

✅ **开发服务器运行中**
- 本地: http://localhost:3000
- 网络: http://192.168.1.26:3000

---

## 🎯 主要功能访问

### 公共页面（多语言）

**主站（英文）**：
- 首页: http://localhost:3000
- 技能列表: http://localhost:3000/skills
- 关于: http://localhost:3000/about

**中文版**：
- 首页: http://localhost:3000/zh-CN
- 技能列表: http://localhost:3000/zh-CN/skills

**其他语言**：
- 德语: http://localhost:3000/de
- 日语: http://localhost:3000/ja
- 法语: http://localhost:3000/fr
- 西班牙语: http://localhost:3000/es
- 韩语: http://localhost:3000/ko

### 翻译管理界面

⚠️ **注意**：翻译管理界面位于 `/admin/translations`（不需要语言前缀）

**主仪表板**：
- http://localhost:3000/admin/translations

**技能翻译**：
- 列表: http://localhost:3000/admin/translations/skills
- 编辑器: http://localhost:3000/admin/translations/skills/active-listening

**练习翻译**：
- http://localhost:3000/admin/translations/practices

**文章翻译**：
- http://localhost:3000/admin/translations/articles

**导入翻译**：
- http://localhost:3000/admin/translations/import

**导出翻译**：
- http://localhost:3000/admin/translations/export

### API 端点

**翻译进度**：
- http://localhost:3000/api/translations

**技能翻译 API**：
- 列表: http://localhost:3000/api/translations/skills
- 详情: http://localhost:3000/api/translations/skills/active-listening

**导出 API**：
- http://localhost:3000/api/translations/export?type=skills&locale=zh-CN&format=json

---

## 🛠️ 开发工具

### 数据库
- Prisma Studio: `npx prisma studio`
- 查看数据库: 打开 Supabase 控制台

### Git 操作
- 查看状态: `git status`
- 查看日志: `git log --oneline -10`
- 提交更改: `git commit -am "message"`

---

## 📝 当前可用的翻译管理功能

### ✅ 已实现
1. 查看整体翻译进度
2. 编辑技能翻译（支持所有语言）
3. 导出翻译为 JSON
4. 导入翻译文件
5. 工作流状态管理

### ⏳ 计划中
1. XLSX/CSV 导出导入
2. 练习详细编辑器
3. 文章详细编辑器
4. 翻译记忆系统
5. 专业平台集成（Crowdin, POEditor）

---

## ⚡ 快速开始

1. **查看翻译进度**
   ```
   访问: http://localhost:3000/admin/translations
   ```

2. **编辑技能翻译**
   ```
   访问: http://localhost:3000/admin/translations/skills
   点击任意技能的"编辑"按钮
   ```

3. **导出现有翻译**
   ```
   访问: http://localhost:3000/admin/translations/export
   选择类型和语言
   点击"导出"
   ```

---

## 🐛 故障排除

### 页面 404
- 检查 URL 是否正确
- 确保服务器正在运行
- 刷新浏览器缓存

### 翻译不显示
- 检查数据库连接
- 确认数据已迁移到新表结构（Phase 5 未完成）
- 查看浏览器控制台错误

### API 错误
- 检查环境变量是否配置
- 确认 Supabase 连接正常
- 查看服务器日志

---

**最后更新**: 2026-02-24
**开发环境**: 本地
**状态**: Phase 4 完成，Phase 5-6 待完成
