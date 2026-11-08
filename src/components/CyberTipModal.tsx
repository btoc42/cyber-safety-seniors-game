import React from 'react';
import { X, Volume2, VolumeX, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CyberTip } from '../types';
import { shieldImg } from '../assets';

interface CyberTipModalProps {
  tip: CyberTip | null;
  isOpen: boolean;
  onClose: () => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  highContrast: boolean;
}

export const CyberTipModal: React.FC<CyberTipModalProps> = ({
  tip,
  isOpen,
  onClose,
  onSpeak,
  isSpeaking,
  onStopSpeaking,
  highContrast
}) => {
  if (!isOpen || !tip) return null;

  const fullTextToRead = `${tip.title}. ${tip.summary}. Exemple concret : ${tip.scamStory}. Signaux d'alerte : ${tip.dangerSigns.join('. ')}. ${tip.goldenRule}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cyber-tip-title"
    >
      <div
        className="w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] border bg-[#161925] text-stone-100 border-stone-700"
      >
        {/* Header with Shield Icon & Close */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <img
                src={shieldImg}
                alt="Bouclier de sécurité"
                className="w-10 h-10 object-contain rounded-xl"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Astuce Sérénité Numérique
              </span>
              <h2
                id="cyber-tip-title"
                className="text-xl sm:text-2xl font-bold font-display text-white"
              >
                {tip.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Fermer la fenêtre d’astuce"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-5 space-y-5">
          {/* Audio Listen Button */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#1C2133] border border-stone-700">
            <span className="text-sm font-medium text-stone-300">
              Préfères-tu écouter l’explication à haute voix ?
            </span>
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) {
                  onStopSpeaking();
                } else {
                  onSpeak(fullTextToRead);
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                isSpeaking
                  ? 'bg-rose-600 text-white'
                  : 'bg-amber-600 text-white hover:bg-amber-500'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Arrêter</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Écouter</span>
                </>
              )}
            </button>
          </div>

          {/* Concrete Story */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              L’histoire concrète
            </h3>
            <p className="text-base text-stone-200 leading-relaxed font-serif-warm italic bg-[#1E2336] p-4 rounded-2xl border border-stone-700">
              « {tip.scamStory} »
            </p>
          </div>

          {/* Danger Signs */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Les signaux qui doivent vous alerter</span>
            </h3>
            <ul className="space-y-2">
              {tip.dangerSigns.map((sign, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm sm:text-base text-stone-200"
                >
                  <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Golden Rule */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#13251E] border-2 border-emerald-500/70 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm sm:text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>La Règle d’Or</span>
            </div>
            <p className="text-emerald-100 font-semibold text-base sm:text-lg leading-snug">
              {tip.goldenRule}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl shadow-sm transition-colors text-base flex items-center justify-center gap-2 cursor-pointer border border-amber-400"
          >
            <Check className="w-5 h-5" />
            <span>C’est tout compris, je continue la grille !</span>
          </button>
        </div>
      </div>
    </div>
  );
};
