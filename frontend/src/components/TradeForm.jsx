import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Activity, DollarSign, Key } from 'lucide-react';
import axios from 'axios';

const TradeForm = ({ onTradeStart, onLog }) => {
    const [formData, setFormData] = useState({
        stocks: '',
        task: 'Analyze and trade based on market trends',
        allocation: 10000,
        apiKey: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        onLog({ type: 'info', message: 'Initiating trade sequence...' });

        try {
            const stocksList = formData.stocks.split(',').map(s => s.trim());

            // In a real scenario, we would call the API here.
            // For now, we'll simulate the call or try to call localhost if running.
            // const response = await axios.post('http://localhost:8000/trades', {
            //   stocks: stocksList,
            //   task: formData.task,
            //   allocation: Number(formData.allocation)
            // }, {
            //   headers: { 'X-API-Key': formData.apiKey }
            // });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            onTradeStart({
                id: 'trade-' + Date.now(),
                status: 'EXECUTING',
                stocks: stocksList,
                allocation: formData.allocation
            });
            onLog({ type: 'success', message: `Trade started for ${stocksList.join(', ')}` });

        } catch (error) {
            onLog({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/50 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AutoHedge Terminal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Target Assets (comma separated)</label>
                    <div className="relative">
                        <Activity className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="BTC-USD, NVDA, AAPL"
                            className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors text-white"
                            value={formData.stocks}
                            onChange={(e) => setFormData({ ...formData, stocks: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Allocation Amount ($)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                        <input
                            type="number"
                            className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors text-white"
                            value={formData.allocation}
                            onChange={(e) => setFormData({ ...formData, allocation: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Strategy / Task</label>
                    <textarea
                        className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 px-4 focus:outline-none focus:border-accent transition-colors h-24 resize-none text-white"
                        value={formData.task}
                        onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">API Key</label>
                    <div className="relative">
                        <Key className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                        <input
                            type="password"
                            className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors text-white"
                            value={formData.apiKey}
                            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                            placeholder="Enter your AutoHedge API Key"
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white ${loading
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                        }`}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Play className="w-5 h-5" />
                            Execute Strategy
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default TradeForm;
