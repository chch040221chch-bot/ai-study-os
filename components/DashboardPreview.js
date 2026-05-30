import { motion } from 'framer-motion';
import {
  TrendingUp,
  Zap,
  Clock,
  DollarSign,
  Activity,
  Cpu,
  BarChart3
} from 'lucide-react';

export default function DashboardPreview() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            智能仪表盘
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            实时监控你的学习状态和AI使用情况
          </p>
        </motion.div>

        {/* Dashboard 预览 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* 浏览器框架 */}
          <div className="rounded-2xl overflow-hidden border border-dark-700 shadow-2xl">
            {/* 浏览器头部 */}
            <div className="bg-dark-900 px-4 py-3 flex items-center gap-2 border-b border-dark-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-dark-800 rounded-lg text-sm text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  localhost:3000
                </div>
              </div>
            </div>

            {/* Dashboard 内容 */}
            <div className="bg-dark-950 p-6 md:p-8">
              {/* 顶部状态栏 */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">🤖</span>
                    Claude Token Monitor
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 pulse-dot" />
                    <span className="text-sm text-green-400">已连接</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    <span>mimo-v2.5-pro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>42m 30s</span>
                  </div>
                </div>
              </div>

              {/* 统计卡片 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard
                  icon={<Zap className="w-5 h-5" />}
                  title="Token 总量"
                  value="83,700"
                  color="cyan"
                />
                <StatCard
                  icon={<Activity className="w-5 h-5" />}
                  title="Token 速度"
                  value="32/s"
                  color="green"
                />
                <StatCard
                  icon={<DollarSign className="w-5 h-5" />}
                  title="估算费用"
                  value="$0.49"
                  color="yellow"
                />
                <StatCard
                  icon={<Clock className="w-5 h-5" />}
                  title="运行时长"
                  value="42m"
                  color="purple"
                />
              </div>

              {/* 图表区域 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Token 趋势 */}
                <div className="bg-dark-900/50 rounded-xl p-6 border border-dark-700">
                  <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-500" />
                    Token 使用趋势
                  </h3>
                  <div className="h-48 relative">
                    {/* 模拟图表 */}
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
                          <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 150 Q 50 120 100 130 T 200 100 T 300 80 T 400 50"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                      />
                      <path
                        d="M 0 150 Q 50 120 100 130 T 200 100 T 300 80 T 400 50 L 400 200 L 0 200 Z"
                        fill="url(#gradient)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Token 分布 */}
                <div className="bg-dark-900/50 rounded-xl p-6 border border-dark-700">
                  <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    Token 分布
                  </h3>
                  <div className="space-y-4">
                    <TokenBar label="Input Tokens" value={46500} total={83700} color="cyan" />
                    <TokenBar label="Output Tokens" value={23250} total={83700} color="green" />
                    <TokenBar label="Cache Tokens" value={13950} total={83700} color="yellow" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 装饰效果 */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ icon, title, value, color }) {
  const colorClasses = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-2 opacity-80">
        {icon}
        <span className="text-xs">{title}</span>
      </div>
      <div className="text-2xl font-bold font-mono">{value}</div>
    </div>
  );
}

function TokenBar({ label, value, total, color }) {
  const percentage = (value / total) * 100;
  const colorClasses = {
    cyan: 'bg-cyan-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-300 font-mono">{value.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
