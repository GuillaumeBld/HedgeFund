const API_BASE_URL = 'http://localhost:8000/api';

export interface DashboardStat {
    label: string;
    value: string;
    change: string;
    positive: boolean | null;
}

export interface PerformanceData {
    name: string;
    value: number;
}

export interface PortfolioAllocation {
    name: string;
    value: number;
    color: string;
}

export interface WatchlistItem {
    ticker: string;
    price: string;
    change: string;
    volume: string;
    positive: boolean;
}

export interface NewsItem {
    title: string;
    source: string;
    time: string;
}

export const fetchDashboardStats = async (): Promise<DashboardStat[]> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
};

export const fetchPerformanceData = async (): Promise<PerformanceData[]> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/performance`);
    if (!response.ok) throw new Error('Failed to fetch performance data');
    return response.json();
};

export const fetchPortfolioAllocation = async (): Promise<PortfolioAllocation[]> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/portfolio`);
    if (!response.ok) throw new Error('Failed to fetch portfolio allocation');
    return response.json();
};

export const fetchWatchlist = async (): Promise<WatchlistItem[]> => {
    const response = await fetch(`${API_BASE_URL}/market/watchlist`);
    if (!response.ok) throw new Error('Failed to fetch watchlist');
    return response.json();
};

export const fetchNews = async (): Promise<NewsItem[]> => {
    const response = await fetch(`${API_BASE_URL}/market/news`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
};
