
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Settings = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">{t.settings.title}</h1>
        <p className="text-text-secondary text-base font-normal leading-normal">{t.settings.subtitle}</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-white mb-1">{t.settings.profile.title}</h2>
        <p className="text-text-secondary text-sm mb-6">{t.settings.profile.subtitle}</p>
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
            <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAS13_k3-oNctHPtXF7tdffeAM6MvgXtIAGG1zsuWGFutOC9F2FrMZU5NYzNm0hqeh7p0F976jMppVVrVS0BLrODmyRlYuGaASiR2PUFZ7Pog9dkmKDkLtIQcr8wAWUzxRYJAj0-iZyr63SQdbcbzWO5QpZ4mcIUHFYbefsA3P3S7JoRcGzF8dCaxi-P3mnVnOYL8TYuQyKmpSQBU-1IKgWATRYKELhxN9iYy8K0FuoVEP7dyjlr78zi6Z6nGGkkmmyxmbzz9i_Di3A")'}}></div>
                        <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full size-8 flex items-center justify-center hover:bg-primary/80 transition-colors">
                            <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                    </div>
                    <button className="text-sm text-text-secondary hover:text-white transition-colors">{t.settings.profile.remove}</button>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    <div>
                        <label className="text-text-secondary text-sm font-medium">{t.settings.profile.full_name}</label>
                        <input className="mt-1 w-full rounded-lg text-white bg-[#233648] border border-border-dark focus:ring-primary focus:border-primary px-4 py-2" defaultValue="John Doe" />
                    </div>
                    <div>
                        <label className="text-text-secondary text-sm font-medium">{t.settings.profile.email}</label>
                        <input className="mt-1 w-full rounded-lg text-white bg-[#233648] border border-border-dark focus:ring-primary focus:border-primary px-4 py-2" defaultValue="john.doe@email.com" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-text-secondary text-sm font-medium">{t.settings.profile.bio}</label>
                        <textarea className="mt-1 w-full rounded-lg text-white bg-[#233648] border border-border-dark focus:ring-primary focus:border-primary px-4 py-2" placeholder={t.settings.profile.bio_placeholder} rows={3}></textarea>
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-6 border-t border-border-dark mt-6">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 h-10 transition-colors">{t.settings.profile.save}</button>
            </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-1">{t.settings.security.title}</h2>
        <p className="text-text-secondary text-sm mb-6">{t.settings.security.subtitle}</p>
        <div className="rounded-xl border border-border-dark bg-surface-dark">
            <div className="p-6">
                <h3 className="font-semibold text-white mb-1">{t.settings.security.change_pwd}</h3>
                <p className="text-sm text-text-secondary mb-4">{t.settings.security.pwd_hint}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="text-text-secondary text-sm font-medium">{t.settings.security.current_pwd}</label>
                        <input className="mt-1 w-full rounded-lg text-white bg-[#233648] border border-border-dark focus:ring-primary focus:border-primary px-4 py-2" type="password" />
                    </div>
                    <div>
                        <label className="text-text-secondary text-sm font-medium">{t.settings.security.new_pwd}</label>
                        <input className="mt-1 w-full rounded-lg text-white bg-[#233648] border border-border-dark focus:ring-primary focus:border-primary px-4 py-2" type="password" />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center p-6 border-t border-border-dark mt-0">
                 <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 h-10 transition-colors">{t.settings.security.update_pwd}</button>
            </div>
            <div className="p-6 border-t border-border-dark">
                <h3 className="font-semibold text-white mb-1">{t.settings.security.two_fa}</h3>
                <p className="text-sm text-text-secondary mb-4">{t.settings.security.two_fa_hint}</p>
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#233648]/60">
                    <div>
                        <p className="text-white font-medium">{t.settings.security.auth_app}</p>
                        <p className="text-sm text-text-secondary">{t.settings.security.status_enabled}</p>
                    </div>
                    <button className="text-sm font-semibold py-2 px-4 rounded-lg bg-[#324d67] text-white hover:bg-[#456381] transition-colors">{t.settings.security.manage}</button>
                </div>
            </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-1">{t.settings.notifications.title}</h2>
        <p className="text-text-secondary text-sm mb-6">{t.settings.notifications.subtitle}</p>
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 space-y-5">
            {[
                { l: t.settings.notifications.email, d: t.settings.notifications.email_hint, c: true },
                { l: t.settings.notifications.push, d: t.settings.notifications.push_hint, c: false },
                { l: t.settings.notifications.price, d: t.settings.notifications.price_hint, c: true }
            ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                    <div>
                        <h4 className="text-white font-medium">{item.l}</h4>
                        <p className="text-text-secondary text-sm">{item.d}</p>
                    </div>
                    <div className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${item.c ? 'bg-primary' : 'bg-[#324d67]'}`}>
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.c ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-1">{t.settings.subscription.title}</h2>
        <p className="text-text-secondary text-sm mb-6">{t.settings.subscription.subtitle}</p>
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <h3 className="text-lg font-bold text-white">{t.settings.subscription.pro_plan}</h3>
                    <p className="text-text-secondary">{t.settings.subscription.renews} <span className="text-white">December 21, 2024.</span></p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-sm font-semibold py-2 px-4 rounded-lg bg-[#324d67] text-white hover:bg-[#456381] transition-colors">{t.settings.subscription.change_plan}</button>
                    <button className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors">{t.settings.subscription.cancel}</button>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border-dark">
                <h3 className="font-semibold text-white mb-4">{t.settings.subscription.payment}</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#233648]/60">
                    <div className="flex items-center gap-4">
                        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path>
                        </svg>
                        <div>
                            <p className="text-white font-medium">Visa ending in 1234</p>
                            <p className="text-sm text-text-secondary">{t.settings.subscription.expires} 12/2025</p>
                        </div>
                    </div>
                    <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">{t.settings.subscription.update}</button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
