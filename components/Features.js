import { motion } from 'framer-motion';
import {
  BookOpen,
  FileText,
  Presentation,
  Activity,
  Github,
  Bot,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: BookOpen,
    title: 'AI课程总结',
    description: '智能提取课程重点，生成结构化笔记，支持思维导图导出',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    href: '#',
  },
  {
    icon: FileText,
    title: 'AI论文助手',
    description: '从选题到写作，AI全程辅助，支持文献检索和格式排版',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    href: '#',
  },
  {
    icon: Presentation,
    title: 'PPT生成',
    description: '一键生成专业演示文稿，支持多种模板和动画效果',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    href: '#',
  },
  {
    icon: Activity,
    title: 'Token监控',
    description: '实时监控AI模型Token使用量，智能优化成本',
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-600',
    href: '/token',
  },
  {
    icon: Github,
    title: 'GitHub AI热榜',
    description: '追踪最新AI开源项目，发现前沿技术和工具',
    color: 'red',
    gradient: 'from-red-500 to-pink-600',
    href: '#',
  },
  {
    icon: Bot,
    title: 'Agent控制面板',
    description: '管理和调度AI Agent，实现自动化学习任务',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    href: '#',
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
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
            强大功能模块
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            六大核心模块，覆盖学习全流程，让AI成为你的学习伙伴
          </p>
        </motion.div>

        {/* 功能卡片 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={feature.href} className="block h-full">
                <div className="h-full p-6 rounded-2xl bg-dark-900/50 border border-dark-700 hover:border-cyan-500/30 transition-all duration-300 hover-lift">
                  {/* 图标 */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 mb-4">
                    {feature.description}
                  </p>

                  {/* 链接 */}
                  <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <span className="text-sm">了解更多</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
