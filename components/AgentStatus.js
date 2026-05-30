import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  Activity,
  Zap,
  Cpu,
  Wifi,
  WifiOff,
  Terminal,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';

const statusConfig = {
  running: {
    icon: Loader2,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    label: '运行中',
    animate: true,
    dotColor: 'bg-cyan-500',
  },
  idle: {
    icon: Clock,
    color: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/20',
    label: '待机',
    animate: false,
    dotColor: 'bg-gray-500',
  },
  success: {
    icon: CheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    label: '完成',
    animate: false,
    dotColor: 'bg-green-500',
  },
  error: {
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    label: '错误',
    animate: false,
    dotColor: 'bg-red-500',
  },
};

export default function AgentStatus() {
  const { data, connected, error } = useWebSocket();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (data?.status === 'running') {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [data?.status, data?.currentTask]);

  const formatDuration = (seconds) => {
    if (!seconds) return '0h 0m';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const status = data ? statusConfig[data.status] || statusConfig.idle : statusConfig.idle;
  const StatusIcon = status.icon;

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
            Agent 控制面板
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            实时监控 Claude Code 状态，掌握任务进度
          </p>
        </motion.div>

        {/* 连接状态 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8"
        >
          <div className={`flex items-center justify-center gap-3 p-3 rounded-xl ${
            connected ? 'bg-green-500/5 border border-green-500/20' : 'bg-red-500/5 border border-red-500/20'
          }`}>
            {connected ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
            <span className={`text-sm ${connected ? 'text-green-400' : 'text-red-400'}`}>
              {connected ? 'WebSocket 已连接 - 实时同步中' : '未连接 - 等待重连...'}
            </span>
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 pulse-dot' : 'bg-red-500'}`} />
          </div>
        </motion.div>

        {/* 主状态卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className={`p-6 rounded-2xl bg-dark-900/50 border ${status.border} ${
            pulse ? 'ring-2 ring-cyan-500/30' : ''
          } transition-all duration-300`}>
            <div className="flex flex-wrap items-center gap-6">
              {/* 模型信息 */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{data?.model || 'Claude Code'}</h3>
                  <p className="text-gray-400 text-sm">
                    Session: {data?.sessionId ? data.sessionId.slice(0, 8) + '...' : 'N/A'}
                  </p>
                </div>
              </div>

              {/* 状态指示器 */}
              <div className="ml-auto flex items-center gap-4">
                <AnimatePresence>
                  {data?.status === 'running' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
                    >
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                      <span className="text-cyan-400 text-sm font-medium">Claude Running</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.bg} border ${status.border}`}>
                  <StatusIcon className={`w-4 h-4 ${status.color} ${status.animate ? 'animate-spin' : ''}`} />
                  <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
                  <div className={`w-2 h-2 rounded-full ${status.dotColor} ${status.animate ? 'pulse-dot' : ''}`} />
                </div>
              </div>
            </div>

            {/* 当前任务 */}
            {data?.currentTask && data.currentTask !== 'None' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="text-xs text-gray-500">当前任务</p>
                    <p className="text-white text-sm font-medium">{data.currentTask}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            icon={<Zap className="w-5 h-5" />}
            title="Token 总量"
            value={data?.totalTokens?.toLocaleString() || '0'}
            color="cyan"
          />
          <StatCard
            icon={<Activity className="w-5 h-5" />}
            title="Token 速度"
            value={`${data?.tokenSpeed || 0}/s`}
            color="green"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            title="运行时长"
            value={formatDuration(data?.uptime)}
            color="purple"
          />
          <StatCard
            icon={<BarChart3 className="w-5 h-5" />}
            title="估算费用"
            value={`$${data?.estimatedCost || '0.00'}`}
            color="yellow"
          />
        </motion.div>

        {/* 最近命令 + 任务统计 双列布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 最近命令 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl bg-dark-900/50 border border-dark-700"
          >
            <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-500" />
              最近命令
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {data?.recentCommands?.slice(0, 8).map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="flex items-center gap-3 p-2 bg-dark-800/50 rounded-lg hover:bg-dark-800 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    cmd.command.includes('running') ? 'bg-cyan-500 pulse-dot' :
                    cmd.command.includes('success') || cmd.command.includes('done') ? 'bg-green-500' :
                    cmd.command.includes('error') ? 'bg-red-500' :
                    'bg-gray-500'
                  }`} />
                  <span className="text-gray-500 text-xs font-mono flex-shrink-0">
                    {cmd.time?.split(' ')[1] || ''}
                  </span>
                  <span className="text-gray-300 text-sm truncate">{cmd.command}</span>
                </motion.div>
              ))}
              {(!data?.recentCommands || data.recentCommands.length === 0) && (
                <p className="text-gray-600 text-sm text-center py-4">暂无命令记录</p>
              )}
            </div>
          </motion.div>

          {/* 任务统计 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-2xl bg-dark-900/50 border border-dark-700"
          >
            <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-yellow-500" />
              任务统计
            </h3>
            <div className="space-y-3">
              {data?.agentTasks?.slice(0, 5).map((task, index) => (
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
              {(!data?.agentTasks || data.agentTasks.length === 0) && (
                <p className="text-gray-600 text-sm text-center py-4">暂无任务数据</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* 安全提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-dark-900/30 border border-dark-800 text-center"
        >
          <p className="text-gray-500 text-sm">
            所有数据本地处理，不上传公网 - WebSocket 实时同步 - 仅读取本地日志
          </p>
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
    <div className={`p-5 rounded-xl border ${colorClasses[color]} hover-lift transition-all`}>
      <div className="flex items-center gap-2 mb-3 opacity-80">
        {icon}
        <span className="text-xs">{title}</span>
      </div>
      <div className="text-2xl md:text-3xl font-bold font-mono">{value}</div>
    </div>
  );
}
