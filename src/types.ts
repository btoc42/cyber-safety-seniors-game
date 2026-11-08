export interface CyberTip {
  id: string;
  title: string;
  category: 'phishing_sms' | 'faux_banquier' | 'faux_proche' | 'mots_de_passe' | 'faux_achats' | 'ecran_bloque' | 'faux_impots' | 'general' | 'faux_colis' | 'conseils_generaux';
  summary: string;
  scamStory: string; // The concrete real-life example
  dangerSigns: string[]; // Easy to spot warning signs
  goldenRule: string; // The simple rule of thumb
}

export interface CrosswordWord {
  id: string;
  number: number;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
  answer: string;
  clue: string;
  isCyber: boolean;
  cyberTip?: CyberTip;
}

export interface GridCell {
  row: number;
  col: number;
  solution: string;
  number?: number;
  acrossWordId?: string;
  downWordId?: string;
}

export interface CrosswordPuzzle {
  id: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  rows: number;
  cols: number;
  words: CrosswordWord[];
  theme: string;
  introMessage: string;
  specialBirthdayNote?: string;
}

export type TextSize = 'normal' | 'large' | 'extralarge';

export interface UserPreferences {
  recipientName: string;
  textSize: TextSize;
  highContrast: boolean;
  soundEnabled: boolean;
  voiceSpeed: number; // 0.85
  showVirtualKeyboard: boolean;
}
