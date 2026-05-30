# AI Study OS

为大学生打造的智能学习工作台，AI论文助手、课程总结、PPT生成、Agent协作。

## 功能模块

1. **AI课程总结** - 智能提取课程重点，生成结构化笔记
2. **AI论文助手** - 从选题到写作，AI全程辅助
3. **PPT生成** - 一键生成专业演示文稿
4. **Token监控** - 实时监控AI模型Token使用量
5. **GitHub AI热榜** - 追踪最新AI开源项目
6. **Agent控制面板** - 管理和调度AI Agent

## 技术栈

- **前端框架**: Next.js 14
- **样式方案**: Tailwind CSS
- **动画库**: Framer Motion
- **图标库**: Lucide React

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产版本
npm start
```

访问 http://localhost:3000

## 项目结构

```
ai-study-os/
├── pages/
│   ├── _app.js
│   └── index.js
├── components/
│   ├── Hero.js
│   ├── Features.js
│   ├── DashboardPreview.js
│   ├── AgentStatus.js
│   └── GitHubTrending.js
├── styles/
│   └── globals.css
├── public/
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 设计特点

- 🎨 深色科技风 UI
- ✨ 流畅动画效果
- 📱 响应式布局
- 🎯 iPad 优化
- 🌟 玻璃态效果
- 💫 动态状态卡片

## 功能亮点

### Hero Section
- 渐变文字效果
- 浮动动画元素
- 统计数据展示
- CTA 按钮

### 功能展示
- 六大核心模块
- 卡片悬浮效果
- 渐变图标
- 动态加载

### Dashboard 预览
- 浏览器框架模拟
- Token 统计卡片
- 趋势图表
- 分布进度条

### Agent 状态
- 实时状态监控
- 进度条动画
- 操作按钮
- 统计信息

### GitHub 热榜
- 排名标识
- 项目信息
- Star 统计
- 增长趋势

## 许可证

MIT License
