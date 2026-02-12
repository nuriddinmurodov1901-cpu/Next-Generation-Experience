
import React, { useState } from 'react';
import { LinkItem, AppConfig } from '../../types';

interface DashboardViewProps {
  links: LinkItem[];
  config: AppConfig;
  onSaveLinks: (links: LinkItem[]) => void;
  onSaveConfig: (config: AppConfig) => void;
  onLogout: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ 
  links, 
  config, 
  onSaveLinks, 
  onSaveConfig, 
  onLogout 
}) => {
  const [localLinks, setLocalLinks] = useState<LinkItem[]>([...links]);
  const [localConfig, setLocalConfig] = useState<AppConfig>({ ...config });
  const [notification, setNotification] = useState('');
  const [activeTab, setActiveTab] = useState<'links' | 'settings'>('links');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLinkUpdate = (id: string, field: keyof LinkItem, value: string) => {
    setLocalLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleSaveAll = () => {
    onSaveLinks(localLinks);
    onSaveConfig(localConfig);
    showNotification('Sozlamalar yangilandi! ✨');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Grid Pattern in Admin too */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#020617_100%)] z-[-1]"></div>
      <div className="grid-pattern"></div>

      {/* Top Header */}
      <nav className="border-b border-white/5 bg-slate-900/50 backdrop-blur-xl px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-700 flex items-center justify-center font-black">P</div>
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase">Admin Console</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Control & Command</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleSaveAll}
            className="bg-sky-500 hover:bg-sky-400 text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3 rounded-xl transition-all shadow-lg shadow-sky-500/20 active:scale-95"
          >
            Apply Changes
          </button>
          <button onClick={onLogout} className="text-slate-500 hover:text-white transition-colors p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-8 mb-10">
          {['links', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`text-xs font-bold uppercase tracking-[0.3em] pb-2 transition-all relative ${activeTab === tab ? 'text-sky-400' : 'text-slate-600 hover:text-slate-400'}`}
            >
              {tab === 'links' ? 'Gateway Links' : 'General Settings'}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 rounded-full"></div>}
            </button>
          ))}
        </div>

        {activeTab === 'links' ? (
          <div className="space-y-4">
            {localLinks.map((link) => (
              <div key={link.id} className="glass-card p-6 rounded-2xl flex items-center space-x-6 border-l-4 border-l-sky-500">
                <input 
                  type="text" 
                  value={link.icon} 
                  onChange={(e) => handleLinkUpdate(link.id, 'icon', e.target.value)}
                  className="w-14 h-14 bg-slate-900 border border-white/5 rounded-xl text-center text-2xl focus:border-sky-500 outline-none"
                />
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Link Title</label>
                    <input 
                      type="text" 
                      value={link.label} 
                      onChange={(e) => handleLinkUpdate(link.id, 'label', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 p-1 text-white focus:border-sky-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Destination</label>
                    <input 
                      type="text" 
                      value={link.url} 
                      onChange={(e) => handleLinkUpdate(link.id, 'url', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 p-1 text-sky-400 focus:border-sky-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-10 rounded-3xl space-y-10">
            <div className="flex items-center space-x-10">
              <div className="relative group">
                <img src={localConfig.logoUrl} className="w-32 h-32 rounded-3xl object-cover bg-slate-900 border border-white/10 p-1" />
                <label className="absolute inset-0 bg-black/60 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                   <span className="text-[10px] uppercase font-bold tracking-widest">Change</span>
                   <input type="file" className="hidden" onChange={(e) => {
                     const file = e.target.files?.[0];
                     if(file) {
                        const r = new FileReader();
                        r.onload = () => setLocalConfig({...localConfig, logoUrl: r.result as string});
                        r.readAsDataURL(file);
                     }
                   }} />
                </label>
              </div>
              <div className="flex-grow space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Core Brand Title</label>
                  <input 
                    type="text" 
                    value={localConfig.title} 
                    onChange={(e) => setLocalConfig({...localConfig, title: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-2xl focus:border-sky-500 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6 pt-10 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Brand Tagline</label>
                <textarea 
                  rows={2}
                  value={localConfig.tagline} 
                  onChange={(e) => setLocalConfig({...localConfig, tagline: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-2xl focus:border-sky-500 outline-none italic"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {notification && (
        <div className="fixed bottom-10 right-10 bg-sky-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-fade-in z-[100] font-bold uppercase tracking-widest text-xs">
          {notification}
        </div>
      )}
    </div>
  );
};

export default DashboardView;
