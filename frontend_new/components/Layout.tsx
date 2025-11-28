
import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NavItem = ({ to, icon, label, filled = false, onClick }: { to: string; icon: string; label: string; filled?: boolean; onClick?: () => void }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive ? 'bg-[#233648] text-white' : 'hover:bg-[#233648]/60 text-white/70 hover:text-white'
        }`
      }
    >
      <span className={`material-symbols-outlined ${filled ? 'filled' : ''}`}>{icon}</span>
      <p className="text-sm font-medium leading-normal">{label}</p>
    </NavLink>
  );
};

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar (Desktop & Mobile) */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex flex-col justify-between bg-surface-dark p-4 border-r border-border-dark transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:h-screen
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-white p-2">
            <div className="flex items-center gap-4">
              <div className="size-6 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
                  <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">HedgeFund</h2>
            </div>
            {/* Close button for mobile */}
            <button onClick={closeMobileMenu} className="md:hidden text-white/70 hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <NavItem to="/" icon="dashboard" label={t.nav.dashboard} onClick={closeMobileMenu} />
            <NavItem to="/portfolio" icon="work" label={t.nav.portfolio} onClick={closeMobileMenu} />
            <NavItem to="/strategy" icon="insights" label={t.nav.strategy} onClick={closeMobileMenu} />
            <NavItem to="/research" icon="article" label={t.nav.research} onClick={closeMobileMenu} />
            <NavItem to="/transactions" icon="history" label={t.nav.transactions} onClick={closeMobileMenu} />
            <NavItem to="/reports" icon="assessment" label={t.nav.reports} onClick={closeMobileMenu} />
            <NavItem to="/settings" icon="settings" label={t.nav.settings} onClick={closeMobileMenu} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center border-t border-solid border-t-[#233648] pt-4">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 flex-shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAS13_k3-oNctHPtXF7tdffeAM6MvgXtIAGG1zsuWGFutOC9F2FrMZU5NYzNm0hqeh7p0F976jMppVVrVS0BLrODmyRlYuGaASiR2PUFZ7Pog9dkmKDkLtIQcr8wAWUzxRYJAj0-iZyr63SQdbcbzWO5QpZ4mcIUHFYbefsA3P3S7JoRcGzF8dCaxi-P3mnVnOYL8TYuQyKmpSQBU-1IKgWATRYKELhxN9iYy8K0FuoVEP7dyjlr78zi6Z6nGGkkmmyxmbzz9i_Di3A")'}}></div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-white text-base font-medium leading-normal truncate">John Doe</h1>
              <p className="text-text-secondary text-sm font-normal leading-normal truncate">john.doe@email.com</p>
            </div>
          </div>
          <a className="flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white cursor-pointer" onClick={() => console.log('logout')}>
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium leading-normal">{t.nav.logout}</p>
          </a>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen bg-background-light dark:bg-background-dark">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark px-4 md:px-6 py-3 sticky top-0 bg-background-dark/80 backdrop-blur-sm z-30">
           <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Toggle */}
            <button onClick={toggleMobileMenu} className="md:hidden text-white hover:text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
            
            {/* Search */}
            <label className="flex flex-col min-w-40 !h-10 max-w-64 w-full md:w-auto">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-text-secondary flex border-none bg-[#233648] items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#233648] focus:border-none h-full placeholder:text-text-secondary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search..." />
              </div>
            </label>
           </div>
           
           <div className="flex items-center gap-3 md:gap-4 pl-2">
            
            {/* Language Switcher */}
            <div className="flex items-center bg-[#233648] rounded-lg p-1">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-md text-xs font-bold transition-colors ${language === 'en' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 rounded-md text-xs font-bold transition-colors ${language === 'fr' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
              >
                FR
              </button>
            </div>

            <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-[#233648] text-white hover:bg-[#324d67] transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <button className="bg-primary hover:bg-primary/90 transition-colors text-white font-bold py-2 px-3 md:px-4 rounded-lg flex items-center gap-2 h-10">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="hidden sm:inline">{t.nav.deposit}</span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 md:hidden flex-shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7CPHaK5BtLaD8VkZCDtMyaD1Yontmgy8h1ChVUzX4ZdTtNlKxN3MvhO2H3SGNkoONx768O11WeLaAlWrIVveMB5U4gJN2pP0mLDvj5Y8aLBoz0AwgUb2FKTh4KruVHhu24vXM43yJD9to3KIPE_mcfMlhYs3vCiF0iMCjwtHBoDjKoHr98O3otWkb77CITAi3nTP-iUTiIhXqPv82ciCjnj9cStCFjcUWSj6j9WQsoyJdsG2DU9pk-zQLRLc-gAyIgQu0NTut5CuY")'}}></div>
          </div>
        </header>

        <div className="p-4 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
