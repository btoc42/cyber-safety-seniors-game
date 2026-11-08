import React from 'react';
import { X, Heart, Sparkles, Check, Edit2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { flowersImg } from '../assets';

interface BirthdayModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  onUpdateRecipientName: (name: string) => void;
  highContrast: boolean;
}

export const BirthdayModal: React.FC<BirthdayModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  onUpdateRecipientName,
  highContrast
}) => {
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [tempName, setTempName] = React.useState(recipientName);

  if (!isOpen) return null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#EC4899', '#8B5CF6', '#10B981', '#3B82F6']
    });
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateRecipientName(tempName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="birthday-card-title"
    >
      <div
        className="w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh] border text-center bg-[#161925] text-stone-100 border-stone-700"
      >
        {/* Close button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Fermer la carte"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Watercolor Flower Bouquet */}
        <div className="mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-lg border-4 border-amber-400 mb-4">
          <img
            src={flowersImg}
            alt="Bouquet de fleurs d'anniversaire"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <div className="space-y-1 mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
            Joyeux Anniversaire
          </span>
          <h2
            id="birthday-card-title"
            className="text-2xl sm:text-3xl font-extrabold font-display text-white"
          >
            Pour toi, {recipientName} !
          </h2>
        </div>

        {/* Warm Personal Letter */}
        <div className="bg-[#1C2030] p-5 sm:p-6 rounded-2xl border border-stone-700 shadow-xs text-left space-y-3 font-serif-warm text-stone-200 text-base sm:text-lg leading-relaxed">
          <p>
            « Pour ton anniversaire merveilleux, nous avons voulu t’offrir ce petit écrin de mots croisés fait sur mesure pour toi.
          </p>
          <p>
            Ici, pas de stress, pas de chronomètre, des lettres bien grandes et la voix qui te lit les indices quand tes yeux sont fatigués.
          </p>
          <p>
            Et surtout, tu y découvriras tout en douceur comment naviguer sur ta tablette l’esprit serein, en déjouant tous les petits pièges du numérique avec Paco, Minou et Plume.
          </p>
          <p className="font-bold text-amber-300 pt-2 text-right">
            Avec tout notre amour et notre tendresse infinie ❤️ »
          </p>
        </div>

        {/* Name personalization section */}
        <div className="mt-4 pt-3 border-t border-stone-700">
          {isEditingName ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-2 max-w-xs mx-auto">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="flex-1 px-3 py-2 border border-amber-400 rounded-xl text-sm font-semibold bg-[#141724] text-white"
                placeholder="Ex: Prénom"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-500 cursor-pointer"
              >
                Valider
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingName(true)}
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 font-medium cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Personnaliser le prénom affiché ({recipientName})</span>
            </button>
          )}
        </div>

        {/* Confetti & Close button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={triggerCelebration}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-rose-400"
          >
            <Sparkles className="w-4 h-4" />
            <span>Fêter mon anniversaire ! (Confettis)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-stone-200 bg-[#22273A] hover:bg-[#2C334B] border border-stone-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Commencer mes mots croisés</span>
          </button>
        </div>
      </div>
    </div>
  );
};
