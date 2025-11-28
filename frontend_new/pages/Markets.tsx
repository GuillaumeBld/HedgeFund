
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Markets = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
       <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{t.markets.title}</p>
            <p className="text-text-secondary text-sm md:text-base font-normal leading-normal">{t.markets.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 bg-[#111a22] p-1 rounded-lg border border-border-dark overflow-x-auto max-w-full">
            <button className="px-4 py-1.5 text-sm text-white bg-primary rounded-md font-semibold whitespace-nowrap">{t.markets.filters.all}</button>
            <button className="px-4 py-1.5 text-sm text-text-secondary hover:text-white rounded-md transition-colors whitespace-nowrap">{t.markets.filters.equities}</button>
            <button className="px-4 py-1.5 text-sm text-text-secondary hover:text-white rounded-md transition-colors whitespace-nowrap">{t.markets.filters.crypto}</button>
            <button className="px-4 py-1.5 text-sm text-text-secondary hover:text-white rounded-md transition-colors whitespace-nowrap">{t.markets.filters.macro}</button>
            <button className="px-4 py-1.5 text-sm text-text-secondary hover:text-white rounded-md transition-colors whitespace-nowrap">{t.markets.filters.analysis}</button>
        </div>
       </div>

       <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col gap-4 p-4 md:p-6 rounded-xl border border-border-dark bg-surface-dark">
                <span className="text-sm font-semibold text-primary">{t.markets.featured}</span>
                <h3 className="text-2xl font-bold text-white">The Future of AI: Investing in the Next Technological Revolution</h3>
                <p className="text-text-secondary text-sm md:text-base">Explore the burgeoning AI sector, identifying key players, potential market growth, and strategic investment opportunities for the long term. This deep dive covers everything from semiconductor giants to innovative software startups.</p>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <span>By Jane Foster, PhD</span>
                    <span>•</span>
                    <span>May 20, 2024</span>
                </div>
                <a className="text-primary font-semibold text-sm flex items-center gap-1 cursor-pointer hover:underline">{t.markets.read_full} <span className="material-symbols-outlined text-base">arrow_forward</span></a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { label: 'EQUITIES', time: '2 hours ago', title: 'Tech Stocks Surge as Inflation Fears Subside', desc: 'Major tech indices saw significant gains today after the latest CPI report came in lower than expected.' },
                    { label: 'CRYPTO', time: '5 hours ago', title: 'Bitcoin Hovers Around $65k Amidst Regulatory Uncertainty', desc: 'The cryptocurrency market remains volatile as traders await clearer guidance from international regulators.' },
                    { label: 'MACRO', time: '1 day ago', title: "Federal Reserve Chairman Signals a 'Patient' Stance", desc: 'In a recent speech, the Fed chair emphasized a data-driven approach, suggesting that interest rates will likely hold steady.' },
                    { label: 'COMMODITIES', time: '2 days ago', title: 'Oil Prices Climb on Supply Disruption Concerns', desc: 'Crude oil futures rose sharply following reports of potential supply chain disruptions in key oil-producing regions.' }
                ].map((news, i) => (
                    <div key={i} className="flex flex-col gap-4 p-4 md:p-6 rounded-xl border border-border-dark bg-surface-dark">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-text-secondary bg-[#233648] px-2 py-1 rounded">{news.label}</span>
                            <span className="text-xs text-text-secondary">{news.time}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white leading-snug">{news.title}</h4>
                        <p className="text-sm text-text-secondary line-clamp-3">{news.desc}</p>
                        <a className="text-primary font-semibold text-sm mt-auto cursor-pointer hover:underline">{t.markets.read_more}</a>
                    </div>
                ))}
            </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
             <div className="flex flex-col gap-4 p-4 md:p-6 rounded-xl border border-border-dark bg-surface-dark sticky top-24">
                <h3 className="text-white text-lg font-medium leading-normal">{t.markets.trending}</h3>
                <div className="flex flex-col gap-4">
                    {[
                        { title: 'Global Markets Rally on Positive Inflation Data', source: 'Bloomberg', time: '15 mins ago' },
                        { title: 'Tech Sector Sees Record Investment In Q1', source: 'Reuters', time: '45 mins ago' },
                        { title: 'Federal Reserve Hints at Pausing Rate Hikes', source: 'Wall Street Journal', time: '1 hour ago' },
                        { title: 'Oil Prices Surge Amid Geopolitical Tensions', source: 'CNBC', time: '2 hours ago' },
                        { title: 'Emerging Markets: A Risk Worth Taking?', source: 'The Economist', time: '3 hours ago' }
                    ].map((topic, i) => (
                        <div key={i} className={`flex flex-col pb-4 ${i !== 4 ? 'border-b border-[#324d67]' : ''}`}>
                            <a className="text-white font-semibold hover:text-primary leading-snug cursor-pointer transition-colors text-sm md:text-base">{topic.title}</a>
                            <p className="text-xs text-text-secondary">{topic.source} · {topic.time}</p>
                        </div>
                    ))}
                </div>
                <a className="text-primary text-sm font-semibold mt-2 cursor-pointer hover:underline">{t.markets.view_all} →</a>
             </div>
        </div>
       </div>
    </div>
  );
};

export default Markets;
