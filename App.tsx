
import React, { useState, useEffect } from 'react';
import { ViewState, LinkItem, AppConfig } from './types';
import { DEFAULT_LINKS, DEFAULT_CONFIG } from './constants';
import PublicView from './components/PublicView';
import LoginView from './components/Admin/LoginView';
import DashboardView from './components/Admin/DashboardView';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('public');
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);

  // Initialize data from localStorage or defaults
  useEffect(() => {
    const savedLinks = localStorage.getItem('prgsoft_links');
    const savedConfig = localStorage.getItem('prgsoft_config');

    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    } else {
      setLinks(DEFAULT_LINKS);
    }

    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const saveLinks = (updatedLinks: LinkItem[]) => {
    setLinks(updatedLinks);
    localStorage.setItem('prgsoft_links', JSON.stringify(updatedLinks));
  };

  const saveConfig = (updatedConfig: AppConfig) => {
    setConfig(updatedConfig);
    localStorage.setItem('prgsoft_config', JSON.stringify(updatedConfig));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30">
      {view === 'public' && (
        <PublicView 
          links={links} 
          config={config} 
          onAdminClick={() => setView('login')} 
        />
      )}
      
      {view === 'login' && (
        <LoginView 
          onLoginSuccess={() => setView('admin')} 
          onBack={() => setView('public')} 
        />
      )}

      {view === 'admin' && (
        <DashboardView 
          links={links} 
          config={config} 
          onSaveLinks={saveLinks} 
          onSaveConfig={saveConfig} 
          onLogout={() => setView('public')} 
        />
      )}
    </div>
  );
};

export default App;
