import React from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { CrosswordPuzzle } from '../types';

interface PrintViewProps {
  puzzle: CrosswordPuzzle;
  recipientName: string;
  onClose: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({ puzzle, recipientName, onClose }) => {
  const cellData = React.useMemo(() => {
    const grid: Array<Array<{
      playable: boolean;
      number?: number;
    }>> = Array.from({ length: puzzle.rows }, () =>
      Array.from({ length: puzzle.cols }, () => ({
        playable: false
      }))
    );

    for (const w of puzzle.words) {
      for (let i = 0; i < w.answer.length; i++) {
        const r = w.direction === 'across' ? w.startRow : w.startRow + i;
        const c = w.direction === 'across' ? w.startCol + i : w.startCol;
        if (r < puzzle.rows && c < puzzle.cols) {
          grid[r][c].playable = true;
          if (i === 0) {
            grid[r][c].number = w.number;
          }
        }
      }
    }
    return grid;
  }, [puzzle]);

  const acrossWords = React.useMemo(
    () => puzzle.words.filter((w) => w.direction === 'across').sort((a, b) => a.number - b.number),
    [puzzle]
  );

  const downWords = React.useMemo(
    () => puzzle.words.filter((w) => w.direction === 'down').sort((a, b) => a.number - b.number),
    [puzzle]
  );

  return (
    <div className="bg-white min-h-screen p-4 sm:p-8 print-area">
      {/* Screen action bar (hidden during print) */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex items-center justify-between pb-4 border-b border-stone-200">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-stone-700 bg-stone-100 hover:bg-stone-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Fermer l’aperçu</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
        >
          <Printer className="w-5 h-5" />
          <span>Lancer l’impression papier</span>
        </button>
      </div>

      {/* Printable Sheet */}
      <div className="max-w-3xl mx-auto space-y-6 text-black">
        {/* Header */}
        <div className="text-center border-b-2 border-black pb-4 space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Les Mots Croisés de {recipientName}
          </h1>
          <p className="text-xs uppercase tracking-widest text-stone-600">
            Édition Sérénité & Numérique
          </p>
          <h2 className="text-lg font-semibold pt-1">
            {puzzle.title} ({puzzle.dateLabel})
          </h2>
        </div>

        {/* The Crossword Grid */}
        <div className="flex justify-center py-4">
          <div
            className="grid gap-[1px] bg-black border-2 border-black p-[1px]"
            style={{
              gridTemplateColumns: `repeat(${puzzle.cols}, 46px)`
            }}
          >
            {cellData.map((rowArr, r) =>
              rowArr.map((cell, c) => {
                if (!cell.playable) {
                  return <div key={`${r}-${c}`} className="w-[46px] h-[46px] bg-black" />;
                }
                return (
                  <div
                    key={`${r}-${c}`}
                    className="w-[46px] h-[46px] bg-white relative flex items-center justify-center border border-stone-200"
                  >
                    {cell.number && (
                      <span className="absolute top-0.5 left-1 text-[10px] font-bold">
                        {cell.number}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Clues */}
        <div className="grid grid-cols-2 gap-8 pt-2">
          {/* Across */}
          <div>
            <h3 className="text-sm font-bold border-b border-black pb-1 mb-2 uppercase">
              Horizontalement (↔)
            </h3>
            <ul className="space-y-2 text-xs leading-snug">
              {acrossWords.map((w) => (
                <li key={w.id}>
                  <strong>{w.number}.</strong> {w.clue} <em>({w.answer.length} let.)</em>
                </li>
              ))}
            </ul>
          </div>

          {/* Down */}
          <div>
            <h3 className="text-sm font-bold border-b border-black pb-1 mb-2 uppercase">
              Verticalement (↕)
            </h3>
            <ul className="space-y-2 text-xs leading-snug">
              {downWords.map((w) => (
                <li key={w.id}>
                  <strong>{w.number}.</strong> {w.clue} <em>({w.answer.length} let.)</em>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cyber Golden Rule box at the bottom */}
        <div className="border border-stone-400 p-4 rounded-lg mt-6 space-y-1 text-xs">
          <div className="font-bold uppercase tracking-wider">
            🛡️ Le Réflexe en Or Anti-Arnaques :
          </div>
          <p className="italic">
            « Ne donnez jamais vos codes secrets ou numéros de carte bancaire au téléphone ou par SMS. En cas de doute, prenez une pause et appelez directement vos proches ! »
          </p>
        </div>
      </div>
    </div>
  );
};
