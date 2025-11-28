
import React, { useState, useEffect, useRef } from 'react';
import { initializeGemini, sendMessage } from '../services/gemini';
import { GenerateContentResponse } from '@google/genai';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const StrategyBuilder = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: t.strategy.initial_msg }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mobileTab, setMobileTab] = useState<'config' | 'chat'>('chat');

  // Update initial message when language changes (only if it's the only message)
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
        setMessages([{ role: 'model', text: t.strategy.initial_msg }]);
    }
  }, [language, t.strategy.initial_msg]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mobileTab]);

  useEffect(() => {
     if (!process.env.API_KEY) {
        // API key check placeholder
     }
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!process.env.API_KEY) {
         setApiKeyMissing(true);
         setIsLoading(false);
         setMessages(prev => [...prev, { role: 'model', text: "Error: API Key is missing. Please configure your environment." }]);
         return;
      }
      
      initializeGemini(process.env.API_KEY);

      const streamResult = await sendMessage(userMsg);
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]); 

      for await (const chunk of streamResult) {
         const c = chunk as GenerateContentResponse;
         if (c.text) {
             fullResponse += c.text;
             setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1] = { role: 'model', text: fullResponse };
                return newArr;
             });
         }
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error processing your request." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-4 md:gap-6">
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <p className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{t.strategy.title}</p>
        
        {/* Mobile Tabs */}
        <div className="flex lg:hidden bg-surface-dark rounded-lg p-1 border border-border-dark">
            <button 
                onClick={() => setMobileTab('config')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${mobileTab === 'config' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
            >
                {t.strategy.tabs.config}
            </button>
            <button 
                onClick={() => setMobileTab('chat')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${mobileTab === 'chat' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
            >
                {t.strategy.tabs.chat}
            </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 min-h-0">
        {/* Left Column: Strategy Workspace */}
        <div className={`lg:col-span-2 flex-col gap-6 overflow-y-auto pr-2 ${mobileTab === 'config' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="bg-surface-dark rounded-xl border border-border-dark p-4 md:p-6">
            <h2 className="text-xl font-bold text-white mb-4">{t.strategy.create_new}</h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium leading-normal pb-2">{t.strategy.name_label}</p>
                <input className="form-input w-full rounded-lg text-white border border-border-dark bg-[#192633] focus:border-primary h-12 px-4" placeholder={t.strategy.name_placeholder} />
              </label>
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium leading-normal pb-2">{t.strategy.desc_label}</p>
                <textarea className="form-textarea w-full rounded-lg text-white border border-border-dark bg-[#192633] focus:border-primary min-h-36 p-4" placeholder={t.strategy.desc_placeholder}></textarea>
              </label>
              <button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors">
                {t.strategy.save_btn}
              </button>
            </div>
          </div>

          <div className="bg-surface-dark rounded-xl border border-border-dark p-4 md:p-6 flex-1">
            <h3 className="text-xl font-bold text-white mb-4">{t.strategy.saved_title}</h3>
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-lg bg-primary/20 cursor-pointer border-l-4 border-primary">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-primary">Momentum Algo v2</p>
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{t.strategy.status.active}</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">Last modified: 2 days ago</p>
              </div>
              <div className="p-4 rounded-lg bg-[#192633] hover:bg-[#233648] cursor-pointer transition-colors">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white">Long-Term Value Play</p>
                  <span className="text-xs font-medium text-text-secondary bg-white/10 px-2 py-1 rounded-full">{t.strategy.status.draft}</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">Last modified: 1 week ago</p>
              </div>
               <div className="p-4 rounded-lg bg-[#192633] hover:bg-[#233648] cursor-pointer transition-colors">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white">Crypto Swing Trade</p>
                  <span className="text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">{t.strategy.status.backtesting}</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">Last modified: 3 weeks ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chatbot */}
        <div className={`lg:col-span-3 bg-surface-dark rounded-xl border border-border-dark flex-col overflow-hidden ${mobileTab === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="p-4 border-b border-border-dark">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary">smart_toy</span> {t.strategy.assistant_title}
            </h2>
          </div>

          {/* Chat Window */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-4">
             {messages.map((msg, index) => (
                <div key={index} className={`flex gap-3 max-w-full md:max-w-2xl ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
                    <div className={`flex-shrink-0 size-8 rounded-full flex items-center justify-center ${msg.role === 'model' ? 'bg-primary/20 text-primary' : 'bg-gray-600 text-white'}`}>
                        <span className="material-symbols-outlined text-lg">{msg.role === 'model' ? 'auto_awesome' : 'person'}</span>
                    </div>
                    <div className={`p-3 rounded-xl ${msg.role === 'model' ? 'bg-[#192633] rounded-tl-none text-gray-200' : 'bg-primary text-white rounded-tr-none'}`}>
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    </div>
                </div>
             ))}
             {isLoading && (
                 <div className="flex gap-3 max-w-xl">
                    <div className="flex-shrink-0 size-8 bg-primary/20 text-primary rounded-full flex items-center justify-center animate-pulse">
                        <span className="material-symbols-outlined text-lg">auto_awesome</span>
                    </div>
                    <div className="bg-[#192633] p-3 rounded-xl rounded-tl-none">
                         <div className="flex gap-1">
                             <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                             <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                             <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                         </div>
                    </div>
                 </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <div className="p-4 border-t border-border-dark mt-auto bg-surface-dark">
            <div className="relative">
              <input 
                className="form-input w-full rounded-lg h-12 pr-12 bg-[#192633] border-border-dark focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm text-white placeholder:text-text-secondary" 
                placeholder={t.strategy.input_placeholder} 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-text-secondary hover:text-primary transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyBuilder;
