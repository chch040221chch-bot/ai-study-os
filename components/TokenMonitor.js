import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Activity,
  DollarSign,
  Clock,
  Cpu,
  TrendingUp,
  BarChart3,
  ArrowLeft,
  RefreshCw,
  Wifi,
  WifiOff,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';

export default function TokenMonitor() {
  const { data, connected, error } = useWebSocket();
  const [animatedTokens, setAnimatedTokens] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (data?.totalTokens) {
      // 数字动画
      const duration = 1000;
      const steps = 30;
      const start = animatedTokens;
      const end = data.totalTokens;
      const increment = (end - start) / steps;
      let current = start;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setAnimatedTokens(end);
          clearInterval(timer);
        } else {
          setAnimatedTokens(Math.floor(current));
        }
      }, duration / steps);

      // 触发脉冲动画
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);

      return () => clearInterval(timer);
    }
  }, [data?.totalTokens]);

  const formatDuration = (seconds) => {
    if (!seconds) return '0h 0m';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const parts = timeStr.split(' ');
    return parts[1] || timeStr;
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">正在连接 Claude 状态...</p>
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        </div>
      </div>
    );
  }

  return (
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
              <Activity className="w-5 h-5 text-cyan-500" />
              Token Monitor
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors">
              <Shield className="w-4 h-4" />
              <span>隐私安全</span>
            </Link>
            <div className="w-px h-5 bg-dark-700" />
            <div className={`flex items-center gap-2 text-sm ${connected ? 'text-green-400' : 'text-red-400'}`}>
              {connected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span>{connected ? 'WebSocket 已连接' : '未连接'}</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 pulse-dot' : 'bg-red-500'}`} />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 模型信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl bg-dark-900/50 border border-dark-700">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{data.model || 'Unknown'}</h2>
              <p className="text-gray-400 text-sm">
                Session: {data.sessionId ? data.sessionId.slice(0, 8) + '...' : 'N/A'}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <AnimatePresence>
                {data.status === 'running' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
                  >
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span className="text-cyan-400 text-sm">Claude Running</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                data.status === 'running'
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-gray-500/10 border border-gray-500/20'
              }`}>
                <div className={`w-2 h-2 rounded-full ${data.status === 'running' ? 'bg-green-500 pulse-dot' : 'bg-gray-500'}`} />
                <span className={`text-sm ${data.status === 'running' ? 'text-green-400' : 'text-gray-400'}`}>
                  {data.status === 'running' ? '运行中' : '待机'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 当前任务 */}
        {data.currentTask && data.currentTask !== 'None' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-8"
          >
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">当前任务</p>
                  <p className="text-white font-medium">{data.currentTask}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            icon={<Zap className="w-5 h-5" />}
            title="Token 总量"
            value={animatedTokens.toLocaleString()}
            color="cyan"
            pulse={pulse}
          />
          <StatCard
            icon={<Activity className="w-5 h-5" />}
            title="Token 速度"
            value={`${data.tokenSpeed || 0}/s`}
            color="green"
          />
          <StatCard
            icon={<DollarSign className="w-5 h-5" />}
            title="估算费用"
            value={`$${data.estimatedCost || '0.00'}`}
            color="yellow"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            title="运行时长"
            value={formatDuration(data.uptime)}
            color="purple"
          />
        </motion.div>

        {/* Token 分布 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-2xl bg-dark-900/50 border border-dark-700 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            Token 分布
          </h3>
          <div className="space-y-4">
            <TokenBar label="Input Tokens" value={data.inputTokens || 0} total={data.totalTokens || 1} color="cyan" />
            <TokenBar label="Output Tokens" value={data.outputTokens || 0} total={data.totalTokens || 1} color="green" />
            <TokenBar label="Cache Tokens" value={data.cacheTokens || 0} total={data.totalTokens || 1} color="yellow" />
          </div>
        </motion.div>

        {/* 最近命令 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-2xl bg-dark-900/50 border border-dark-700 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-500" />
            最近命令
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.recentCommands?.slice(0, 10).map((cmd, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-lg hover:bg-dark-800 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  cmd.command.includes('running') ? 'bg-cyan-500 pulse-dot' :
                  cmd.command.includes('success') || cmd.command.includes('done') ? 'bg-green-500' :
                  cmd.command.includes('error') ? 'bg-red-500' :
                  'bg-gray-500'
                }`} />
                <span className="text-gray-500 text-xs font-mono flex-shrink-0">{formatTime(cmd.time)}</span>
                <span className="text-gray-300 text-sm truncate">{cmd.command}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Agent 任务统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-2xl bg-dark-900/50 border border-dark-700"
        >
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            任务统计
          </h3>
          <div className="space-y-3">
            {data.agentTasks?.slice(0, 5).map((task, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-dark-800/50 rounded-lg">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                  index < 3
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                    : 'bg-dark-700 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{task.name}</div>
                </div>
                <div className="text-gray-400 text-sm font-mono">{task.count}x</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 安全提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-dark-900/30 border border-dark-800 text-center"
        >
          <p className="text-gray-500 text-sm">
            🔒 所有数据本地处理，不上传公网 • WebSocket 实时同步 • 仅读取本地日志
          </p>
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value, color, pulse }) {
  const colorClasses = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  };

  return (
    <div className={`p-5 rounded-xl border ${colorClasses[color]} hover-lift transition-all ${pulse ? 'ring-2 ring-cyan-500/50' : ''}`}>
      <div className="flex items-center gap-2 mb-3 opacity-80">
        {icon}
        <span className="text-xs">{title}</span>
      </div>
      <div className="text-2xl md:text-3xl font-bold font-mono">{value}</div>
    </div>
  );
}

function TokenBar({ label, value, total, color }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const colorClasses = {
    cyan: 'bg-cyan-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-300 font-mono">{value.toLocaleString()}</span>
      </div>
      <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
          className={`h-full ${colorClasses[color]} rounded-full`}
        />
      </div>
    </div>
  );
}
