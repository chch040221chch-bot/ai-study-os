import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  Server,
  Key,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Globe,
  FileText,
  Cpu
} from 'lucide-react';
import Link from 'next/link';

const principles = [
  {
    icon: Server,
    title: '本地数据读取',
    description: '所有 Token 使用量、Agent 状态、会话信息均从本地 ~/.claude/ 目录读取，数据不离开你的设备。',
    color: 'cyan',
  },
  {
    icon: Globe,
    title: '不上传公网',
    description: '系统不会将任何使用数据、日志内容或统计信息上传至外部服务器，所有处理均在本地完成。',
    color: 'green',
  },
  {
    icon: Key,
    title: '不保存 API Key',
    description: '系统不存储、不缓存、不记录任何 API Key 或认证凭据，敏感信息仅存在于运行时内存中。',
    color: 'yellow',
  },
  {
    icon: AlertTriangle,
    title: '不执行危险命令',
    description: '系统仅读取日志文件和配置，不会执行任何写入、删除或网络请求等危险操作。',
    color: 'red',
  },
  {
    icon: Cpu,
    title: '本地 AI 工作台',
    description: '专为个人学习场景设计，适用于本地开发环境，无需联网即可使用全部功能。',
    color: 'purple',
  },
  {
    icon: FileText,
    title: '透明开源',
    description: '所有代码开源可审计，你可以随时检查数据处理逻辑，确保没有隐藏的数据采集行为。',
    color: 'blue',
  },
];

const colorMap = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    text: 'text-cyan-400',
    iconBg: 'bg-cyan-500/20',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-400',
    iconBg: 'bg-green-500/20',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-400',
    iconBg: 'bg-yellow-500/20',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    iconBg: 'bg-red-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    iconBg: 'bg-purple-500/20',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    iconBg: 'bg-blue-500/20',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>隐私与安全 - AI Study OS</title>
        <meta name="description" content="AI Study OS 隐私政策与安全说明" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      <div className="min-h-screen bg-dark-950">
        {/* 顶部导航 */}
        <nav className="sticky top-0 z-50 glass border-b border-dark-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>返回首页</span>
              </Link>
              <div className="w-px h-6 bg-dark-700" />
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                隐私与安全
              </h1>
            </div>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 py-12">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">100% 本地运行</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              你的数据，你做主
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              AI Study OS 遵循最小权限原则，所有数据处理均在本地完成，绝不触碰你的隐私。
            </p>
          </motion.div>

          {/* 核心原则 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Eye className="w-6 h-6 text-cyan-500" />
              核心隐私原则
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {principles.map((principle, index) => {
                const colors = colorMap[principle.color];
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                    className={`p-6 rounded-2xl ${colors.bg} border ${colors.border} hover:border-opacity-40 transition-all duration-300`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{principle.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{principle.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 数据流向说明 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16 p-8 rounded-2xl bg-dark-900/50 border border-dark-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-purple-500" />
              数据流向
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <DataFlowNode icon={<Cpu className="w-6 h-6" />} label="Claude Code" sublabel="~/.claude/" color="cyan" />
              <Arrow />
              <DataFlowNode icon={<Eye className="w-6 h-6" />} label="本地采集器" sublabel="claude-collector.js" color="purple" />
              <Arrow />
              <DataFlowNode icon={<Server className="w-6 h-6" />} label="WebSocket" sublabel="ws://localhost" color="green" />
              <Arrow />
              <DataFlowNode icon={<Shield className="w-6 h-6" />} label="浏览器展示" sublabel="仅本地显示" color="yellow" />
            </div>
            <div className="mt-8 p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-center">
              <p className="text-green-400 text-sm flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                数据全程在本机流转，不经过任何外部服务器
              </p>
            </div>
          </motion.div>

          {/* 安全承诺 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              安全承诺
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: '🔒', title: '零网络请求', desc: '除 WebSocket 本地通信外，不发起任何外部网络请求' },
                { icon: '🛡️', title: '只读访问', desc: '仅读取日志和配置文件，不修改任何系统文件' },
                { icon: '🔑', title: '无凭据存储', desc: '不存储任何 Token、Key、密码等敏感信息' },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-xl bg-dark-900/30 border border-dark-800 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 适用场景 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-dark-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-cyan-500" />
              适用场景
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: '个人学习', desc: '监控自己的 Claude Code 使用情况，优化 Token 消耗' },
                { title: '本地开发', desc: '在开发环境中实时查看 AI Agent 状态和任务进度' },
                { title: '论文写作', desc: '追踪论文辅助工具的 Token 消耗和成本估算' },
                { title: '团队内部', desc: '在内网环境中部署，供团队成员查看各自使用情况' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 底部提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center p-6 rounded-xl bg-dark-900/30 border border-dark-800"
          >
            <p className="text-gray-500 text-sm">
              如有任何隐私疑虑，欢迎审查源代码或提交 Issue
            </p>
            <p className="text-gray-600 text-xs mt-2">
              AI Study OS - 为大学生打造的安全本地 AI 工作台
            </p>
          </motion.div>
        </main>
      </div>
    </>
  );
}

function DataFlowNode({ icon, label, sublabel, color }) {
  const colorClasses = {
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    green: 'bg-green-500/10 border-green-500/30 text-green-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  };

  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${colorClasses[color]}`}>
      <div className="w-12 h-12 rounded-lg bg-dark-800 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-white text-sm font-medium">{label}</span>
      <span className="text-gray-500 text-xs">{sublabel}</span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden md:block text-gray-600">
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
        <path d="M0 10H35M35 10L28 4M35 10L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
