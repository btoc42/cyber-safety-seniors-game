import React from 'react';
import { CrosswordPuzzle, CrosswordWord, TextSize } from '../types';

interface CrosswordGridProps {
  puzzle: CrosswordPuzzle;
  userGrid: string[][];
  selectedCell: { row: number; col: number } | null;
  direction: 'across' | 'down';
  onCellClick: (row: number, col: number) => void;
  verifiedState: 'idle' | 'checked';
  textSize: TextSize;
  highContrast: boolean;
  activeWord: CrosswordWord | null;
  onLetterInput?: (letter: string) => void;
  onBackspace?: () => void;
}

export const CrosswordGrid: React.FC<CrosswordGridProps> = ({
  puzzle,
  userGrid,
  selectedCell,
  direction,
  onCellClick,
  verifiedState,
  textSize,
  highContrast,
  activeWord,
  onLetterInput,
  onBackspace
}) => {
  // Precompute grid structure: which cells are playable, their solution, and their starting numbers
  const cellData = React.useMemo(() => {
    const grid: Array<Array<{
      playable: boolean;
      solution: string;
      number?: number;
      words: CrosswordWord[];
    }>> = Array.from({ length: puzzle.rows }, () =>
      Array.from({ length: puzzle.cols }, () => ({
        playable: false,
        solution: '',
        words: []
      }))
    );

    // Populate words
    for (const w of puzzle.words) {
      for (let i = 0; i < w.answer.length; i++) {
        const r = w.direction === 'across' ? w.startRow : w.startRow + i;
        const c = w.direction === 'across' ? w.startCol + i : w.startCol;
        if (r < puzzle.rows && c < puzzle.cols) {
          grid[r][c].playable = true;
          grid[r][c].solution = w.answer[i];
          grid[r][c].words.push(w);
          if (i === 0) {
            grid[r][c].number = w.number;
          }
        }
      }
    }

    return grid;
  }, [puzzle]);

  // Determine cell sizing based on textSize preset (fully responsive from mobile 320px to 4K displays)
  const cellSizeClass = React.useMemo(() => {
    switch (textSize) {
      case 'extralarge':
        return 'w-9 h-9 sm:w-13 sm:h-13 md:w-16 md:h-16 text-lg sm:text-2xl md:text-3xl';
      case 'large':
        return 'w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 text-base sm:text-xl md:text-2xl';
      case 'normal':
      default:
        return 'w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 text-sm sm:text-lg md:text-xl';
    }
  }, [textSize]);

  // Is a given cell part of the active word?
  const isCellInActiveWord = (r: number, c: number) => {
    if (!activeWord) return false;
    if (activeWord.direction === 'across') {
      return (
        r === activeWord.startRow &&
        c >= activeWord.startCol &&
        c < activeWord.startCol + activeWord.answer.length
      );
    } else {
      return (
        c === activeWord.startCol &&
        r >= activeWord.startRow &&
        r < activeWord.startRow + activeWord.answer.length
      );
    }
  };

  return (
    <div className="flex justify-center select-none overflow-x-auto p-2">
      <div
        className="inline-block rounded-2xl p-2.5 sm:p-4 shadow-xl border bg-[#10131E] border-stone-800 text-white"
        role="grid"
        aria-label={`Grille de mots croisés : ${puzzle.title}`}
      >
        <div
          className="grid gap-[2px] sm:gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${puzzle.cols}, minmax(0, 1fr))`
          }}
        >
          {cellData.map((rowArr, r) =>
            rowArr.map((cell, c) => {
              if (!cell.playable) {
                // Blocked black cell
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`${cellSizeClass} rounded-sm sm:rounded-md transition-colors bg-[#08090E] border border-stone-900/80`}
                    aria-hidden="true"
                  />
                );
              }

              const isSelected = selectedCell?.row === r && selectedCell?.col === c;
              const inActiveWord = isCellInActiveWord(r, c);
              const userLetter = userGrid[r]?.[c] || '';
              const isCorrect = userLetter.toUpperCase() === cell.solution.toUpperCase();
              const hasLetter = userLetter.length > 0;

              // Styles according to state in deep soothing Night Mode
              let bgClass = 'bg-[#1C2030]';
              let borderClass = 'border border-stone-700/80';
              let textClass = 'text-white font-extrabold';

              if (inActiveWord) {
                bgClass = 'bg-[#272E46]';
                borderClass = 'border-2 border-amber-500/70';
                textClass = 'text-amber-200 font-black';
              }

              if (isSelected) {
                bgClass = 'bg-amber-500/35';
                borderClass = 'border-2 border-amber-300 ring-4 ring-amber-500/40 z-10';
                textClass = 'text-amber-100 font-black';
              }

              // Verification highlights
              if (verifiedState === 'checked' && hasLetter) {
                if (isCorrect) {
                  bgClass = 'bg-emerald-950/90';
                  borderClass = 'border-2 border-emerald-400';
                  textClass = 'text-emerald-300 font-black';
                } else {
                  bgClass = 'bg-rose-950/90';
                  borderClass = 'border-2 border-rose-400';
                  textClass = 'text-rose-300 font-black';
                }
              }

              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => onCellClick(r, c)}
                  className={`relative ${cellSizeClass} rounded-sm sm:rounded-md flex items-center justify-center transition-all duration-100 cursor-pointer shadow-xs ${bgClass} ${borderClass} ${textClass} focus:outline-hidden`}
                  aria-label={`Ligne ${r + 1}, Colonne ${c + 1}${
                    cell.number ? `, Numéro ${cell.number}` : ''
                  }${userLetter ? `, Lettre ${userLetter}` : ', Case vide'}`}
                  aria-selected={isSelected}
                >
                  {/* Small number in top left corner */}
                  {cell.number && (
                    <span
                      className="absolute top-0.5 left-1 text-[10px] sm:text-xs font-bold leading-none pointer-events-none text-stone-400"
                    >
                      {cell.number}
                    </span>
                  )}

                  {/* Letter - dynamically sized according to Loupe Zoom */}
                  <span
                    className={`font-display tracking-wide uppercase select-none ${
                      textSize === 'extralarge'
                        ? 'text-2xl sm:text-3xl md:text-4xl font-black text-amber-200'
                        : textSize === 'large'
                        ? 'text-xl sm:text-2xl md:text-3xl font-extrabold text-white'
                        : 'text-base sm:text-lg md:text-xl font-bold text-white'
                    }`}
                  >
                    {userLetter}
                  </span>

                  {/* Gentle directional cursor indicator */}
                  {isSelected && (
                    <span
                      className="absolute bottom-0.5 right-1 text-[9px] sm:text-[10px] font-bold text-amber-400 pointer-events-none"
                      title={direction === 'across' ? 'Horizontal' : 'Vertical'}
                    >
                      {direction === 'across' ? '➔' : '⬇'}
                    </span>
                  )}

                  {/* Hidden accessible input for mobile keyboards and direct typing */}
                  {isSelected && (
                    <input
                      type="text"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="characters"
                      spellCheck={false}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer pointer-events-auto"
                      value=""
                      inputMode="text"
                      autoFocus
                      aria-label="Saisir une lettre pour cette case"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && onLetterInput) {
                          onLetterInput(val.slice(-1));
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' || e.key === 'Delete') {
                          e.preventDefault();
                          onBackspace?.();
                        }
                      }}
                    />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
