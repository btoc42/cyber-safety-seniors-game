import React from 'react';
import { ArrowLeft, Play, Shield, CheckCircle2 } from 'lucide-react';
import { CROSSWORD_PUZZLES } from '../data/puzzles';
import { CrosswordPuzzle } from '../types';

interface GridLibraryProps {
  currentPuzzleId: string;
  onSelectPuzzle: (puzzle: CrosswordPuzzle) => void;
  onBackToGame: () => void;
  completedPuzzleIds: string[];
  highContrast: boolean;
}

export const GridLibrary: React.FC<GridLibraryProps> = ({
  currentPuzzleId,
  onSelectPuzzle,
  onBackToGame,
  completedPuzzleIds,
  highContrast
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToGame}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-stone-200 bg-[#161A26] border border-stone-700 hover:bg-[#1E2334] shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Retour à la grille active</span>
        </button>

        <span className="text-xs font-semibold text-stone-400">
          {completedPuzzleIds.length} / {CROSSWORD_PUZZLES.length} grilles complétées
        </span>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
          <span>⭐ 8 Grilles 100% Croisées & Sans répétition</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
          La Collection des {CROSSWORD_PUZZLES.length} Grilles de Mots Croisés
        </h1>
        <p className="text-stone-300 text-sm sm:text-base font-serif-warm">
          Choisissez la grille de votre choix. Chaque grille propose une énigme bienveillante et des mots de passe, réflexes et indices de cybersécurité interconnectés pour Maman.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
        {CROSSWORD_PUZZLES.map((puzzle, index) => {
          const isSelected = puzzle.id === currentPuzzleId;
          const isDone = completedPuzzleIds.includes(puzzle.id);
          const cyberCount = puzzle.words.filter((w) => w.isCyber).length;

          return (
            <div
              key={puzzle.id}
              className={`rounded-3xl p-6 border transition-all shadow-md flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1D2235] border-amber-400 ring-2 ring-amber-500/50'
                  : 'bg-[#131622] border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {puzzle.dateLabel}
                  </span>
                  {isDone && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complétée</span>
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold text-base flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-display text-white leading-snug">
                      {puzzle.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1">
                      {puzzle.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 text-xs text-stone-400 font-medium">
                  <span>{puzzle.words.length} mots croisés</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <Shield className="w-3.5 h-3.5" />
                    <span>{cyberCount} indices sécurité</span>
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onSelectPuzzle(puzzle);
                    onBackToGame();
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-amber-600 text-white hover:bg-amber-500 shadow-sm'
                      : 'bg-[#202538] text-stone-200 hover:bg-[#282E45] border border-stone-700'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isSelected ? 'Continuer cette grille' : 'Jouer cette grille'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
