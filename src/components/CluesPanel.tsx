import React from 'react';
import { Volume2, VolumeX, Shield, Sparkles, Lightbulb, CheckCircle2, RotateCcw } from 'lucide-react';
import { CrosswordPuzzle, CrosswordWord, TextSize } from '../types';

interface CluesPanelProps {
  puzzle: CrosswordPuzzle;
  activeWord: CrosswordWord | null;
  onSelectWord: (word: CrosswordWord) => void;
  onSpeakClue: (text: string) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  onOpenCyberTip: (word: CrosswordWord) => void;
  onRevealLetter: () => void;
  onRevealWord: () => void;
  onVerifyGrid: () => void;
  onClearGrid: () => void;
  textSize: TextSize;
  highContrast: boolean;
  userGrid: string[][];
}

export const CluesPanel: React.FC<CluesPanelProps> = ({
  puzzle,
  activeWord,
  onSelectWord,
  onSpeakClue,
  isSpeaking,
  onStopSpeaking,
  onOpenCyberTip,
  onRevealLetter,
  onRevealWord,
  onVerifyGrid,
  onClearGrid,
  textSize,
  highContrast,
  userGrid
}) => {
  const acrossWords = React.useMemo(
    () => puzzle.words.filter((w) => w.direction === 'across').sort((a, b) => a.number - b.number),
    [puzzle]
  );

  const downWords = React.useMemo(
    () => puzzle.words.filter((w) => w.direction === 'down').sort((a, b) => a.number - b.number),
    [puzzle]
  );

  // Check if a word is completely and correctly filled
  const isWordFilled = (w: CrosswordWord) => {
    for (let i = 0; i < w.answer.length; i++) {
      const r = w.direction === 'across' ? w.startRow : w.startRow + i;
      const c = w.direction === 'across' ? w.startCol + i : w.startCol;
      const letter = userGrid[r]?.[c] || '';
      if (!letter) return false;
    }
    return true;
  };

  const isWordCorrect = (w: CrosswordWord) => {
    for (let i = 0; i < w.answer.length; i++) {
      const r = w.direction === 'across' ? w.startRow : w.startRow + i;
      const c = w.direction === 'across' ? w.startCol + i : w.startCol;
      const letter = userGrid[r]?.[c] || '';
      if (letter.toUpperCase() !== w.answer[i].toUpperCase()) return false;
    }
    return true;
  };

  // Font sizing styles
  const clueTextClass = React.useMemo(() => {
    switch (textSize) {
      case 'extralarge':
        return 'text-lg sm:text-xl';
      case 'large':
        return 'text-base sm:text-lg';
      case 'normal':
      default:
        return 'text-sm sm:text-base';
    }
  }, [textSize]);

  const activeClueTextClass = React.useMemo(() => {
    switch (textSize) {
      case 'extralarge':
        return 'text-xl sm:text-2xl';
      case 'large':
        return 'text-lg sm:text-xl';
      case 'normal':
      default:
        return 'text-base sm:text-lg';
    }
  }, [textSize]);

  return (
    <div className="space-y-4">
      {/* Active Clue Hero Callout Banner in Night Mode */}
      <div className="rounded-2xl p-4 sm:p-5 border-2 border-amber-500/50 bg-gradient-to-r from-[#171A26] via-[#202434] to-[#171A26] shadow-lg text-white transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/30 text-amber-300 border border-amber-500/50">
              {activeWord?.direction === 'across' ? '↔ Horizontal' : '↕ Vertical'} · N°{' '}
              {activeWord?.number || 1}
            </span>
            <span className="text-xs font-bold text-stone-400">
              {activeWord?.answer.length} lettres
            </span>
          </div>

          {/* Educational Cyber Badge */}
          {activeWord?.isCyber && (
            <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-md border border-amber-500/40">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Indice Sécurité Numérique</span>
            </span>
          )}
        </div>

        {/* The Clue Text */}
        <div className="py-3">
          <p className={`font-semibold leading-relaxed ${activeClueTextClass} text-white`}>
            {activeWord?.clue || 'Cliquez sur une case de la grille pour afficher l’indice.'}
          </p>
        </div>

        {/* Interactive Action Strip for Active Clue */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {/* Read Aloud Button */}
          <button
            type="button"
            onClick={() => {
              if (isSpeaking) {
                onStopSpeaking();
              } else if (activeWord) {
                onSpeakClue(
                  `Indice numéro ${activeWord.number} ${
                    activeWord.direction === 'across' ? 'horizontal' : 'vertical'
                  } : ${activeWord.clue}`
                );
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-600 text-white animate-pulse'
                : highContrast
                ? 'bg-white text-black hover:bg-stone-200'
                : 'bg-amber-600 text-white hover:bg-amber-700 shadow-xs'
            }`}
            title="Lire l’indice à haute voix pour reposer les yeux"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Arrêter la voix</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Écouter l’indice</span>
              </>
            )}
          </button>

          {/* Cyber Tip Dialog trigger */}
          {activeWord?.isCyber && (
            <button
              type="button"
              onClick={() => onOpenCyberTip(activeWord)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-amber-900 bg-amber-100/90 hover:bg-amber-200 border border-amber-300 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4 text-amber-700" />
              <span>Voir l’explication du piège</span>
            </button>
          )}

          {/* Hint: Reveal Letter */}
          <button
            type="button"
            onClick={onRevealLetter}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            title="Révéler la lettre de la case sélectionnée sans stress"
          >
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Révéler la case</span>
          </button>

          {/* Hint: Reveal Word */}
          <button
            type="button"
            onClick={onRevealWord}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            title="Révéler le mot complet"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Révéler le mot</span>
          </button>
        </div>
      </div>

      {/* Grid General Controls (Vérifier, Effacer) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 bg-[#161925] rounded-2xl border border-stone-800 text-sm shadow-md">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onVerifyGrid}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer border border-emerald-400 active:scale-95"
            title="Vérifier la validité des lettres entrées"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Vérifier mes réponses</span>
          </button>

          <button
            type="button"
            onClick={onClearGrid}
            className="flex items-center gap-2 px-3.5 py-2.5 text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 rounded-xl transition-all font-bold text-xs sm:text-sm cursor-pointer active:scale-95 shadow-xs"
            title="Effacer toutes les lettres pour recommencer cette grille à zéro"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>Effacer la grille</span>
          </button>
        </div>

        <div className="text-xs text-stone-400 font-medium">
          Astuce : cliquez sur une case pour changer de sens (↔ ou ↕).
        </div>
      </div>

      {/* Clues Columns: Horizontal & Vertical */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Horizontal Clues */}
        <div className="bg-[#131622] rounded-2xl p-4 sm:p-5 border border-stone-800 shadow-md">
          <h2 className="text-base font-extrabold text-white pb-3 mb-3 border-b border-stone-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-stone-800 text-amber-400 flex items-center justify-center text-xs font-bold">
                ↔
              </span>
              <span>Horizontalement</span>
            </span>
            <span className="text-xs font-bold text-stone-400">
              {acrossWords.length} mots
            </span>
          </h2>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {acrossWords.map((w) => {
              const isSelected = activeWord?.id === w.id;
              const isDone = isWordFilled(w) && isWordCorrect(w);

              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => onSelectWord(w)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500/25 border-2 border-amber-400 text-amber-100 font-bold shadow-md'
                      : isDone
                      ? 'bg-[#10221A] border-emerald-800/40 text-stone-400 opacity-80'
                      : 'bg-[#1B2030]/60 border-stone-850 hover:bg-[#252C42] hover:border-stone-700 text-stone-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-black ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950'
                          : isDone
                          ? 'bg-emerald-900 text-emerald-300'
                          : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {w.number}
                    </span>

                    <div className="flex-1">
                      <p className={`${clueTextClass} leading-snug`}>
                        {w.clue}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-stone-400">
                          {w.answer.length} lettres
                        </span>
                        {w.isCyber && (
                          <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                            <Shield className="w-3 h-3 text-amber-400" />
                            <span>Cyber</span>
                          </span>
                        )}
                        {isDone && (
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                            ✓ Trouvé
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical Clues */}
        <div className="bg-[#131622] rounded-2xl p-4 sm:p-5 border border-stone-800 shadow-md">
          <h2 className="text-base font-extrabold text-white pb-3 mb-3 border-b border-stone-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-stone-800 text-amber-400 flex items-center justify-center text-xs font-bold">
                ↕
              </span>
              <span>Verticalement</span>
            </span>
            <span className="text-xs font-bold text-stone-400">
              {downWords.length} mots
            </span>
          </h2>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {downWords.map((w) => {
              const isSelected = activeWord?.id === w.id;
              const isDone = isWordFilled(w) && isWordCorrect(w);

              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => onSelectWord(w)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500/25 border-2 border-amber-400 text-amber-100 font-bold shadow-md'
                      : isDone
                      ? 'bg-[#10221A] border-emerald-800/40 text-stone-400 opacity-80'
                      : 'bg-[#1B2030]/60 border-stone-850 hover:bg-[#252C42] hover:border-stone-700 text-stone-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-black ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950'
                          : isDone
                          ? 'bg-emerald-900 text-emerald-300'
                          : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {w.number}
                    </span>

                    <div className="flex-1">
                      <p className={`${clueTextClass} leading-snug`}>
                        {w.clue}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-stone-400">
                          {w.answer.length} lettres
                        </span>
                        {w.isCyber && (
                          <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                            <Shield className="w-3 h-3 text-amber-400" />
                            <span>Cyber</span>
                          </span>
                        )}
                        {isDone && (
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                            ✓ Trouvé
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
