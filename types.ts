
export interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: string;
  order: number;
}

export interface AppConfig {
  title: string;
  subtitle: string;
  tagline: string;
  footerText: string;
  logoUrl: string;
}

export type ViewState = 'public' | 'login' | 'admin';
