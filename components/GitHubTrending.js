import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, TrendingUp } from 'lucide-react';

const trendingRepos = [
  {
    rank: 1,
    name: 'perplexityai/bumblebee',
    description: 'Read-only developer endpoint scanner for supply chain security',
    language: 'Go',
    stars: 3955,
    growth: '+3955',
    url: '#',
  },
  {
    rank: 2,
    name: 'OpenBMB/PilotDeck',
    description: 'Task-oriented AI Agent productivity platform',
    language: 'TypeScript',
    stars: 2132,
    growth: '+2132',
    url: '#',
  },
  {
    rank: 3,
    name: 'datawhalechina/Agent-Learning-Hub',
    description: 'AI Agent 学习路线与资料库收集',
    language: 'HTML',
    stars: 1978,
    growth: '+1978',
    url: '#',
  },
  {
    rank: 4,
    name: 'WUBING2023/PaperSpine',
    description: 'Motivation-driven skill for learning from academic papers',
    language: 'Python',
    stars: 1472,
    growth: '+1472',
    url: '#',
  },
  {
    rank: 5,
    name: 'run-liyi/wechatpay',
    description: '微信账单分析工具 - 基于Electron的可视化账单分析应用',
    language: 'JavaScript',
    stars: 1436,
    growth: '+1436',
    url: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function GitHubTrending() {
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
            GitHub AI 热榜
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            追踪最新 AI 开源项目，发现前沿技术和工具
          </p>
        </motion.div>

        {/* 热榜列表 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {trendingRepos.map((repo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="p-4 md:p-6 rounded-xl bg-dark-900/50 border border-dark-700 hover:border-cyan-500/30 transition-all duration-300 hover-lift">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* 排名 */}
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                      repo.rank <= 3
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                        : 'bg-dark-800 text-gray-400'
                    }`}>
                      {repo.rank}
                    </div>
                  </div>

                  {/* 信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {repo.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                      {repo.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="px-2 py-1 bg-dark-800 rounded text-gray-300">
                        {repo.language}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4" />
                        <span>{repo.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>{repo.growth}</span>
                      </div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex-shrink-0">
                    <button className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 查看更多 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors">
            查看完整榜单 →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
