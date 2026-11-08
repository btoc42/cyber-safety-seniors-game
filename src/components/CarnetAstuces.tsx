import React, { useState, useMemo } from 'react';
import { ShieldCheck, Volume2, VolumeX, AlertTriangle, BookOpen, Printer, ArrowLeft, Key, Sparkles, CheckCircle2 } from 'lucide-react';
import { CYBER_GUIDE_TIPS } from '../data/cyberTipsGuide';
import { CYBER_GLOSSARY_ITEMS, CyberGlossaryItem } from '../data/cyberGlossary';
import { CyberTip } from '../types';
import { teaImg, minouPlumeImg } from '../assets';

interface CarnetAstucesProps {
  onBackToGame: () => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  highContrast: boolean;
  onPrint: () => void;
}

export const CarnetAstuces: React.FC<CarnetAstucesProps> = ({
  onBackToGame,
  onSpeak,
  isSpeaking,
  onStopSpeaking,
  highContrast,
  onPrint
}) => {
  const [activeTab, setActiveTab] = useState<'glossary' | 'tips'>('glossary');
  const [selectedTip, setSelectedTip] = useState<CyberTip>(CYBER_GUIDE_TIPS[0]);
  const [selectedGlossary, setSelectedGlossary] = useState<CyberGlossaryItem>(CYBER_GLOSSARY_ITEMS[0]);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');

  const filteredTips = useMemo(() => {
    if (filter === 'all') return CYBER_GUIDE_TIPS;
    return CYBER_GUIDE_TIPS.filter((t) => t.category === filter);
  }, [filter]);

  const filteredGlossary = useMemo(() => {
    if (glossaryCategory === 'all') return CYBER_GLOSSARY_ITEMS;
    return CYBER_GLOSSARY_ITEMS.filter((item) => item.category === glossaryCategory);
  }, [glossaryCategory]);

  const handleSpeakTip = (tip: CyberTip) => {
    if (isSpeaking && speakingId === tip.id) {
      onStopSpeaking();
      setSpeakingId(null);
    } else {
      setSelectedTip(tip);
      setSpeakingId(tip.id);
      const speech = `${tip.title}. ${tip.summary}. Exemple : ${tip.scamStory}. Signaux d'alerte : ${tip.dangerSigns.join('. ')}. ${tip.goldenRule}`;
      onSpeak(speech);
    }
  };

  const handleSpeakGlossary = (item: CyberGlossaryItem) => {
    if (isSpeaking && speakingId === item.id) {
      onStopSpeaking();
      setSpeakingId(null);
    } else {
      setSelectedGlossary(item);
      setSpeakingId(item.id);
      const speech = `${item.keyword}, aussi appelé ${item.alternateName || item.keyword}. ${item.notionKey}. Définition : ${item.definition}. Ce qu'il faut retenir : ${item.pedagogy}. La règle d'or : ${item.goldenRule}`;
      onSpeak(speech);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToGame}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-stone-200 bg-[#161A26] border border-stone-700 hover:bg-[#1E2334] shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Retourner à la grille</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-200 bg-[#161A26] border border-stone-700 hover:bg-[#1E2334] shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Imprimer le Mémo & Lexique</span>
          </button>
        </div>
      </div>

      {/* Guide Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border shadow-md relative overflow-hidden bg-[#131622] border-stone-800 text-stone-100">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Guide de Sérénité Numérique</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-3">
            Le Carnet de Sérénité & Les Mots d'Or de la Brigade
          </h1>
          <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-serif-warm">
            Tous les repères clairs, bienveillants et sans jargon pour naviguer sur tablette et téléphone sans jamais se faire piéger.
          </p>
        </div>

        {/* Decorative banner image */}
        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 w-48 h-36 rounded-2xl overflow-hidden border border-stone-700 shadow-md">
          <img
            src={teaImg}
            alt="Tasse de thé et sérénité"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Primary Mode Switcher (10 Mots-Clés vs 8 Réflexes d'Or) */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#131622] p-2 rounded-2xl border border-stone-800">
        <button
          type="button"
          onClick={() => {
            setActiveTab('glossary');
            onStopSpeaking();
            setSpeakingId(null);
          }}
          className={`flex-1 w-full sm:w-auto py-3 px-5 rounded-xl text-sm sm:text-base font-extrabold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
            activeTab === 'glossary'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-300 hover:text-white hover:bg-[#1A1F30]'
          }`}
        >
          <Key className="w-5 h-5 text-amber-300" />
          <span>💡 Les 10 Mots-Clés Incontournables (Indices Grilles)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('tips');
            onStopSpeaking();
            setSpeakingId(null);
          }}
          className={`flex-1 w-full sm:w-auto py-3 px-5 rounded-xl text-sm sm:text-base font-extrabold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
            activeTab === 'tips'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-300 hover:text-white hover:bg-[#1A1F30]'
          }`}
        >
          <ShieldCheck className="w-5 h-5 text-emerald-300" />
          <span>🛡️ Les 8 Réflexes d'Or du Quotidien</span>
        </button>
      </div>

      {/* TAB 1: 10 MOTS-CLÉS DE CYBERSÉCURITÉ */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          {/* Sub-filters for Glossary */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setGlossaryCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                glossaryCategory === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-[#161A26] text-stone-300 border border-stone-700 hover:bg-[#1E2334]'
              }`}
            >
              Tous les 10 mots ({CYBER_GLOSSARY_ITEMS.length})
            </button>
            <button
              type="button"
              onClick={() => setGlossaryCategory('menace')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                glossaryCategory === 'menace'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-[#161A26] text-stone-300 border border-stone-700 hover:bg-[#1E2334]'
              }`}
            >
              ⚠️ Les Pièges & Menaces (Phishing, Spam, Ransomware...)
            </button>
            <button
              type="button"
              onClick={() => setGlossaryCategory('protection')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                glossaryCategory === 'protection'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-[#161A26] text-stone-300 border border-stone-700 hover:bg-[#1E2334]'
              }`}
            >
              🛡️ Vos Boucliers (Antivirus, Sauvegarde, Mise à jour)
            </button>
            <button
              type="button"
              onClick={() => setGlossaryCategory('cle_secrete')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                glossaryCategory === 'cle_secrete'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-[#161A26] text-stone-300 border border-stone-700 hover:bg-[#1E2334]'
              }`}
            >
              🔑 Vos Clés & Codes (Mot de passe, Double facteur)
            </button>
          </div>

          {/* Cards for Glossary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGlossary.map((item, idx) => {
              const isCurrentSpeaking = isSpeaking && speakingId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl p-6 border transition-all shadow-md flex flex-col justify-between bg-[#131622] border-stone-800 hover:border-stone-700"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xl flex items-center justify-center shrink-0">
                          {item.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl sm:text-2xl font-black font-display text-white tracking-wide">
                              {item.keyword}
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {item.notionKey}
                            </span>
                          </div>
                          {item.alternateName && (
                            <p className="text-xs text-stone-400 italic">
                              Aussi appelé : {item.alternateName}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSpeakGlossary(item)}
                        className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                          isCurrentSpeaking
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-[#1F2538] text-amber-300 hover:bg-amber-500/20 border border-stone-700'
                        }`}
                        title="Écouter la définition à haute voix"
                      >
                        {isCurrentSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Definition box (Crossword Clue) */}
                    <div className="p-4 bg-[#1C2030] rounded-2xl border border-stone-700 text-sm sm:text-base text-amber-100 font-serif-warm leading-relaxed">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        📖 Indice & Définition :
                      </span>
                      « {item.definition} »
                    </div>

                    {/* Pedagogy / Takeaway */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-sky-400" />
                        <span>Ce qu'il faut retenir</span>
                      </div>
                      <p className="text-sm sm:text-base text-stone-200 leading-snug">
                        {item.pedagogy}
                      </p>
                    </div>
                  </div>

                  {/* Golden Rule Footer */}
                  <div className="mt-5 p-4 rounded-2xl bg-[#14261E] border border-emerald-600/50 text-stone-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1 uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Le Bon Réflexe de Plume & Minou</span>
                    </div>
                    <p className="font-bold text-sm sm:text-base leading-snug text-emerald-100">
                      {item.goldenRule}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: 8 RÉFLEXES DU QUOTIDIEN (EXISTING) */}
      {activeTab === 'tips' && (
        <div className="space-y-6">
          {/* Sub-filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-[#161A26] text-stone-300 border border-stone-700 hover:bg-[#1E2334]'
              }`}
            >
              Tous les scénarios ({CYBER_GUIDE_TIPS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('phishing_sms')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === 'phishing_sms'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-[#161A26] text-stone-300 border border-stone-700 hover:bg-[#1E2334]'
              }`}
            >
              Faux SMS & Colis
            </button>
            <button
              type="button"
              onClick={() => setFilter('faux_banquier')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === 'faux_banquier'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-[#161A26] text-stone-300 border border-stone-700 hover:bg-[#1E2334]'
              }`}
            >
              Faux Banquier
            </button>
            <button
              type="button"
              onClick={() => setFilter('faux_proche')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === 'faux_proche'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-[#161A26] text-stone-300 border border-stone-700 hover:bg-[#1E2334]'
              }`}
            >
              Faux Enfant ("Coucou Maman")
            </button>
          </div>

          {/* Grid of the Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTips.map((tip, idx) => {
              const isCurrentSpeaking = isSpeaking && speakingId === tip.id;

              return (
                <div
                  key={tip.id}
                  className="rounded-3xl p-6 border transition-all shadow-md flex flex-col justify-between bg-[#131622] border-stone-800 hover:border-stone-700"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold text-sm flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold font-display text-white leading-snug">
                          {tip.title}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSpeakTip(tip)}
                        className={`p-2 rounded-xl transition-colors shrink-0 ${
                          isCurrentSpeaking
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-[#1F2538] text-amber-300 hover:bg-amber-500/20 border border-stone-700'
                        }`}
                        title="Écouter l'astuce à haute voix"
                      >
                        {isCurrentSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-stone-300">
                      {tip.summary}
                    </p>

                    {/* Example Story */}
                    <div className="p-3.5 bg-[#1C2030] rounded-2xl border border-stone-700 text-xs sm:text-sm text-stone-200 italic font-serif-warm">
                      « {tip.scamStory} »
                    </div>

                    {/* Signs */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>À repérer</span>
                      </div>
                      <ul className="space-y-1 text-xs sm:text-sm text-stone-300">
                        {tip.dangerSigns.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-400 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Golden Rule Footer */}
                  <div className="mt-5 p-4 rounded-2xl bg-[#14261E] border border-emerald-600/50 text-stone-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1 uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>La Règle d’Or</span>
                    </div>
                    <p className="font-bold text-sm sm:text-base leading-snug text-emerald-100">
                      {tip.goldenRule}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
