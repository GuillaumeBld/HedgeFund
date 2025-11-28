
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const allocationData = [
  { name: 'Stocks', value: 45, color: '#137fec' },
  { name: 'ETFs', value: 30, color: '#0bda5b' },
  { name: 'Crypto', value: 15, color: '#facc15' },
  { name: 'Cash', value: 10, color: '#a855f7' },
];

const holdings = [
  { ticker: 'AAPL', name: 'Apple Inc.', qty: 150, avg: 145.20, price: 172.50, daily: 1.02, pl: 4095, val: 25875, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrO0zl6SMHOFuaCPMVQOgFScE3ymyZEPSdhvLwCZvfVX7GRVPWebc0HzYqzbe9aTjBaJ5ms1_E93FsMqF_DQ8uVHbkCb09yFc-FbMyAVT77dPidINvmww8Ih_EA0w5aoPcol4XsLi4okNJxtM08tBH9Q9GQ8Ymji8HeQQ6_gix_oa80tjtLdYhX-55lqcL_t6SfLcBd1y9iMBX0MZZgR3CFetxxBnvYjlcNNNift0vSXgwcStQ1Udw612gEvrx8t7gYFdrQSEgGblo' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', qty: 25, avg: 850.10, price: 905.20, daily: 1.39, pl: 1377.50, val: 22630, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbsXqDnIZk7ggj6-hTsUHvRWlEllkbzRketMFgi-OlYJmRzgtYc1F5Fdc6pNLv0k7f0wb3c_mLf0au3fLaUMdwhig0MGS9R_OxKibMevIgMGIMqfuvzO2a3yK81BOc7dfQWav0FvYoiKZcvcoKFEkEBWMYUbNsY3e2Onj6Ekn2fYZJJReepNho2QyQgSys8SyI_fWwJ4Et-jvT4k91ShNzShFeTE5TGKt8cdE8L9RWa6uYMgF77jd4Aaq2T5RsjbL1y5uADs35Ac35' },
  { ticker: 'TSLA', name: 'Tesla, Inc.', qty: 100, avg: 205.50, price: 185.01, daily: -1.12, pl: -2049, val: 18501, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3HbhHTtj-OlHILMITuMQlZ6OuVusytIx8EgHRbgACku5eGehN4UStynKgDUoyMObO6Jr6YnrMWG6gJx6q5puLSeBQsIsifkGqIAiwlbhs8_SJ57drMba_PYVY6fWIUZmL85BPzDlIPr8lcpKMQA_1pWEZ0ZVrbqRl4OrxCqZnBqehjA_xcOhZth-hNY3sZCe0Yp129zovPfykMVu2a1lB0mvv9bq8q4mv37cbN6BIT7EV_IuF8Za1TwBiiEkTkqvZZp0Q9pP-Cdic' },
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF', qty: 50, avg: 480.75, price: 510.33, daily: 0.61, pl: 1479, val: 25516.50, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR6rOD7OWtPJqyx5qACT8lhAVUr1CUw9aLDENCW_zWK-xE0DGDp2KDHgbTGO8zH7jub8mWMufgvCQ7MdLdczuN00nZP-Yc6rz4W-ho3HIJhAyD2vPcyOkJEx8nCx36ehnp9pk-587Py5oCX3uKnHpuHOtaaAzoIlvDZqfmS9p9S6dj0_rR7he6Vq6npqIL16Ee-yhWFw5qmS2NG1Hxv_-TAuim_-opeIP14MUttBdf9iAQ2iqDI5B_AqeDbEBU32R1qkMh8_w3NcqT' },
  { ticker: 'BTC', name: 'Bitcoin', qty: 0.50, avg: 55000, price: 65234.80, daily: -2.50, pl: 5117.40, val: 32617.40, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5wBGHa_5QxN1v4M18pdpMQGB4wBxx9mSJAGlyjqg88M8iB1KOvmVETSUkO2TWlcu6c3NbeEDpVxKNZBtS1e6XYUZ_4YAKpqGfVweNVDzddpkhDf7FIJOsGthrhndsqJcN-Ll0pcaMHGsqCmYfdPjAyju67FfALzbszaz-_jgFqx1c2-cMM-esjjlSHsHbg3l1kR4CHaR1niLYpB6Q9FG78Md-JRjBwIYLBo2aEhHnHwuYmgWXNHv_tlksqHdi8M4hEhh_YyyzWXwi' },
];

const Portfolio = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex min-w-72 flex-col gap-3">
        <p className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{t.portfolio.title}</p>
        <p className="text-text-secondary text-sm md:text-base font-normal leading-normal">{t.portfolio.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-dark bg-surface-dark">
                <p className="text-text-secondary text-base font-medium">{t.portfolio.stats.market_val}</p>
                <p className="text-white text-2xl font-bold">$1,250,432.80</p>
                <div className="flex items-center gap-2 text-[#0bda5b]">
                    <span className="material-symbols-outlined text-base">arrow_upward</span>
                    <span className="text-sm font-medium">1.25% (24h)</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-dark bg-surface-dark">
                <p className="text-text-secondary text-base font-medium">{t.portfolio.stats.total_gl}</p>
                <p className="text-white text-2xl font-bold">$230,110.45</p>
                <div className="flex items-center gap-2 text-[#0bda5b]">
                    <span className="material-symbols-outlined text-base">arrow_upward</span>
                    <span className="text-sm font-medium">22.56% (All Time)</span>
                </div>
            </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4 rounded-xl border border-border-dark p-6 bg-surface-dark items-center justify-center">
             <p className="text-white text-lg font-medium w-full text-left">{t.portfolio.stats.asset_alloc}</p>
             <div className="size-40 relative">
                 <ResponsiveContainer>
                    <PieChart>
                         <Pie data={allocationData} innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                            {allocationData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                         </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-text-secondary text-xs">{t.portfolio.stats.total_assets}</span>
                  <span className="text-white text-xl font-bold">$1.25M</span>
               </div>
             </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border-dark p-4 md:p-6 bg-surface-dark overflow-hidden">
         <p className="text-white text-lg font-medium">{t.portfolio.holdings_title}</p>
         <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-[900px] px-4 md:px-0">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border-dark">
                            <th className="py-2 px-3 text-sm font-semibold text-text-secondary">{t.portfolio.table.asset}</th>
                            <th className="py-2 px-3 text-sm font-semibold text-text-secondary text-right">{t.portfolio.table.qty}</th>
                            <th className="py-2 px-3 text-sm font-semibold text-text-secondary text-right">{t.portfolio.table.avg_cost}</th>
                            <th className="py-2 px-3 text-sm font-semibold text-text-secondary text-right">{t.portfolio.table.current_price}</th>
                            <th className="py-2 px-3 text-sm font-semibold text-text-secondary text-right">{t.portfolio.table.daily_change}</th>
                            <th className="py-2 px-3 text-sm font-semibold text-text-secondary text-right">{t.portfolio.table.total_gl}</th>
                            <th className="py-2 px-3 text-sm font-semibold text-text-secondary text-right">{t.portfolio.table.market_val}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holdings.map((h, i) => (
                            <tr key={i} className="border-b border-[#233648] hover:bg-[#233648]/40 transition-colors">
                                <td className="py-4 px-3">
                                    <div className="flex items-center gap-3">
                                        <img src={h.img} alt={h.name} className="w-8 h-8 rounded-full" />
                                        <div>
                                            <p className="text-white font-semibold">{h.ticker}</p>
                                            <p className="text-xs text-text-secondary">{h.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-3 text-white text-right">{h.qty.toFixed(2)}</td>
                                <td className="py-4 px-3 text-white text-right">${h.avg.toLocaleString()}</td>
                                <td className="py-4 px-3 text-white text-right">${h.price.toLocaleString()}</td>
                                <td className={`py-4 px-3 text-right ${h.daily >= 0 ? 'text-[#0bda5b]' : 'text-red-500'}`}>{h.daily > 0 ? '+' : ''}{h.daily}%</td>
                                <td className={`py-4 px-3 text-right ${h.pl >= 0 ? 'text-[#0bda5b]' : 'text-red-500'}`}>${h.pl.toLocaleString()}</td>
                                <td className="py-4 px-3 text-white text-right">${h.val.toLocaleString()}</td>
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

export default Portfolio;
