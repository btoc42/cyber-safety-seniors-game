import React from 'react';
import { Delete, ArrowRight, RotateCcw } from 'lucide-react';

interface VirtualKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onNextWord: () => void;
  onToggleDirection: () => void;
  direction: 'across' | 'down';
  highContrast: boolean;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  onBackspace,
  onNextWord,
  onToggleDirection,
  direction,
  highContrast
}) => {
  // AZERTY layout commonly used by French seniors
  const rows = [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
    ['W', 'X', 'C', 'V', 'B', 'N']
  ];

  const buttonBaseClass =
    'bg-[#22273A] text-white border border-stone-700/80 hover:border-amber-400 hover:bg-[#2F3650] active:bg-amber-500/30 font-black shadow-md';

  return (
    <div
      className="rounded-2xl p-3 sm:p-4 max-w-2xl mx-auto shadow-xl border bg-[#131622] border-stone-800"
      aria-label="Clavier virtuel adapté"
    >
      <div className="flex flex-col gap-2">
        {/* Row 1 */}
        <div className="flex justify-center gap-1 sm:gap-1.5">
          {rows[0].map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => onKeyPress(letter)}
              className={`h-11 sm:h-13 w-8 sm:w-11 rounded-lg text-lg sm:text-xl flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${buttonBaseClass}`}
              aria-label={`Lettre ${letter}`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex justify-center gap-1 sm:gap-1.5">
          {rows[1].map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => onKeyPress(letter)}
              className={`h-11 sm:h-13 w-8 sm:w-11 rounded-lg text-lg sm:text-xl flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${buttonBaseClass}`}
              aria-label={`Lettre ${letter}`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Row 3 with special action keys */}
        <div className="flex justify-center gap-1 sm:gap-1.5">
          {/* Toggle direction */}
          <button
            type="button"
            onClick={onToggleDirection}
            className="h-11 sm:h-13 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer transition-transform active:scale-95 bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700"
            title="Changer le sens de frappe (Horizontal / Vertical)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{direction === 'across' ? 'Horizontal' : 'Vertical'}</span>
          </button>

          {rows[2].map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => onKeyPress(letter)}
              className={`h-11 sm:h-13 w-8 sm:w-11 rounded-lg text-lg sm:text-xl flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${buttonBaseClass}`}
              aria-label={`Lettre ${letter}`}
            >
              {letter}
            </button>
          ))}

          {/* Backspace */}
          <button
            type="button"
            onClick={onBackspace}
            className="h-11 sm:h-13 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-black flex items-center gap-1 cursor-pointer transition-transform active:scale-95 bg-rose-950/80 text-rose-300 hover:bg-rose-900 border border-rose-700 shadow-xs"
            title="Effacer la lettre"
            aria-label="Effacer"
          >
            <Delete className="w-4 h-4" />
            <span className="hidden sm:inline">Effacer</span>
          </button>

          {/* Next Word */}
          <button
            type="button"
            onClick={onNextWord}
            className="h-11 sm:h-13 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-black flex items-center gap-1 cursor-pointer transition-transform active:scale-95 bg-amber-600 hover:bg-amber-500 text-white shadow-md border border-amber-500"
            title="Passer au mot suivant"
            aria-label="Mot suivant"
          >
            <span className="hidden sm:inline">Suivant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
