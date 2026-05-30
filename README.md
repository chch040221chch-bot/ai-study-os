# AI Study OS

为大学生打造的智能学习工作台，AI论文助手、课程总结、PPT生成、Agent协作。

## 功能模块

| 功能 | 说明 |
|------|------|
| **首页** | Hero 展示 + 功能模块 + Dashboard 预览 |
| **Token Monitor** | 实时监控 Claude Token 使用量 |
| **Privacy** | 隐私安全说明页 |
| **Agent 状态** | Claude Agent 实时状态监控 |
| **GitHub 热榜** | 追踪最新 AI 开源项目 |
| **Claude 状态中文化** | 英文状态转换为中文提示 |

## Claude 状态映射

| 英文 | 中文 | 说明 |
|------|------|------|
| Thinking | 正在思考 | AI 分析问题中 |
| Thundering | 高强度推理中 | 全力运算 |
| Simmering | 后台低功耗运行 | 待机状态 |
| Churning | 持续处理中 | 处理大量数据 |
| Hullaballooing | 多线程狂热分析中 | 并行分析 |
| Pollinating | 正在整理灵感 | 收集信息 |
| Brewing | 正在酝酿方案 | 构思策略 |
| Reading | 正在读取项目 | 扫描代码 |
| Writing | 正在编写代码 | 生成实现 |
| 未知状态 | AI 正在自主运行中 | 默认回退 |

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
├── components/
│   ├── AgentStatus.js      # Agent 状态面板
│   ├── DashboardPreview.js # Dashboard 预览
│   ├── Features.js         # 功能展示
│   ├── GitHubTrending.js   # GitHub 热榜
│   ├── Hero.js             # 首页主视觉
│   └── TokenMonitor.js     # Token 监控
├── hooks/
│   └── useWebSocket.js     # WebSocket 钩子
├── lib/
│   ├── claude-collector.js # 数据采集
│   └── claude-status-map.js # 状态映射
├── pages/
│   ├── _app.js
│   ├── index.js            # 首页
│   ├── privacy.js          # 隐私页
│   └── token.js            # Token 页
├── server.js               # 自定义服务器
└── package.json
```

## 安全说明

- **本地读取**: 所有数据从本地 ~/.claude/ 目录读取
- **不上传公网**: 数据处理均在本地完成
- **不保存 API Key**: 不存储任何敏感凭据
- **不执行危险命令**: 仅读取日志和配置文件

## 许可证

MIT License
