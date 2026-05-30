const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { WebSocketServer } = require('ws');
const { ClaudeCollector } = require('./lib/claude-collector');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const collector = new ClaudeCollector();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);

      // API 路由
      if (parsedUrl.pathname === '/api/agent-status') {
        const data = collector.collect();
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(data));
        return;
      }

      if (parsedUrl.pathname === '/api/token-live') {
        const data = collector.collect();
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({
          model: data.model,
          totalTokens: data.totalTokens,
          inputTokens: data.inputTokens,
          outputTokens: data.outputTokens,
          cacheTokens: data.cacheTokens,
          tokenSpeed: data.tokenSpeed,
          estimatedCost: data.estimatedCost,
          lastUpdate: data.lastUpdate
        }));
        return;
      }

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error:', err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // WebSocket 服务器
  const wss = new WebSocketServer({ noServer: true });
  const clients = new Set();

  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected. Total:', clients.size);

    // 发送初始数据
    const initialData = collector.collect();
    ws.send(JSON.stringify({ type: 'init', data: initialData }));

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected. Total:', clients.size);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });
  });

  // 处理 WebSocket 升级
  server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url, true);
    if (pathname === '/ws') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  // 广播更新
  const broadcast = (data) => {
    const message = JSON.stringify(data);
    clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  };

  // 定时更新（每 3 秒）
  setInterval(() => {
    const stats = collector.collect();
    broadcast({ type: 'update', data: stats });
  }, 3000);

  server.listen(port, hostname, () => {
    console.log('\n' + '='.repeat(60));
    console.log('  AI Study OS 已启动');
    console.log('='.repeat(60));
    console.log(`  本地访问:    http://localhost:${port}`);
    console.log(`  局域网访问:  http://172.20.10.2:${port}`);
    console.log('='.repeat(60));
    console.log('  API 端点:');
    console.log(`    - /api/agent-status`);
    console.log(`    - /api/token-live`);
    console.log(`    - ws://localhost:${port}/ws`);
    console.log('='.repeat(60) + '\n');
  });
});
