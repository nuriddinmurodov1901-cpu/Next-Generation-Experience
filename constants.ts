
import { LinkItem, AppConfig } from './types';

export const DEFAULT_LINKS: LinkItem[] = [
  { id: '1', label: 'Rasmiy sayt', url: 'https://prgsoft.uz', icon: '🚗', order: 0 },
  { id: '2', label: 'Mobil ilova yuklash', url: 'https://emaktab.uz', icon: '📱', order: 1 },
  { id: '3', label: 'Dilerlik markazlari', url: 'https://erp.maktab.uz', icon: '📍', order: 2 },
  { id: '4', label: 'Servis xizmati', url: '#', icon: '🛠', order: 3 },
  { id: '5', label: 'Yangiliklar', url: '#', icon: '📣', order: 4 },
  { id: '6', label: 'Aloqa', url: 'tel:+998994751100', icon: '📞', order: 5 },
];

export const DEFAULT_CONFIG: AppConfig = {
  title: 'PRGSOFT',
  subtitle: 'Future of Smart Mobility',
  tagline: 'O‘zbekistondagi yetakchi innovatsion avtomobil ishlab chiqaruvchisi',
  footerText: '© PRGSOFT 2026. Barcha huquqlar himoyalangan.',
  logoUrl: 'https://picsum.photos/seed/car-logo/200/200'
};

export const AUTH_CREDENTIALS = {
  login: 'test',
  password: 'admin123'
};
