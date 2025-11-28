import React, { useState } from 'react';
import TradeForm from './components/TradeForm';
import TradeLog from './components/TradeLog';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

function App() {
  const [logs, setLogs] = useState([]);
  const [activeTrade, setActiveTrade] = useState(null);

  const handleLog = (log) => {
    setLogs(prev => [...prev, log]);
  };

  const handleTradeStart = (tradeData) => {
    setActiveTrade(tradeData);
    handleLog({ type: 'info', message: `Trade ID: ${tradeData.id} initialized.` });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative selection:bg-blue-500/30">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">AutoHedge</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-lg mx-auto"
          >
            Autonomous AI-driven hedge fund management system.
            Deploy multi-agent strategies in seconds.
          </motion.p>
        </header>

        <main className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <TradeForm onTradeStart={handleTradeStart} onLog={handleLog} />
          <TradeLog logs={logs} />
        </main>
      </div>
    </div>
  );
}

export default App;
