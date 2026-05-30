import Head from 'next/head';
import Hero from '../components/Hero';
import Features from '../components/Features';
import DashboardPreview from '../components/DashboardPreview';
import AgentStatus from '../components/AgentStatus';
import GitHubTrending from '../components/GitHubTrending';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Study OS - 大学生智能学习工作台</title>
        <meta name="description" content="为大学生打造的智能学习工作台，AI论文助手、课程总结、PPT生成、Agent协作" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-dark-950">
        {/* Hero Section */}
        <Hero />

        {/* 功能模块 */}
        <Features />

        {/* Dashboard 预览 */}
        <DashboardPreview />

        {/* Agent 状态 */}
        <AgentStatus />

        {/* GitHub 热榜 */}
        <GitHubTrending />

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-dark-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">🤖</span>
                <span className="text-2xl font-bold text-gradient">AI Study OS</span>
              </div>

              {/* 链接 */}
              <div className="flex flex-wrap justify-center gap-8">
                {['功能', '文档', '博客', '社区', '支持'].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* 社交 */}
              <div className="flex gap-4">
                {['GitHub', 'Twitter', 'Discord'].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-gray-400 hover:text-white hover:border-cyan-500/30 transition-all"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-dark-800 text-center text-gray-500 text-sm">
              <p>© 2024 AI Study OS. All rights reserved.</p>
              <p className="mt-2">Built with ❤️ for students</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
