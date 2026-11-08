import React from 'react';
import { Download, Sparkles, BookOpen, Printer, Volume2, VolumeX, Eye, ShieldCheck, Heart, ZoomIn } from 'lucide-react';
import { TextSize } from '../types';
import { pacoImg } from '../assets';

export type ActiveTab = 'hunt' | 'crossword' | 'quiz' | 'fridge' | 'library' | 'carnet' | 'birthday';

interface HeaderProps {
  currentTab: ActiveTab;
  setCurrentTab: (tab: ActiveTab) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenBirthday: () => void;
  onPrint: () => void;
  recipientName: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  textSize,
  setTextSize,
  highContrast,
  setHighContrast,
  soundEnabled,
  setSoundEnabled,
  onOpenBirthday,
  onPrint,
  recipientName
}) => {
  return (
    <header className="border-b border-stone-800 bg-[#10121A]/95 backdrop-blur-md sticky top-0 z-40 shadow-lg no-print">
      {/* Top Bar: Brand zone - Nav Links - Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title & Mascots */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setCurrentTab('hunt')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-hidden cursor-pointer"
          >
            <div className="relative">
              <img
                src={pacoImg}
                alt="Paco le petit Chihuahua"
                className="w-11 h-11 rounded-xl object-cover border-2 border-amber-500/70 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 text-xs">🐾</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white block font-display leading-tight">
                La Brigade Anti-Arnaques de {recipientName}
              </span>
              <span className="text-xs text-amber-400 font-bold block">
                Avec Paco le chihuahua, Minou & Plume les chats !
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-3 text-sm font-bold text-stone-300">
          <button
            type="button"
            onClick={() => setCurrentTab('hunt')}
            className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'hunt'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'hover:bg-stone-800/70 hover:text-white text-stone-300 border border-transparent'
            }`}
          >
            <span>🐕</span>
            <span>1. Le flair de Paco (Pièges)</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab('crossword')}
            className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'crossword'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'hover:bg-stone-800/70 hover:text-white text-stone-300 border border-transparent'
            }`}
          >
            <span>🧩</span>
            <span>2. Mots Croisés de Minou</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab('quiz')}
            className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'quiz'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'hover:bg-stone-800/70 hover:text-white text-stone-300 border border-transparent'
            }`}
            title="Le Grand Quiz de Sérénité Numérique : Déjouer les Pièges du Quotidien"
          >
            <span>🛡️</span>
            <span>3. Grand Quiz Sérénité</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab('fridge')}
            className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'fridge'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'hover:bg-stone-800/70 hover:text-white text-stone-300 border border-transparent'
            }`}
          >
            <span>📑</span>
            <span>4. Le Mémo du Frigo</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab('carnet')}
            className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'carnet'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 shadow-xs'
                : 'hover:bg-stone-800/70 hover:text-white text-stone-300 border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Guide Pratique</span>
          </button>
        </nav>

        {/* Zone 3: Senior Ergonomics & Loupe Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Text Size / Loupe Stepper */}
          <div className="flex items-center rounded-xl border border-stone-800 bg-[#161924] p-1 text-xs shadow-inner">
            <span className="px-2 font-black text-amber-400 flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Loupe</span>
            </span>
            <button
              type="button"
              onClick={() => setTextSize('normal')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                textSize === 'normal'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-xs ring-1 ring-amber-300'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Taille normale (100%)"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setTextSize('large')}
              className={`px-2.5 py-1 rounded-lg font-extrabold text-sm transition-all cursor-pointer ${
                textSize === 'large'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-xs ring-2 ring-amber-300'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Grand texte (A+)"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setTextSize('extralarge')}
              className={`px-2.5 py-1 rounded-lg font-black text-base transition-all cursor-pointer ${
                textSize === 'extralarge'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-xs ring-2 ring-amber-300'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Très grand texte (A++)"
            >
              A++
            </button>
          </div>

          {/* Night Mode Fixed Badge (App is exclusively night mode) */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-500/30 bg-[#161924] text-xs font-extrabold text-amber-300 shadow-xs"
            title="Application configurée exclusivement en Mode Nuit pour reposer la vue"
          >
            <span>🌙</span>
            <span className="hidden sm:inline">Mode Nuit</span>
          </div>

          {/* Sound Toggle (Barks, Purrs, Chimes) */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-[#161924] text-stone-500 border-stone-800 hover:bg-stone-800'
            }`}
            title={soundEnabled ? 'Sons des animaux activés' : 'Sons coupés'}
            aria-label="Activer ou couper les sons"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>

          {/* Standalone HTML File Download */}
          <a
            href="/la-brigade-anti-arnaques.html"
            download="la-brigade-anti-arnaques.html"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-300 bg-[#161924] hover:bg-stone-800 rounded-xl border border-stone-800 transition-colors"
            title="Télécharger le fichier HTML autonome pour tablette ou GitHub Pages"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Fichier .html</span>
          </a>
        </div>
      </div>

      {/* Mobile/Tablet Sub-Navigation Tabs */}
      <div className="xl:hidden border-t border-stone-800 px-2 py-1.5 flex items-center justify-around text-xs sm:text-sm font-bold text-stone-300 bg-[#0B0D14] overflow-x-auto">
        <button
          type="button"
          onClick={() => setCurrentTab('hunt')}
          className={`py-1.5 px-2.5 rounded-lg flex items-center gap-1 whitespace-nowrap ${
            currentTab === 'hunt' ? 'bg-amber-500/25 text-amber-300 font-black border border-amber-500/40' : ''
          }`}
        >
          <span>🐕</span>
          <span>1. Pièges</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('crossword')}
          className={`py-1.5 px-2.5 rounded-lg flex items-center gap-1 whitespace-nowrap ${
            currentTab === 'crossword' ? 'bg-amber-500/25 text-amber-300 font-black border border-amber-500/40' : ''
          }`}
        >
          <span>🧩</span>
          <span>2. Mots Croisés</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('quiz')}
          className={`py-1.5 px-2.5 rounded-lg flex items-center gap-1 whitespace-nowrap ${
            currentTab === 'quiz' ? 'bg-amber-500/25 text-amber-300 font-black border border-amber-500/40' : ''
          }`}
        >
          <span>🛡️</span>
          <span>3. Quiz</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('fridge')}
          className={`py-1.5 px-2.5 rounded-lg flex items-center gap-1 whitespace-nowrap ${
            currentTab === 'fridge' ? 'bg-amber-500/25 text-amber-300 font-black border border-amber-500/40' : ''
          }`}
        >
          <span>📑</span>
          <span>4. Frigo</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('carnet')}
          className={`py-1.5 px-2.5 rounded-lg flex items-center gap-1 whitespace-nowrap ${
            currentTab === 'carnet' ? 'bg-emerald-950/70 text-emerald-300 font-black border border-emerald-500/40' : ''
          }`}
        >
          <span>📚</span>
          <span>Guide</span>
        </button>

        <button
          type="button"
          onClick={onOpenBirthday}
          className="py-1.5 px-2.5 rounded-lg text-rose-400 font-extrabold flex items-center gap-1 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fête</span>
        </button>
      </div>
    </header>
  );
};
