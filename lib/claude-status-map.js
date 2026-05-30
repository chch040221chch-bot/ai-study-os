export const claudeStatusMap = {
  Thinking: {
    chinese: '正在思考',
    english: 'Thinking',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    dotColor: 'bg-cyan-500',
    icon: '🧠',
    description: 'AI 正在分析问题，构建思维链',
  },
  Thundering: {
    chinese: '高强度推理中',
    english: 'Thundering',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    dotColor: 'bg-yellow-500',
    icon: '⚡',
    description: '全力推理，高负载运算中',
  },
  Simmering: {
    chinese: '后台低功耗运行',
    english: 'Simmering',
    color: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
    dotColor: 'bg-gray-500',
    icon: '🌙',
    description: '低功耗待机，等待唤醒',
  },
  Churning: {
    chinese: '持续处理中',
    english: 'Churning',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    dotColor: 'bg-orange-500',
    icon: '🔥',
    description: '持续运算，处理大量数据',
  },
  Hullaballooing: {
    chinese: '多线程狂热分析中',
    english: 'Hullaballooing',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    dotColor: 'bg-purple-500',
    icon: '🌀',
    description: '多线程并行，全速分析',
  },
  Pollinating: {
    chinese: '正在整理灵感',
    english: 'Pollinating',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    dotColor: 'bg-pink-500',
    icon: '🌸',
    description: '收集信息，整理创意灵感',
  },
  Brewing: {
    chinese: '正在酝酿方案',
    english: 'Brewing',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    dotColor: 'bg-amber-500',
    icon: '☕',
    description: '构思方案，酝酿最佳策略',
  },
  Reading: {
    chinese: '正在读取项目',
    english: 'Reading',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    dotColor: 'bg-blue-500',
    icon: '📖',
    description: '扫描项目文件，理解代码结构',
  },
  Writing: {
    chinese: '正在编写代码',
    english: 'Writing',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    dotColor: 'bg-green-500',
    icon: '✍️',
    description: '生成代码，正在编写实现',
  },
};

export const unknownStatus = {
  chinese: 'AI 正在自主运行中',
  english: 'Autonomous',
  color: 'text-indigo-400',
  bg: 'bg-indigo-500/10',
  border: 'border-indigo-500/30',
  dotColor: 'bg-indigo-500',
  icon: '🤖',
  description: 'AI 自主决策运行中',
};

export function getStatusConfig(status) {
  if (!status) return unknownStatus;
  const normalized = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  return claudeStatusMap[normalized] || unknownStatus;
}

export function getAllStatuses() {
  return Object.values(claudeStatusMap);
}
