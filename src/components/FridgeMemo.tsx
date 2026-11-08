import React, { useState } from 'react';
import { Printer, Phone, Check, Edit2, Volume2, VolumeX, Key, Shield, AlertTriangle } from 'lucide-react';
import { soundEffects, speakFrenchClue, stopSpeaking } from '../utils/audio';
import { pacoImg, minouPlumeImg } from '../assets';
import { CYBER_GLOSSARY_ITEMS } from '../data/cyberGlossary';

interface FridgeMemoProps {
  onBackToGame?: () => void;
  highContrast: boolean;
}

export const FridgeMemo: React.FC<FridgeMemoProps> = ({ highContrast }) => {
  const [familyNumber, setFamilyNumber] = useState<string>(() => {
    return localStorage.getItem('mamie_fridge_family_phone') || '';
  });
  const [bankNumber, setBankNumber] = useState<string>(() => {
    return localStorage.getItem('mamie_fridge_bank_phone') || '';
  });
  const [isEditingPhones, setIsEditingPhones] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSavePhones = () => {
    localStorage.setItem('mamie_fridge_family_phone', familyNumber);
    localStorage.setItem('mamie_fridge_bank_phone', bankNumber);
    setIsEditingPhones(false);
    soundEffects.playSuccess(true);
  };

  const handlePrint = () => {
    soundEffects.playTap(true);
    window.print();
  };

  const handleSpeakMemo = () => {
    setIsSpeaking(true);
    const speech = `Voici le Mémo du Frigo de la Brigade Anti-Arnaques. Règle numéro 1 : Ne jamais cliquer sur un lien reçu par SMS ou e-mail imprévu. Règle numéro 2 : La banque ne demande JAMAIS de mot de passe ou de code SMS au téléphone. Règle numéro 3 : En cas de doute, j'appelle directement mon enfant sur son numéro habituel avant de faire quoi que ce soit.`;
    speakFrenchClue(speech, 0.85);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const interval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsSpeaking(false);
          clearInterval(interval);
        }
      }, 300);
    }
  };

  const handleStopSpeech = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#131622] rounded-3xl p-5 sm:p-6 border border-stone-800 shadow-sm print:hidden">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-full">
            Espace Pratique
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Le Mémo du Frigo & Lexique de la Brigade
          </h2>
          <p className="text-base text-stone-300 font-serif-warm">
            À imprimer et coller sur le réfrigérateur avec un aimant pour l'avoir sous les yeux !
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => (isSpeaking ? handleStopSpeech() : handleSpeakMemo())}
            className="flex items-center gap-2 px-4 py-3 bg-[#1C2030] hover:bg-[#252B40] text-stone-200 border border-stone-700 rounded-2xl font-bold text-sm cursor-pointer transition-colors"
          >
            {isSpeaking ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
            <span>{isSpeaking ? 'Arrêter la voix' : 'Écouter le Mémo'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-amber-600 hover:bg-amber-500 active:scale-98 text-white rounded-2xl font-extrabold text-base sm:text-lg shadow-md cursor-pointer transition-all border border-amber-400/50"
          >
            <Printer className="w-5 h-5" />
            <span>🖨️ Imprimer pour mon frigo</span>
          </button>
        </div>
      </div>

      {/* The Fridge Memo Printable Sheet */}
      <div className="bg-[#141724] print:bg-white text-stone-100 print:text-black rounded-3xl p-6 sm:p-10 border-4 border-amber-500/50 print:border-none shadow-xl relative overflow-hidden print:p-0 print:shadow-none print:m-0">
        {/* Decorative Fridge Magnets on corners */}
        <div className="absolute top-4 left-6 w-7 h-7 rounded-full bg-rose-500 shadow-md border-2 border-stone-800 print:hidden flex items-center justify-center text-[10px] text-white font-bold">
          ❤️
        </div>
        <div className="absolute top-4 right-6 w-7 h-7 rounded-full bg-amber-500 shadow-md border-2 border-stone-800 print:hidden flex items-center justify-center text-[10px] text-white font-bold">
          🐾
        </div>

        <div className="space-y-8">
          {/* Memo Title & Mascots */}
          <div className="text-center pb-6 border-b-2 border-stone-700 print:border-stone-300 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <img
                src={pacoImg}
                alt="Paco"
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-xs"
              />
              <img
                src={minouPlumeImg}
                alt="Minou et Plume"
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-xs"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black font-display text-white print:text-black tracking-tight">
                LA BRIGADE ANTI-ARNAQUES : MÉMO DU FRIGO
              </h1>
              <p className="text-base sm:text-lg font-bold text-amber-300 print:text-amber-800 font-serif-warm mt-1">
                Protégée par Paco le Chihuahua, Minou et Plume les deux chats 🐾
              </p>
            </div>
          </div>

          {/* The 3 Golden Rules */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-black text-amber-400 print:text-black text-center uppercase tracking-wide">
              ⭐ LES 3 RÈGLES D'OR DE PACO ⭐
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              {/* Rule 1 */}
              <div className="bg-[#1E2336] print:bg-amber-50 rounded-2xl p-5 sm:p-6 border-2 border-amber-500/60 print:border-amber-300 flex items-start gap-4">
                <span className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-xs">
                  1
                </span>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-amber-200 print:text-stone-950">
                    Ne JAMAIS cliquer sur un lien reçu par SMS ou e-mail imprévu
                  </h3>
                  <p className="text-base sm:text-lg text-stone-300 print:text-stone-700 font-serif-warm leading-relaxed">
                    Un colis en retard, une fausse livraison ou un problème technique ?
                    <strong className="text-white print:text-black"> On ne touche à aucun lien bleu souligné.</strong> Les escrocs essaient de vous faire paniquer.
                  </p>
                </div>
              </div>

              {/* Rule 2 */}
              <div className="bg-[#241A1E] print:bg-rose-50 rounded-2xl p-5 sm:p-6 border-2 border-rose-500/60 print:border-rose-300 flex items-start gap-4">
                <span className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-xs">
                  2
                </span>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-rose-200 print:text-stone-950">
                    La banque ou la police ne demande JAMAIS de mot de passe ou de code SMS
                  </h3>
                  <p className="text-base sm:text-lg text-stone-300 print:text-stone-700 font-serif-warm leading-relaxed">
                    Si un conseiller très poli vous appelle et vous demande de lui lire un code à 6 chiffres :
                    <strong className="text-white print:text-black"> Raccrochez immédiatement !</strong> Un vrai banquier n’en a jamais besoin.
                  </p>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="bg-[#14231E] print:bg-emerald-50 rounded-2xl p-5 sm:p-6 border-2 border-emerald-500/60 print:border-emerald-300 flex items-start gap-4">
                <span className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-xs">
                  3
                </span>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-200 print:text-stone-950">
                    En cas de doute : j'appelle directement mes proches au téléphone
                  </h3>
                  <p className="text-base sm:text-lg text-stone-300 print:text-stone-700 font-serif-warm leading-relaxed">
                    Un message disant « J'ai un souci urgent avec mon téléphone » ?
                    <strong className="text-white print:text-black"> On ne verse aucun argent par texto.</strong> On appelle toujours sur son numéro habituel pour vérifier de vive voix.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency & Useful Numbers Box */}
          <div className="bg-[#181D2C] print:bg-white rounded-2xl p-6 border-2 border-stone-700 print:border-stone-300 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-extrabold text-white print:text-stone-900 flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400 print:text-amber-700" />
                <span>Mes Numéros Utiles & d'Urgence</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingPhones(!isEditingPhones)}
                className="text-xs font-bold text-amber-300 hover:text-amber-200 print:text-amber-800 flex items-center gap-1 cursor-pointer print:hidden"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditingPhones ? 'Fermer la saisie' : 'Modifier les numéros'}</span>
              </button>
            </div>

            {isEditingPhones ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#1F2639] rounded-xl border border-stone-700">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300">Numéro de mes proches :</label>
                  <input
                    type="tel"
                    value={familyNumber}
                    onChange={(e) => setFamilyNumber(e.target.value)}
                    placeholder="Ex : 06 12 34 56 78"
                    className="w-full px-3 py-2 bg-[#141724] border border-stone-600 rounded-lg text-base font-bold text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300">Numéro de mon agence bancaire :</label>
                  <input
                    type="tel"
                    value={bankNumber}
                    onChange={(e) => setBankNumber(e.target.value)}
                    placeholder="Ex : 01 42 00 00 00"
                    className="w-full px-3 py-2 bg-[#141724] border border-stone-600 rounded-lg text-base font-bold text-white"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSavePhones}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Enregistrer sur le Mémo</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base sm:text-lg">
                <div className="p-3 bg-[#1F2639] print:bg-stone-50 rounded-xl border border-stone-700 print:border-stone-200">
                  <span className="text-xs font-bold text-stone-400 print:text-stone-500 block">📞 Mes proches :</span>
                  <span className="font-extrabold text-amber-200 print:text-stone-900 font-mono">
                    {familyNumber || '__________________________'}
                  </span>
                </div>
                <div className="p-3 bg-[#1F2639] print:bg-stone-50 rounded-xl border border-stone-700 print:border-stone-200">
                  <span className="text-xs font-bold text-stone-400 print:text-stone-500 block">🏦 Mon agence bancaire habituelle :</span>
                  <span className="font-extrabold text-amber-200 print:text-stone-900 font-mono">
                    {bankNumber || '__________________________'}
                  </span>
                </div>
                <div className="p-3 bg-[#1F2639] print:bg-stone-50 rounded-xl border border-stone-700 print:border-stone-200">
                  <span className="text-xs font-bold text-stone-400 print:text-stone-500 block">🛡️ Info Escroqueries officiel (gratuit) :</span>
                  <span className="font-extrabold text-emerald-300 print:text-emerald-800 font-mono">0 805 805 817</span>
                </div>
                <div className="p-3 bg-[#1F2639] print:bg-stone-50 rounded-xl border border-stone-700 print:border-stone-200">
                  <span className="text-xs font-bold text-stone-400 print:text-stone-500 block">📱 Signaler un faux SMS (gratuit) :</span>
                  <span className="font-extrabold text-sky-300 print:text-blue-800 font-mono">Transférer le SMS au 33700</span>
                </div>
              </div>
            )}
          </div>

          {/* New: The 10 Keywords Reference on the Memo */}
          <div className="space-y-4 pt-4 border-t-2 border-stone-700 print:border-stone-300">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-amber-400 print:text-black uppercase tracking-wide">
                📋 LE PETIT LEXIQUE DU FRIGO : 10 MOTS-CLÉS DE MA SÉCURITÉ
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 print:text-stone-700 font-serif-warm">
                Les définitions essentielles et les repères des grilles de mots croisés
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {CYBER_GLOSSARY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#1B2030] print:bg-stone-50 rounded-xl border border-stone-700 print:border-stone-300 space-y-1"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-black text-amber-300 print:text-black flex items-center gap-1.5 text-sm sm:text-base">
                      <span>{item.icon}</span>
                      <span>{item.keyword}</span>
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 print:bg-stone-200 print:text-stone-800 shrink-0">
                      {item.notionKey}
                    </span>
                  </div>
                  <p className="text-stone-300 print:text-stone-800 text-xs sm:text-sm leading-snug">
                    {item.definition}
                  </p>
                  <p className="text-[11px] text-emerald-300 print:text-emerald-800 font-medium">
                    👉 {item.pedagogy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Loving Signature */}
          <div className="pt-2 text-center text-stone-400 print:text-stone-600 text-sm sm:text-base font-serif-warm border-t border-stone-700 print:border-amber-200">
            « Avec tout notre amour. Paco, Minou et Plume veillent toujours avec bienveillance ! »
          </div>
        </div>
      </div>
    </div>
  );
};
