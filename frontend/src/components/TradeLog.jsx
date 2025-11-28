import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle, AlertCircle, Info } from 'lucide-react';

const LogItem = ({ log }) => {
    const icons = {
        info: <Info className="w-4 h-4 text-blue-400" />,
        success: <CheckCircle className="w-4 h-4 text-green-400" />,
        error: <AlertCircle className="w-4 h-4 text-red-400" />,
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3 text-sm py-2 border-b border-white/5 last:border-0"
        >
            <span className="mt-0.5">{icons[log.type] || icons.info}</span>
            <span className="text-gray-300 font-mono">{log.message}</span>
            <span className="ml-auto text-xs text-gray-600">
                {new Date().toLocaleTimeString()}
            </span>
        </motion.div>
    );
};

const TradeLog = ({ logs }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[600px] w-full max-w-2xl"
        >
            <div className="p-4 border-b border-white/10 flex items-center gap-2 bg-white/5">
                <Terminal className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold text-gray-200">System Logs</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                <AnimatePresence>
                    {logs.length === 0 ? (
                        <div className="text-gray-600 text-center mt-20 italic">
                            Ready for execution...
                        </div>
                    ) : (
                        logs.map((log, index) => (
                            <LogItem key={index} log={log} />
                        ))
                    )}
                </AnimatePresence>
                <div ref={bottomRef} />
            </div>
        </motion.div>
    );
};

export default TradeLog;
