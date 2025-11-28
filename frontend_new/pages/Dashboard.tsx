
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import {
  fetchDashboardStats,
  fetchPerformanceData,
  fetchPortfolioAllocation,
  fetchWatchlist,
  fetchNews,
  DashboardStat,
  PerformanceData,
  PortfolioAllocation,
  WatchlistItem,
  NewsItem
} from '../services/api';

const Dashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [allocationData, setAllocationData] = useState<PortfolioAllocation[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, perfData, allocData, watchData, newsData] = await Promise.all([
          fetchDashboardStats(),
          fetchPerformanceData(),
          fetchPortfolioAllocation(),
          fetchWatchlist(),
          fetchNews()
        ]);
        setStats(statsData);
        setPerformanceData(perfData);
        setAllocationData(allocData);
        setWatchlist(watchData);
        setNews(newsData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="text-white text-center p-10">Loading dashboard data...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{t.dashboard.title}</p>
          <p className="text-text-secondary text-sm md:text-base font-normal leading-normal">{t.dashboard.welcome}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-4 md:p-6 border border-border-dark bg-surface-dark">
            <p className="text-text-secondary text-sm md:text-base font-medium leading-normal">{stat.label}</p>
            <p className="text-white tracking-light text-xl md:text-2xl font-bold leading-tight truncate">{stat.value}</p>
            <p className={`text-sm md:text-base font-medium leading-normal ${stat.positive === true ? 'text-[#0bda5b]' : stat.positive === false ? 'text-red-500' : 'text-transparent'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="col-span-1 xl:col-span-2 flex min-w-72 flex-col gap-2 rounded-xl border border-border-dark p-4 md:p-6 bg-surface-dark">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <div>
              <p className="text-white text-lg font-medium leading-normal">{t.dashboard.perf_history}</p>
              <div className="flex gap-2 items-baseline">
                <p className="text-white tracking-light text-2xl md:text-[32px] font-bold leading-tight truncate">$1,250,432.80</p>
                <p className="text-[#0bda5b] text-sm md:text-base font-medium leading-normal">+22.56% (1Y)</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#233648] p-1 rounded-lg self-start sm:self-center overflow-x-auto max-w-full">
              {[t.dashboard.timeframes.d1, t.dashboard.timeframes.w1, t.dashboard.timeframes.m1, t.dashboard.timeframes.y1, t.dashboard.timeframes.all].map(period => (
                <button key={period} className={`px-3 py-1 text-xs md:text-sm rounded-md transition-colors whitespace-nowrap ${period === t.dashboard.timeframes.y1 ? 'bg-primary text-white font-semibold' : 'text-white hover:bg-white/10'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[200px] md:h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#137fec" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#137fec" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#137fec" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Portfolio Allocation */}
        <div className="col-span-1 xl:col-span-1 flex min-w-72 flex-col gap-4 rounded-xl border border-border-dark p-4 md:p-6 bg-surface-dark">
          <p className="text-white text-lg font-medium leading-normal">{t.dashboard.portfolio_alloc}</p>
          <div className="flex justify-center items-center py-4 relative">
            <div className="h-40 w-40 md:h-48 md:w-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-text-secondary text-xs md:text-sm">{t.dashboard.total_assets}</span>
                <span className="text-white text-lg md:text-xl font-bold">$1.25M</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <p className="text-white text-sm">{item.name}</p>
                </div>
                <p className="text-white font-semibold text-sm">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Watchlist */}
        <div className="col-span-1 xl:col-span-2 flex flex-col gap-4 rounded-xl border border-border-dark p-4 md:p-6 bg-surface-dark overflow-hidden">
          <p className="text-white text-lg font-medium leading-normal">{t.dashboard.watchlist}</p>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-[700px] px-4 md:px-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-solid border-border-dark">
                    <th className="py-2 px-3 text-sm font-semibold text-text-secondary">{t.dashboard.table.ticker}</th>
                    <th className="py-2 px-3 text-sm font-semibold text-text-secondary">{t.dashboard.table.price}</th>
                    <th className="py-2 px-3 text-sm font-semibold text-text-secondary">{t.dashboard.table.change}</th>
                    <th className="py-2 px-3 text-sm font-semibold text-text-secondary">{t.dashboard.table.volume}</th>
                    <th className="py-2 px-3 text-sm font-semibold text-text-secondary text-right">{t.dashboard.table.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((stock) => (
                    <tr key={stock.ticker} className="border-b border-solid border-[#233648] hover:bg-[#233648]/40 transition-colors">
                      <td className="py-3 px-3 text-white font-semibold">{stock.ticker}</td>
                      <td className="py-3 px-3 text-white">{stock.price}</td>
                      <td className={`py-3 px-3 ${stock.positive ? 'text-[#0bda5b]' : 'text-red-500'}`}>{stock.change}</td>
                      <td className="py-3 px-3 text-white">{stock.volume}</td>
                      <td className="py-3 px-3 text-white flex justify-end gap-2">
                        <button className="bg-primary/20 hover:bg-primary/30 text-primary font-bold py-1 px-3 md:px-4 rounded-lg text-xs md:text-sm transition-colors">{t.dashboard.table.buy}</button>
                        <button className="bg-red-500/20 hover:bg-red-500/30 text-red-500 font-bold py-1 px-3 md:px-4 rounded-lg text-xs md:text-sm transition-colors">{t.dashboard.table.sell}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* News Feed */}
        <div className="col-span-1 flex flex-col gap-4 rounded-xl border border-border-dark p-4 md:p-6 bg-surface-dark">
          <p className="text-white text-lg font-medium leading-normal">{t.dashboard.news_feed}</p>
          <div className="flex flex-col gap-4">
            {news.length > 0 ? (
              news.map((item, i) => (
                <div key={i} className="flex flex-col">
                  <a className="text-white font-semibold hover:text-primary transition-colors cursor-pointer text-sm md:text-base line-clamp-2">{item.title}</a>
                  <p className="text-xs text-text-secondary">{item.source} · {item.time}</p>
                </div>
              ))
            ) : (
              <p className="text-text-secondary text-sm">No news available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
