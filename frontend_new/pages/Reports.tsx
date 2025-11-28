
import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const data = [
  { name: 'Jan', portfolio: 20, benchmark: 15 },
  { name: 'Feb', portfolio: 25, benchmark: 18 },
  { name: 'Mar', portfolio: 35, benchmark: 22 },
  { name: 'Apr', portfolio: 30, benchmark: 25 },
  { name: 'May', portfolio: 45, benchmark: 30 },
  { name: 'Jun', portfolio: 55, benchmark: 35 },
  { name: 'Jul', portfolio: 50, benchmark: 38 },
  { name: 'Aug', portfolio: 65, benchmark: 42 },
  { name: 'Sep', portfolio: 60, benchmark: 45 },
  { name: 'Oct', portfolio: 80, benchmark: 50 },
  { name: 'Nov', portfolio: 75, benchmark: 52 },
  { name: 'Dec', portfolio: 95, benchmark: 60 },
];

const Reports = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col gap-3">
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{t.reports.title}</h1>
            <p className="text-text-secondary text-sm md:text-base font-normal leading-normal">{t.reports.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="flex items-center justify-center gap-2 rounded-lg bg-[#233648] px-4 py-2 text-sm font-medium text-white h-10 hover:bg-[#324d67] transition-colors">
                <span className="material-symbols-outlined text-white text-[20px]">download</span>
                <span className="hidden sm:inline">{t.reports.download}</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white h-10 hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined text-white text-[20px]">add_chart</span>
                <span>{t.reports.generate}</span>
            </button>
        </div>
      </div>

      <div className="rounded-xl border border-border-dark bg-surface-dark p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-text-secondary text-sm font-medium">{t.reports.labels.timeframe}</label>
                <select className="w-full rounded-lg border-none bg-[#233648] text-white focus:outline-0 focus:ring-2 focus:ring-primary h-10 px-3">
                    <option>{t.reports.options.last_30}</option>
                    <option>{t.reports.options.last_12m}</option>
                    <option>{t.reports.options.ytd}</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-text-secondary text-sm font-medium">{t.reports.labels.benchmark}</label>
                <select className="w-full rounded-lg border-none bg-[#233648] text-white focus:outline-0 focus:ring-2 focus:ring-primary h-10 px-3">
                    <option>S&P 500 (SPY)</option>
                    <option>NASDAQ 100 (QQQ)</option>
                </select>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-2">
                <label className="text-text-secondary text-sm font-medium">{t.reports.labels.metrics}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 pt-2">
                    {[
                        t.reports.metrics.total_return, 
                        t.reports.metrics.sharpe, 
                        t.reports.metrics.volatility, 
                        t.reports.metrics.alpha, 
                        t.reports.metrics.max_dd, 
                        t.reports.metrics.sortino, 
                        t.reports.metrics.beta, 
                        t.reports.metrics.var
                    ].map((m, i) => (
                        <label key={i} className="flex items-center gap-2 text-white text-sm cursor-pointer">
                            <input type="checkbox" defaultChecked={i % 2 === 0 || i === 4} className="rounded bg-[#233648] border-border-dark text-primary focus:ring-primary" /> {m}
                        </label>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 flex flex-col gap-6 rounded-xl border border-border-dark p-4 md:p-6 bg-surface-dark">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <p className="text-white text-lg font-medium leading-normal">{t.reports.growth_chart}</p>
                    <p className="text-text-secondary text-sm">{t.reports.labels.timeframe}: {t.reports.options.last_12m}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-sm bg-primary"></div>
                        <span className="text-white text-sm font-medium">{t.reports.your_portfolio}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-sm border-2 border-dashed border-[#0bda5b]"></div>
                        <span className="text-white text-sm font-medium">S&P 500</span>
                    </div>
                </div>
            </div>
            <div className="h-64 md:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#137fec" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="portfolio" stroke="#137fec" strokeWidth={3} fillOpacity={1} fill="url(#colorPortfolio)" />
                        <Area type="monotone" dataKey="benchmark" stroke="#0bda5b" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </div>

         <div className="flex flex-col gap-4 rounded-xl border border-border-dark p-4 md:p-6 bg-surface-dark">
            <h3 className="text-white text-lg font-medium">{t.reports.kpi_title}</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                    { l: t.reports.metrics.total_return, v: '+22.56%' },
                    { l: 'Benchmark Return', v: '+18.42%' },
                    { l: t.reports.metrics.sharpe, v: '1.85' },
                    { l: t.reports.metrics.sortino, v: '2.54' },
                    { l: `${t.reports.metrics.volatility} (Ann.)`, v: '15.8%' },
                    { l: t.reports.metrics.max_dd, v: '-8.45%' },
                    { l: t.reports.metrics.alpha, v: '+4.14%', c: 'text-green-400' },
                    { l: t.reports.metrics.beta, v: '0.92' }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <p className="text-text-secondary text-sm">{item.l}</p>
                        <p className={`text-xl font-bold ${item.c || 'text-white'}`}>{item.v}</p>
                    </div>
                ))}
            </div>
         </div>
      </div>

      <div className="rounded-xl border border-border-dark bg-surface-dark p-4 md:p-6 overflow-hidden">
        <h3 className="text-white text-lg font-medium mb-4">{t.reports.breakdown_title}</h3>
        <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-[600px] px-4 md:px-0">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border-dark">
                            <th className="py-3 px-4 text-sm font-semibold text-text-secondary">{t.reports.table.metric}</th>
                            <th className="py-3 px-4 text-sm font-semibold text-text-secondary text-right">{t.reports.your_portfolio}</th>
                            <th className="py-3 px-4 text-sm font-semibold text-text-secondary text-right">Benchmark (S&P 500)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { m: t.reports.table.annual_return, p: '22.56%', b: '18.42%' },
                            { m: t.reports.table.cum_return, p: '22.56%', b: '18.42%' },
                            { m: t.reports.table.best_month, p: '+5.21%', b: '+4.88%', c: 'text-green-400' },
                            { m: t.reports.table.worst_month, p: '-3.15%', b: '-4.02%', c: 'text-red-500' },
                            { m: t.reports.metrics.max_dd, p: '-8.45%', b: '-10.11%', c: 'text-red-500' },
                        ].map((row, i) => (
                            <tr key={i} className="border-b border-[#233648]">
                                <td className="py-3 px-4 text-white font-medium">{row.m}</td>
                                <td className={`py-3 px-4 text-right ${row.c || 'text-white'}`}>{row.p}</td>
                                <td className={`py-3 px-4 text-right ${row.c || 'text-white'}`}>{row.b}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
