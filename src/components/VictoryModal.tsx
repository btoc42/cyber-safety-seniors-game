import React, { useState, useEffect } from 'react';
import { Trophy, ShieldCheck, Sparkles, ArrowRight, BookOpen, RotateCcw, Music, Volume2, Heart, Eye, X } from 'lucide-react';
import { CrosswordPuzzle } from '../types';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';
import { pacoImg, minouPlumeImg } from '../assets';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzle: CrosswordPuzzle;
  recipientName: string;
  onNextPuzzle: () => void;
  onOpenCarnet: () => void;
  onReplay: () => void;
  highContrast: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  puzzle,
  recipientName,
  onNextPuzzle,
  onOpenCarnet,
  onReplay,
  highContrast
}) => {
  const [isPlayingBirthday, setIsPlayingBirthday] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Automatically trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#10B981', '#EC4899', '#6366F1', '#FBBF24']
      });

      // Play Happy Birthday tune as exclusive victory reward
      soundEffects.playHappyBirthday(true, () => {
        setIsPlayingBirthday(false);
      });
      setIsPlayingBirthday(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cyberWords = puzzle.words.filter((w) => w.isCyber);



  const handleManualBirthdaySong = () => {
    if (isPlayingBirthday) {
      setIsPlayingBirthday(false);
    } else {
      setIsPlayingBirthday(true);
      soundEffects.playHappyBirthday(true, () => {
        setIsPlayingBirthday(false);
      });
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="victory-title"
    >
      <div
        className="w-full max-w-xl rounded-3xl p-5 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh] border text-center bg-[#161925] text-stone-100 border-stone-700 relative"
      >
        {/* Close 'X' button to see the grid immediately */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#202538] hover:bg-[#2B324B] text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-stone-700 z-30"
          aria-label="Fermer pour voir la grille complétée"
          title="Fermer pour voir la grille complétée"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Floating Mascots Bar */}
        <div className="flex items-center justify-center -space-x-3 mb-3">
          <div className="relative group animate-bounce duration-1000">
            <img
              src={pacoImg}
              alt="Paco le Chihuahua"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-amber-400 shadow-lg object-cover z-20 relative"
            />
            <span className="absolute -bottom-1 -left-1 bg-amber-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full z-30">
              Paco 🐾
            </span>
          </div>

          <div className="relative group">
            <img
              src={minouPlumeImg}
              alt="Minou et Plume les deux chats"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-emerald-400 shadow-lg object-cover z-10"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full z-30">
              Minou & Plume 🐾
            </span>
          </div>
        </div>

        {/* Big Trophy Badge with celebration glow */}
        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-tr from-amber-500 to-amber-300 border-4 border-amber-400/80 shadow-lg flex items-center justify-center mb-2.5 text-amber-950 animate-pulse">
          <Trophy className="w-7 h-7 sm:w-8 h-8 text-amber-950" />
        </div>

        <div className="space-y-1 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Victoire de la Brigade !</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          </span>
          <h2
            id="victory-title"
            className="text-2xl sm:text-3xl font-extrabold font-display text-white"
          >
            Bravo {recipientName} !
          </h2>
          <p className="text-sm sm:text-base text-stone-300">
            Tu as complété la grille « {puzzle.title} » sans aucune faute !
          </p>
        </div>

        {/* Audio Rewards Control Center (Musique Joyeux Anniversaire exclusive) */}
        <div className="bg-[#1C2133] rounded-2xl p-3 sm:p-4 border border-amber-500/40 mb-4 space-y-2">
          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Music className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Récompense Musicale de la Brigade</span>
          </p>

          <button
            type="button"
            onClick={handleManualBirthdaySong}
            className={`w-full py-3 px-4 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer border shadow-md ${
              isPlayingBirthday
                ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md animate-pulse'
                : 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400/60'
            }`}
          >
            <Music className="w-5 h-5 shrink-0" />
            <span>{isPlayingBirthday ? '🎵 Musique en cours : Joyeux Anniversaire...' : '🎶 Rejouer « Joyeux Anniversaire »'}</span>
          </button>
        </div>

        {/* Full Words of the Completed Grid Showcase */}
        <div className="bg-[#191E2E] rounded-2xl p-3.5 sm:p-4 border border-amber-500/40 text-left mb-4 space-y-2.5">
          <div className="flex items-center justify-between border-b border-stone-750 pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>📖</span>
              <span>Les mots de la grille ({puzzle.words.length} mots découverts)</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-extrabold text-amber-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors bg-amber-500/15 hover:bg-amber-500/30 px-2 py-1 rounded-lg border border-amber-500/30"
              title="Fermer ce message pour admirer la grille interactive"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Voir la grille</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {puzzle.words.map((w) => (
              <div
                key={w.id}
                className="p-2 rounded-xl bg-[#131622] border border-stone-750 flex items-start gap-2 text-xs"
              >
                <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-black shrink-0 border border-amber-500/40 text-[10px]">
                  {w.direction === 'across' ? '↔' : '↕'} {w.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-amber-300 text-sm tracking-wide">
                      {w.answer}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      ({w.answer.length} let.)
                    </span>
                    {w.isCyber && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1 py-0.2 rounded border border-emerald-800">
                        Cyber
                      </span>
                    )}
                  </div>
                  <p className="text-stone-300 text-[11px] line-clamp-2 mt-0.5 leading-snug">
                    {w.clue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cyber Knowledge Summary Box */}
        {cyberWords.length > 0 && (
          <div className="bg-[#12241D] rounded-2xl p-3.5 sm:p-4 border border-emerald-600/60 text-left mb-5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Réflexes de sécurité acquis</span>
            </div>
            <ul className="space-y-1 text-xs sm:text-sm text-stone-200">
              {cyberWords.map((cw) => (
                <li key={cw.id} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>
                    <strong className="text-amber-300">{cw.answer}</strong> : {cw.cyberTip?.goldenRule || cw.clue}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl font-black text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm sm:text-base border border-amber-300"
            title="Admirer la grille complète avec toutes les lettres"
          >
            <Eye className="w-4 h-4 text-stone-950" />
            <span>Admirer ma grille</span>
          </button>

          <button
            type="button"
            onClick={onNextPuzzle}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm sm:text-base border border-emerald-400"
          >
            <span>Grille suivante</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl font-bold text-amber-200 bg-[#252C42] hover:bg-amber-600/30 border border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs active:scale-95 shadow-xs"
            title="Effacer les lettres et recommencer cette grille à zéro"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Effacer et rejouer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
