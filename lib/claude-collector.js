const fs = require('fs');
const path = require('path');
const os = require('os');

class ClaudeCollector {
  constructor() {
    this.claudeDir = path.join(os.homedir(), '.claude');
    this.petLogPath = path.join(os.homedir(), '.claude-pet', 'claude.log');
    this.state = this.getDefaultState();
    this.lastUpdate = 0;
  }

  getDefaultState() {
    return {
      model: 'Unknown',
      status: 'idle',
      currentTask: 'None',
      sessionId: '',
      sessionStart: null,
      uptime: 0,
      inputTokens: 0,
      outputTokens: 0,
      cacheTokens: 0,
      totalTokens: 0,
      tokenSpeed: 0,
      estimatedCost: 0,
      recentCommands: [],
      agentTasks: [],
      lastUpdate: new Date().toISOString()
    };
  }

  collect() {
    try {
      this.collectFromSettings();
      this.collectFromSessions();
      this.collectFromPetLog();
      this.collectFromHistory();
      this.calculateDerived();
      this.lastUpdate = Date.now();
      return { ...this.state };
    } catch (error) {
      console.error('Collection error:', error.message);
      return this.state;
    }
  }

  collectFromSettings() {
    try {
      const settingsPath = path.join(this.claudeDir, 'settings.json');
      if (!fs.existsSync(settingsPath)) return;

      const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
      const env = settings.env || {};

      if (env.ANTHROPIC_MODEL) {
        this.state.model = env.ANTHROPIC_MODEL;
      }
    } catch (e) {}
  }

  collectFromSessions() {
    try {
      const sessionsDir = path.join(this.claudeDir, 'sessions');
      if (!fs.existsSync(sessionsDir)) return;

      const files = fs.readdirSync(sessionsDir);
      let activeSession = null;
      let latestTime = 0;

      files.forEach(file => {
        if (!file.endsWith('.json')) return;
        try {
          const filePath = path.join(sessionsDir, file);
          const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

          if (data.updatedAt > latestTime) {
            latestTime = data.updatedAt;
            activeSession = data;
          }
        } catch (e) {}
      });

      if (activeSession) {
        this.state.sessionId = activeSession.sessionId || '';
        this.state.status = activeSession.status === 'busy' ? 'running' : 'idle';

        if (activeSession.startedAt) {
          this.state.sessionStart = activeSession.startedAt;
          this.state.uptime = Math.floor((Date.now() - activeSession.startedAt) / 1000);
        }
      }
    } catch (e) {}
  }

  collectFromPetLog() {
    try {
      if (!fs.existsSync(this.petLogPath)) return;

      const content = fs.readFileSync(this.petLogPath, 'utf-8');
      const lines = content.trim().split('\n');

      // 获取最近 20 条命令
      const recentLines = lines.slice(-20);
      this.state.recentCommands = recentLines.map(line => {
        const match = line.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+(.*)/);
        return match ? { time: match[1], command: match[2] } : null;
      }).filter(Boolean).reverse();

      // 检测当前状态
      const lastLine = lines[lines.length - 1] || '';
      if (lastLine.includes('fetching') || lastLine.includes('running')) {
        this.state.status = 'running';
        const match = lastLine.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\s+(.*)/);
        this.state.currentTask = match ? match[1] : 'Processing';
      } else if (lastLine.includes('success') || lastLine.includes('done')) {
        this.state.status = 'idle';
        this.state.currentTask = 'None';
      } else if (lastLine.includes('error')) {
        this.state.status = 'error';
      }

      // 统计任务类型
      const taskCounts = {};
      lines.forEach(line => {
        const match = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\s+(.*)/);
        if (match) {
          const task = match[1];
          taskCounts[task] = (taskCounts[task] || 0) + 1;
        }
      });

      this.state.agentTasks = Object.entries(taskCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    } catch (e) {}
  }

  collectFromHistory() {
    try {
      const historyPath = path.join(this.claudeDir, 'history.jsonl');
      if (!fs.existsSync(historyPath)) return;

      const content = fs.readFileSync(historyPath, 'utf-8');
      const lines = content.trim().split('\n');

      // 估算 token 使用
      const entryCount = lines.length;
      const tokensPerEntry = 300;

      this.state.inputTokens = entryCount * tokensPerEntry;
      this.state.outputTokens = Math.floor(entryCount * tokensPerEntry * 0.5);
      this.state.cacheTokens = Math.floor(entryCount * tokensPerEntry * 0.3);
      this.state.totalTokens = this.state.inputTokens + this.state.outputTokens + this.state.cacheTokens;

    } catch (e) {}
  }

  calculateDerived() {
    // 计算 token 速度
    if (this.state.uptime > 0) {
      this.state.tokenSpeed = Math.floor(this.state.totalTokens / this.state.uptime);
    }

    // 计算估算费用
    this.state.estimatedCost = (
      (this.state.inputTokens / 1000000) * 3 +
      (this.state.outputTokens / 1000000) * 15 +
      (this.state.cacheTokens / 1000000) * 0.30
    ).toFixed(4);

    this.state.lastUpdate = new Date().toISOString();
  }
}

module.exports = { ClaudeCollector };
