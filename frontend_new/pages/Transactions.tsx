
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Transactions = () => {
  const { t } = useLanguage();

  const transactions = [
    { date: 'Apr 15, 2024', type: t.transactions.types.buy, asset: 'NVDA', qty: 10, price: 905.20, total: 9052.00, status: t.transactions.status.completed, typeClass: 'bg-primary/20 text-primary', statusClass: 'bg-green-500/20 text-green-400' },
    { date: 'Apr 14, 2024', type: t.transactions.types.sell, asset: 'TSLA', qty: 25, price: 187.11, total: 4677.75, status: t.transactions.status.completed, typeClass: 'bg-red-500/20 text-red-500', statusClass: 'bg-green-500/20 text-green-400' },
    { date: 'Apr 12, 2024', type: t.transactions.types.deposit, asset: 'USD', qty: null, price: null, total: 10000.00, status: t.transactions.status.completed, typeClass: 'bg-green-500/20 text-green-400', statusClass: 'bg-green-500/20 text-green-400' },
    { date: 'Apr 10, 2024', type: t.transactions.types.buy, asset: 'AAPL', qty: 50, price: 170.75, total: 8537.50, status: t.transactions.status.completed, typeClass: 'bg-primary/20 text-primary', statusClass: 'bg-green-500/20 text-green-400' },
    { date: 'Apr 09, 2024', type: t.transactions.types.withdrawal, asset: 'USD', qty: null, price: null, total: -2500.00, status: t.transactions.status.pending, typeClass: 'bg-yellow-500/20 text-yellow-400', statusClass: 'bg-yellow-500/20 text-yellow-400' },
    { date: 'Apr 05, 2024', type: t.transactions.types.buy, asset: 'SPY', qty: 15, price: 507.21, total: 7608.15, status: t.transactions.status.completed, typeClass: 'bg-primary/20 text-primary', statusClass: 'bg-green-500/20 text-green-400' },
    { date: 'Apr 02, 2024', type: t.transactions.types.sell, asset: 'GOOGL', qty: 30, price: 155.40, total: 4662.00, status: t.transactions.status.failed, typeClass: 'bg-red-500/20 text-red-500', statusClass: 'bg-red-500/20 text-red-500' },
    { date: 'Mar 28, 2024', type: t.transactions.types.deposit, asset: 'USD', qty: null, price: null, total: 25000.00, status: t.transactions.status.completed, typeClass: 'bg-green-500/20 text-green-400', statusClass: 'bg-green-500/20 text-green-400' },
  ];

  return (
    <div className="flex flex-col gap-6">
       <div className="flex flex-wrap justify-between items-start gap-3 mb-6">
        <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{t.transactions.title}</p>
            <p className="text-text-secondary text-sm md:text-base font-normal leading-normal">{t.transactions.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 h-10 px-4 bg-[#233648] hover:bg-[#324d67] rounded-lg text-white text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                <span>{t.transactions.filter}</span>
            </button>
            <button className="flex items-center gap-2 h-10 px-4 bg-[#233648] hover:bg-[#324d67] rounded-lg text-white text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>{t.transactions.export}</span>
            </button>
        </div>
       </div>

       <div className="overflow-x-auto rounded-xl border border-border-dark bg-surface-dark">
          <div className="min-w-[900px]">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-border-dark">
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary whitespace-nowrap">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-white">{t.transactions.table.date} <span className="material-symbols-outlined text-base">arrow_downward</span></div>
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary whitespace-nowrap">{t.transactions.table.type}</th>
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary whitespace-nowrap">{t.transactions.table.asset}</th>
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary whitespace-nowrap text-right">{t.transactions.table.qty}</th>
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary whitespace-nowrap text-right">{t.transactions.table.price}</th>
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary whitespace-nowrap text-right">{t.transactions.table.total}</th>
                        <th className="py-3 px-4 text-sm font-semibold text-text-secondary whitespace-nowrap text-center">{t.transactions.table.status}</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx, i) => (
                        <tr key={i} className="border-b border-[#233648] hover:bg-[#233648]/40 transition-colors">
                            <td className="py-3 px-4 text-white font-medium text-sm">{tx.date}</td>
                            <td className="py-3 px-4 text-white"><span className={`${tx.typeClass} font-semibold text-xs py-1 px-2 rounded-full`}>{tx.type}</span></td>
                            <td className="py-3 px-4 text-white font-semibold">{tx.asset}</td>
                            <td className="py-3 px-4 text-white text-right">{tx.qty ? tx.qty : '-'}</td>
                            <td className="py-3 px-4 text-white text-right">{tx.price ? `$${tx.price}` : '-'}</td>
                            <td className="py-3 px-4 text-white text-right">{tx.total < 0 ? '-' : ''}${Math.abs(tx.total).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            <td className="py-3 px-4 text-center"><span className={`inline-flex items-center gap-1.5 py-1 px-2 rounded-full text-xs font-medium ${tx.statusClass}`}>{tx.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
       </div>
       
       <div className="flex justify-between items-center mt-2">
           <p className="text-sm text-text-secondary">{t.transactions.showing}</p>
           <div className="flex items-center gap-2">
               <button className="flex items-center justify-center size-9 bg-[#233648] rounded-lg text-white hover:bg-primary disabled:opacity-50 transition-colors"><span className="material-symbols-outlined text-xl">chevron_left</span></button>
               <button className="flex items-center justify-center size-9 bg-primary rounded-lg text-white text-sm font-bold">1</button>
               <button className="flex items-center justify-center size-9 bg-[#233648] rounded-lg text-white text-sm font-bold hover:bg-primary transition-colors">2</button>
               <button className="flex items-center justify-center size-9 bg-[#233648] rounded-lg text-white hover:bg-primary transition-colors"><span className="material-symbols-outlined text-xl">chevron_right</span></button>
           </div>
       </div>
    </div>
  );
};

export default Transactions;
