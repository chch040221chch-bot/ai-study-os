import Head from 'next/head';
import TokenMonitor from '../components/TokenMonitor';

export default function TokenPage() {
  return (
    <>
      <Head>
        <title>Token Monitor - AI Study OS</title>
        <meta name="description" content="实时监控 Claude Code Token 使用量" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      <TokenMonitor />
    </>
  );
}
