
import React, { createContext, useState, useContext, ReactNode, PropsWithChildren } from 'react';

type Language = 'en' | 'fr';

const translations = {
  en: {
    nav: {
      dashboard: 'Dashboard',
      portfolio: 'Portfolio',
      strategy: 'Strategy Builder',
      research: 'Research',
      transactions: 'Transactions',
      reports: 'Reports',
      settings: 'Settings',
      logout: 'Log Out',
      deposit: 'Deposit'
    },
    dashboard: {
      title: 'Dashboard',
      welcome: "Welcome back, John. Here's your portfolio overview.",
      stats: {
        total_val: 'Total Portfolio Value',
        todays_pl: "Today's P&L",
        total_return: 'Total Return',
        buying_power: 'Buying Power',
        sharpe: 'Sharpe Ratio',
        sortino: 'Sortino Ratio',
        var: 'Value at Risk (95%)',
        max_dd: 'Max Drawdown'
      },
      perf_history: 'Performance History',
      portfolio_alloc: 'Portfolio Allocation',
      total_assets: 'Total Assets',
      watchlist: 'Watchlist',
      news_feed: 'News Feed',
      table: {
        ticker: 'Ticker',
        price: 'Price',
        change: 'Change',
        volume: 'Volume',
        actions: 'Actions',
        buy: 'Buy',
        sell: 'Sell'
      },
      timeframes: {
        d1: '1D', w1: '1W', m1: '1M', y1: '1Y', all: 'ALL'
      }
    },
    strategy: {
      title: 'Strategy Builder',
      tabs: { config: 'Config', chat: 'AI Chat' },
      create_new: 'Create New Strategy',
      name_label: 'Strategy Name',
      name_placeholder: 'e.g., Q1 Growth Strategy',
      desc_label: 'Description / Thesis',
      desc_placeholder: 'Describe your investment thesis, target assets, risk tolerance...',
      save_btn: 'Save Strategy',
      saved_title: 'Saved Strategies',
      assistant_title: 'Strategy AI Assistant',
      input_placeholder: 'Ask me to backtest...',
      status: { active: 'Active', draft: 'Draft', backtesting: 'Backtesting' },
      initial_msg: "Hello! I am your AI Strategy Assistant. Describe your investment idea, or select a saved strategy to get started."
    },
    portfolio: {
      title: 'Portfolio Overview',
      subtitle: 'Track your investments and market data in one place.',
      stats: {
        market_val: 'Market Value',
        total_gl: 'Total Gain / Loss',
        asset_alloc: 'Asset Allocation',
        total_assets: 'Total Assets'
      },
      holdings_title: 'My Holdings',
      table: {
        asset: 'Asset',
        qty: 'Quantity',
        avg_cost: 'Avg. Cost',
        current_price: 'Current Price',
        daily_change: 'Daily Change',
        total_gl: 'Total Gain/Loss',
        market_val: 'Market Value'
      }
    },
    transactions: {
      title: 'Transaction History',
      subtitle: 'View your record of all trades, deposits, and withdrawals.',
      filter: 'Filter',
      export: 'Export',
      table: {
        date: 'Date',
        type: 'Type',
        asset: 'Asset',
        qty: 'Quantity',
        price: 'Price',
        total: 'Total Amount',
        status: 'Status'
      },
      types: {
        buy: 'Buy',
        sell: 'Sell',
        deposit: 'Deposit',
        withdrawal: 'Withdrawal'
      },
      status: {
        completed: 'Completed',
        pending: 'Pending',
        failed: 'Failed'
      },
      showing: 'Showing 1 to 8 of 50 transactions'
    },
    markets: {
      title: 'Market News & Analysis',
      subtitle: 'Your daily digest of market insights and financial news.',
      filters: {
        all: 'All',
        equities: 'Equities',
        crypto: 'Crypto',
        macro: 'Macro',
        analysis: 'Analysis'
      },
      featured: 'FEATURED ANALYSIS',
      trending: 'Trending Topics',
      read_full: 'Read Full Analysis',
      read_more: 'Read More',
      view_all: 'View All News'
    },
    reports: {
      title: 'Performance Reports',
      subtitle: "Generate and customize reports on your portfolio's performance.",
      download: 'Download PDF',
      generate: 'Generate Report',
      labels: {
        timeframe: 'Timeframe',
        benchmark: 'Benchmark',
        metrics: 'Metrics to Include'
      },
      options: {
        last_30: 'Last 30 Days',
        last_12m: 'Last 12 Months',
        ytd: 'Year to Date',
        all_time: 'All Time'
      },
      metrics: {
        total_return: 'Total Return',
        sharpe: 'Sharpe Ratio',
        volatility: 'Volatility',
        alpha: 'Alpha',
        max_dd: 'Max Drawdown',
        sortino: 'Sortino Ratio',
        beta: 'Beta',
        var: 'VaR (95%)'
      },
      growth_chart: 'Portfolio Growth vs. S&P 500',
      your_portfolio: 'Your Portfolio',
      kpi_title: 'Key Performance Indicators',
      breakdown_title: 'Detailed Metrics Breakdown',
      table: {
        metric: 'Metric',
        annual_return: 'Annualized Return',
        cum_return: 'Cumulative Return',
        best_month: 'Best Month',
        worst_month: 'Worst Month'
      }
    },
    settings: {
      title: 'Account Settings',
      subtitle: 'Manage your profile, preferences, and security settings.',
      profile: {
        title: 'Profile',
        subtitle: 'Update your personal information and profile picture.',
        remove: 'Remove',
        full_name: 'Full Name',
        email: 'Email Address',
        bio: 'Bio',
        bio_placeholder: 'Tell us about yourself',
        save: 'Save Changes'
      },
      security: {
        title: 'Security',
        subtitle: 'Manage your password and two-factor authentication.',
        change_pwd: 'Change Password',
        pwd_hint: "It's a good idea to use a strong password that you're not using elsewhere.",
        current_pwd: 'Current Password',
        new_pwd: 'New Password',
        update_pwd: 'Update Password',
        two_fa: 'Two-Factor Authentication (2FA)',
        two_fa_hint: 'Add an extra layer of security to your account.',
        auth_app: 'Authenticator App',
        status_enabled: 'Status: Enabled',
        manage: 'Manage'
      },
      notifications: {
        title: 'Notifications',
        subtitle: 'Choose how you want to be notified about account activity.',
        email: 'Email Notifications',
        email_hint: 'Receive email updates for trades, deposits, and news.',
        push: 'Push Notifications',
        push_hint: 'Get real-time alerts on your mobile device.',
        price: 'Price Alerts',
        price_hint: 'Notify me when assets in my watchlist hit a certain price.'
      },
      subscription: {
        title: 'Subscription',
        subtitle: 'Manage your current plan and billing details.',
        pro_plan: 'Pro Plan',
        renews: 'Your plan renews on',
        change_plan: 'Change Plan',
        cancel: 'Cancel Subscription',
        payment: 'Payment Method',
        expires: 'Expires',
        update: 'Update'
      }
    }
  },
  fr: {
    nav: {
      dashboard: 'Tableau de bord',
      portfolio: 'Portefeuille',
      strategy: 'Stratégies',
      research: 'Recherche',
      transactions: 'Transactions',
      reports: 'Rapports',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      deposit: 'Dépôt'
    },
    dashboard: {
      title: 'Tableau de bord',
      welcome: "Bon retour, John. Voici l'aperçu de votre portefeuille.",
      stats: {
        total_val: 'Valeur du Portefeuille',
        todays_pl: "P&L du Jour",
        total_return: 'Rendement Total',
        buying_power: "Pouvoir d'Achat",
        sharpe: 'Ratio de Sharpe',
        sortino: 'Ratio de Sortino',
        var: 'VaR (95%)',
        max_dd: 'Perte Max'
      },
      perf_history: 'Historique de Performance',
      portfolio_alloc: 'Allocation du Portefeuille',
      total_assets: 'Actifs Totaux',
      watchlist: 'Liste de Surveillance',
      news_feed: "Fil d'Actualités",
      table: {
        ticker: 'Symbole',
        price: 'Prix',
        change: 'Var',
        volume: 'Volume',
        actions: 'Actions',
        buy: 'Acheter',
        sell: 'Vendre'
      },
      timeframes: {
        d1: '1J', w1: '1S', m1: '1M', y1: '1A', all: 'TOUT'
      }
    },
    strategy: {
      title: 'Créateur de Stratégie',
      tabs: { config: 'Config', chat: 'Chat IA' },
      create_new: 'Nouvelle Stratégie',
      name_label: 'Nom de la Stratégie',
      name_placeholder: 'ex: Stratégie Croissance T1',
      desc_label: 'Description / Thèse',
      desc_placeholder: "Décrivez votre thèse d'investissement, actifs cibles, tolérance au risque...",
      save_btn: 'Enregistrer',
      saved_title: 'Stratégies Sauvegardées',
      assistant_title: 'Assistant Stratégique IA',
      input_placeholder: 'Demandez un backtest...',
      status: { active: 'Actif', draft: 'Brouillon', backtesting: 'Test' },
      initial_msg: "Bonjour ! Je suis votre assistant stratégique IA. Décrivez votre idée d'investissement ou sélectionnez une stratégie sauvegardée pour commencer."
    },
    portfolio: {
      title: 'Aperçu du Portefeuille',
      subtitle: 'Suivez vos investissements et données de marché.',
      stats: {
        market_val: 'Valeur de Marché',
        total_gl: 'Gain / Perte Total',
        asset_alloc: "Allocation d'Actifs",
        total_assets: 'Actifs Totaux'
      },
      holdings_title: 'Mes Positions',
      table: {
        asset: 'Actif',
        qty: 'Quantité',
        avg_cost: 'Coût Moy.',
        current_price: 'Prix Actuel',
        daily_change: 'Var. Jour',
        total_gl: 'G/P Total',
        market_val: 'Valeur Marché'
      }
    },
    transactions: {
      title: 'Historique des Transactions',
      subtitle: 'Consultez le registre de vos opérations.',
      filter: 'Filtrer',
      export: 'Exporter',
      table: {
        date: 'Date',
        type: 'Type',
        asset: 'Actif',
        qty: 'Quantité',
        price: 'Prix',
        total: 'Montant Total',
        status: 'Statut'
      },
      types: {
        buy: 'Achat',
        sell: 'Vente',
        deposit: 'Dépôt',
        withdrawal: 'Retrait'
      },
      status: {
        completed: 'Complété',
        pending: 'En attente',
        failed: 'Échoué'
      },
      showing: 'Affichage de 1 à 8 sur 50 transactions'
    },
    markets: {
      title: 'Actualités & Analyses',
      subtitle: 'Votre résumé quotidien des marchés financiers.',
      filters: {
        all: 'Tout',
        equities: 'Actions',
        crypto: 'Crypto',
        macro: 'Macro',
        analysis: 'Analyse'
      },
      featured: 'ANALYSE EN VEDETTE',
      trending: 'Sujets Tendances',
      read_full: "Lire l'analyse complète",
      read_more: 'Lire la suite',
      view_all: 'Voir toutes les actus'
    },
    reports: {
      title: 'Rapports de Performance',
      subtitle: 'Générez et personnalisez vos rapports de portefeuille.',
      download: 'Télécharger PDF',
      generate: 'Générer Rapport',
      labels: {
        timeframe: 'Période',
        benchmark: 'Référence',
        metrics: 'Métriques à inclure'
      },
      options: {
        last_30: '30 Derniers Jours',
        last_12m: '12 Derniers Mois',
        ytd: "Depuis le début de l'année",
        all_time: 'Tout le temps'
      },
      metrics: {
        total_return: 'Rendement Total',
        sharpe: 'Ratio de Sharpe',
        volatility: 'Volatilité',
        alpha: 'Alpha',
        max_dd: 'Perte Max',
        sortino: 'Ratio de Sortino',
        beta: 'Beta',
        var: 'VaR (95%)'
      },
      growth_chart: 'Croissance Portefeuille vs S&P 500',
      your_portfolio: 'Votre Portefeuille',
      kpi_title: 'Indicateurs Clés de Performance',
      breakdown_title: 'Détail des Métriques',
      table: {
        metric: 'Métrique',
        annual_return: 'Rendement Annualisé',
        cum_return: 'Rendement Cumulé',
        best_month: 'Meilleur Mois',
        worst_month: 'Pire Mois'
      }
    },
    settings: {
      title: 'Paramètres du Compte',
      subtitle: 'Gérez votre profil, vos préférences et la sécurité.',
      profile: {
        title: 'Profil',
        subtitle: 'Mettez à jour vos informations personnelles.',
        remove: 'Supprimer',
        full_name: 'Nom Complet',
        email: 'Adresse Email',
        bio: 'Bio',
        bio_placeholder: 'Parlez-nous de vous',
        save: 'Enregistrer'
      },
      security: {
        title: 'Sécurité',
        subtitle: 'Gérez votre mot de passe et la double authentification.',
        change_pwd: 'Changer le mot de passe',
        pwd_hint: "Utilisez un mot de passe fort que vous n'utilisez pas ailleurs.",
        current_pwd: 'Mot de passe actuel',
        new_pwd: 'Nouveau mot de passe',
        update_pwd: 'Mettre à jour',
        two_fa: 'Double Authentification (2FA)',
        two_fa_hint: 'Ajoutez une couche de sécurité supplémentaire.',
        auth_app: "App d'Authentification",
        status_enabled: 'Statut : Activé',
        manage: 'Gérer'
      },
      notifications: {
        title: 'Notifications',
        subtitle: "Choisissez comment vous souhaitez être notifié.",
        email: 'Notifications Email',
        email_hint: 'Recevez des mises à jour sur les trades et actus.',
        push: 'Notifications Push',
        push_hint: 'Recevez des alertes en temps réel sur mobile.',
        price: 'Alertes de Prix',
        price_hint: "Soyez notifié quand un actif atteint un certain prix."
      },
      subscription: {
        title: 'Abonnement',
        subtitle: 'Gérez votre plan actuel et la facturation.',
        pro_plan: 'Plan Pro',
        renews: 'Renouvellement le',
        change_plan: 'Changer de Plan',
        cancel: "Annuler l'abonnement",
        payment: 'Moyen de Paiement',
        expires: 'Expire',
        update: 'Mettre à jour'
      }
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
