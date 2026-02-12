
import React from 'react';
import { LinkItem, AppConfig } from '../types';

interface PublicViewProps {
  links: LinkItem[];
  config: AppConfig;
  onAdminClick: () => void;
}

const PublicView: React.FC<PublicViewProps> = ({ links, config, onAdminClick }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center py-20 px-6">
      {/* Aurora Background Elements */}
      <div className="aurora-bg"></div>
      <div className="grid-pattern"></div>
      <div className="glow-sphere w-[500px] h-[500px] bg-blue-600 top-[-10%] left-[-10%]"></div>
      <div className="glow-sphere w-[400px] h-[400px] bg-purple-600 bottom-[-5%] right-[-5%] animation-delay-2000"></div>
      <div className="glow-sphere w-[300px] h-[300px] bg-cyan-400 top-[40%] right-[10%] opacity-20"></div>

      {/* Brand Navigation / Top Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 backdrop-blur-sm">
        <div className="text-xl font-black tracking-tighter text-white">
          {config.title}<span className="text-sky-400">.</span>
        </div>
        <button 
          onClick={onAdminClick}
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors"
        >
          Access Terminal
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        
        {/* Header Section */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-[10px] font-bold text-sky-400 uppercase tracking-widest">
            Future of Mobility
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Next Generation <br/>
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent italic">
              Experience
            </span>
          </h1>
          <p className="text-slate-400 text-lg font-light max-w-md mx-auto leading-relaxed">
            {config.tagline}
          </p>
        </header>

        {/* Profile / Logo Container */}
        <div className="mb-16 relative">
          <div className="absolute inset-0 bg-sky-400 blur-[60px] opacity-20 animate-pulse"></div>
          <div className="relative glass-card rounded-3xl p-4 border-white/10 group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <img 
               src={config.logoUrl} 
               alt="Logo" 
               className="w-32 h-32 rounded-2xl object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105"
             />
          </div>
        </div>

        {/* Links Grid */}
        <div className="w-full space-y-4 mb-20">
          {links.sort((a, b) => a.order - b.order).map((link, idx) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              style={{ animation: `slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s both` }}
            >
              <div className="glass-card link-hover-effect p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-slate-800/50 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 border border-white/5">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors duration-300">
                      {link.label}
                    </h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Explore Content</p>
                  </div>
                </div>
                <div className="mr-2 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="w-full text-center pb-12">
          <div className="flex justify-center space-x-6 mb-10">
            {['Telegram', 'Instagram', 'Twitter'].map(s => (
              <a key={s} href="#" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                {s}
              </a>
            ))}
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-8"></div>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-medium mb-2">
            {config.footerText}
          </p>
          <p className="text-[8px] text-slate-700 uppercase tracking-widest">
            Developed by PRGSOFT Digital Lab &copy; 2026
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default PublicView;
