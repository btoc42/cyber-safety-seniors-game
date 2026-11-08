import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowRight, RotateCcw, CheckCircle2, Sparkles, Award, Printer, Music, Shield } from 'lucide-react';
import { soundEffects, speakFrenchClue, stopSpeaking } from '../utils/audio';
import confetti from 'canvas-confetti';
import { pacoImg, minouPlumeImg } from '../assets';

export interface FunQuizQuestion {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  icon: string;
  visualCard: {
    tag: string;
    headline: string;
    sub: string;
    borderColor: string;
    bgColor: string;
  };
  options: {
    letter: 'A' | 'B' | 'C';
    emoji: string;
    text: string;
    isCorrect: boolean;
    funnyReaction?: string;
  }[];
  explanation: string;
  goldenRule: string;
}

export const FUN_QUIZ_QUESTIONS: FunQuizQuestion[] = [
  {
    id: 1,
    badge: 'Mot de Passe Malin',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    title: 'Le mot de passe "ultra-secret"',
    icon: '🔑',
    visualCard: {
      tag: 'Le Casse-Tête de la Mémoire',
      headline: 'Comment ne jamais oublier votre mot de passe de banque ?',
      sub: 'Trouver une astuce simple sans faciliter la vie aux voleurs !',
      borderColor: 'border-amber-500/50',
      bgColor: 'bg-amber-950/30'
    },
    options: [
      {
        letter: 'A',
        emoji: '🟨',
        text: 'Je colle un gros post-it jaune fluo sur l\'écran avec écrit « Chaton123 » en majuscules.',
        isCorrect: false,
        funnyReaction: 'Aïe ! Le facteur et les cambrioleurs vous disent merci pour le pense-bête !'
      },
      {
        letter: 'B',
        emoji: '🧠',
        text: 'J\'invente une petite phrase secrète : « PacoAimeLesCroquettesAuPoulet99! »',
        isCorrect: true,
        funnyReaction: 'Génial ! Facile à retenir pour vous, impossible à pirater pour un robot !'
      },
      {
        letter: 'C',
        emoji: '🖍️',
        text: 'Je l\'écris au marqueur indélébile sur mon front pour l\'avoir toujours avec moi dans la glace.',
        isCorrect: false,
        funnyReaction: 'Pratique sous la douche, mais un peu voyant chez le boulanger !'
      }
    ],
    explanation: 'Une phrase secrète avec des mots attachés, deux chiffres et un point d’exclamation est mille fois plus sûre qu’un mot court comme "123456" ou la date de naissance.',
    goldenRule: 'Pour vos comptes importants, composez une phrase que vous aimez : personne ne la devinera jamais.'
  },
  {
    id: 2,
    badge: 'Cadeau Tombé du Ciel',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    title: 'Le Caddie Géant Gratuit de 800 €',
    icon: '🛒',
    visualCard: {
      tag: 'Alerte Concours Magique',
      headline: '« Félicitations ! Vous gagnez un Caddie de courses de 800 € ! »',
      sub: 'Message WhatsApp scintillant : « Cliquez vite et transférez à 15 amis pour valider ! »',
      borderColor: 'border-emerald-500/50',
      bgColor: 'bg-emerald-950/30'
    },
    options: [
      {
        letter: 'A',
        emoji: '🏃‍♀️',
        text: 'Je prépare mes grands sacs de courses et je partage vite le lien à tout mon club de bridge.',
        isCorrect: false,
        funnyReaction: 'Attention ! Vos amies du bridge vont recevoir du spam de votre part !'
      },
      {
        letter: 'B',
        emoji: '🗑️',
        text: 'Poubelle directe ! Personne ne distribue 800 € de saucisson et de foie gras gratuit par texto.',
        isCorrect: true,
        funnyReaction: 'Exactement ! Le bon sens l’emporte toujours sur les mirages du web.'
      },
      {
        letter: 'C',
        emoji: '📱',
        text: 'Je réponds au message : « Merci mais je préfère le chocolat noir à 85% ».',
        isCorrect: false,
        funnyReaction: 'En répondant, vous confirmez que votre numéro de téléphone est actif !'
      }
    ],
    explanation: 'Ces faux jeux-concours alléchants cherchent seulement à vous abonner à des services payants cachés ou à propager des virus à tous vos contacts.',
    goldenRule: 'Sur Internet comme au marché : si un inconnu vous promet un cadeau gratuit extraordinaire, fuyez sans cliquer !'
  },
  {
    id: 3,
    badge: 'Fausse Amende',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    title: 'Le PV de Stationnement Imaginaire',
    icon: '🚗',
    visualCard: {
      tag: 'SMS Urgent de la Police ANTAI',
      headline: '« Retard de paiement pour une amende de stationnement de 35 €. »',
      sub: '« Dernier rappel avant saisie ! Réglez vite sur amende-gouv-enligne.com »',
      borderColor: 'border-rose-500/50',
      bgColor: 'bg-rose-950/30'
    },
    options: [
      {
        letter: 'A',
        emoji: '🧳',
        text: 'Je prépare ma valise pour aller en prison et je dis un adieu déchirant à mes chats.',
        isCorrect: false,
        funnyReaction: 'Pas de panique ! La maréchaussée ne viendra pas vous arrêter pour un SMS.'
      },
      {
        letter: 'B',
        emoji: '💸',
        text: 'Je paie vite par carte bleue, au cas où mon caddie à roulettes était mal garé chez le boulanger.',
        isCorrect: false,
        funnyReaction: 'Même le caddie le plus indiscipliné ne reçoit jamais d\'amende par texto !'
      },
      {
        letter: 'C',
        emoji: '🛑',
        text: 'Je supprime sans cliquer ! Les vraies amendes arrivent toujours par lettre postale dans la boîte aux lettres.',
        isCorrect: true,
        funnyReaction: 'Bravo ! Les services de l’État écrivent toujours par courrier officiel à votre nom.'
      }
    ],
    explanation: 'L’escroquerie à la fausse amende ANTAI cible tout le monde, même les personnes qui n’ont plus de voiture ! L’État n’envoie jamais de lien de paiement par texto.',
    goldenRule: 'Une vraie infraction officielle arrive toujours par courrier papier avec votre numéro d’immatriculation.'
  },
  {
    id: 4,
    badge: 'Fausse Amie en Panne',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    title: 'L\'amie Facebook et les Coupons Tabac',
    icon: '🎟️',
    visualCard: {
      tag: 'Message Facebook Surprenant',
      headline: 'Votre amie Yvette : « Coucou ! Ma carte bleue est bloquée... »',
      sub: '« Cours vite au bureau de tabac m\'acheter 3 coupons Neosurf à 100 € ! »',
      borderColor: 'border-purple-500/50',
      bgColor: 'bg-purple-950/30'
    },
    options: [
      {
        letter: 'A',
        emoji: '👟',
        text: 'J\'enfile mes baskets pour courir au tabac acheter ces mystérieux coupons pour Yvette.',
        isCorrect: false,
        funnyReaction: 'Stop ! Ce n\'est pas Yvette derrière le clavier, mais un pirate à des milliers de kilomètres !'
      },
      {
        letter: 'B',
        emoji: '📞',
        text: 'J\'appelle Yvette au téléphone fixe : « Yvette, depuis quand tu fumes des coupons Neosurf ? »',
        isCorrect: true,
        funnyReaction: 'Parfait ! Un simple coup de fil fait tomber le masque de l’escroc instantanément.'
      },
      {
        letter: 'C',
        emoji: '✉️',
        text: 'Je lui envoie ma carte bancaire par La Poste dans une enveloppe à bulles.',
        isCorrect: false,
        funnyReaction: 'Catastrophe garantie ! On ne prête jamais ses cartes de paiement.'
      }
    ],
    explanation: 'Dès qu’un proche vous réclame d’acheter des coupons (PCS, Neosurf, cartes cadeaux Apple ou Amazon) au bureau de tabac, son compte a été piraté.',
    goldenRule: 'Dans le doute, on appelle toujours son ami(e) sur son téléphone habituel de vive voix.'
  },
  {
    id: 5,
    badge: 'Arnaque au Trésor',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    title: 'L\'Héritage Surprise du Prince Lointain',
    icon: '👑',
    visualCard: {
      tag: 'E-mail Royal Inattendu',
      headline: '« Je suis le Prince Archibald et je vous lègue 4 millions d\'euros ! »',
      sub: '« Envoyez-moi juste 150 € de timbres fiscaux pour débloquer votre fortune. »',
      borderColor: 'border-yellow-500/50',
      bgColor: 'bg-yellow-950/30'
    },
    options: [
      {
        letter: 'A',
        emoji: '🏰',
        text: 'Je commande déjà mon château sur la Côte d\'Azur et j\'achète les timbres.',
        isCorrect: false,
        funnyReaction: 'Le château va devoir attendre ! Le prince Archibald n\'a pas un sou pour vous.'
      },
      {
        letter: 'B',
        emoji: '🐕',
        text: 'Paco aboie de rire : Poubelle directe ! Les princes milliardaires n\'ont pas besoin de mes 150 €.',
        isCorrect: true,
        funnyReaction: 'Bien vu ! C’est la plus vieille arnaque du monde, revue à la sauce numérique.'
      },
      {
        letter: 'C',
        emoji: '💍',
        text: 'Je propose d\'épouser le Prince Archibald pour régler l\'affaire en famille.',
        isCorrect: false,
        funnyReaction: 'Romantique mais risqué : Archibald n\'existe que dans l\'ordinateur des arnaqueurs !'
      }
    ],
    explanation: 'L’arnaque à l’héritage ou à la loterie lointaine vous demande toujours d’avancer une petite somme pour toucher le gros lot. Vous ne reverrez jamais votre argent.',
    goldenRule: 'Ne versez JAMAIS d’argent pour en recevoir. Les vrais héritages se règlent chez un notaire en chair et en os.'
  }
];

interface QuizSereniteProps {
  onBackToGame: () => void;
  highContrast: boolean;
  onPrint?: () => void;
}

export const QuizSerenite: React.FC<QuizSereniteProps> = ({
  onBackToGame,
  highContrast,
  onPrint
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C'>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPlayingBirthday, setIsPlayingBirthday] = useState<boolean>(false);

  const currentQ = FUN_QUIZ_QUESTIONS[currentIndex];
  const userChoice = selectedAnswers[currentQ.id];
  const hasAnsweredCurrent = userChoice !== undefined;
  const chosenOption = currentQ.options.find(o => o.letter === userChoice);
  const isCurrentCorrect = chosenOption?.isCorrect;

  // Calculate score
  const score = Object.entries(selectedAnswers).reduce((acc, [qId, choice]) => {
    const q = FUN_QUIZ_QUESTIONS.find(item => item.id === Number(qId));
    const opt = q?.options.find(o => o.letter === choice);
    return opt?.isCorrect ? acc + 1 : acc;
  }, 0);

  const handleSelectOption = (letter: 'A' | 'B' | 'C') => {
    if (hasAnsweredCurrent) return;

    const updated = { ...selectedAnswers, [currentQ.id]: letter };
    setSelectedAnswers(updated);

    const opt = currentQ.options.find(o => o.letter === letter);
    if (opt?.isCorrect) {
      soundEffects.playSuccess(true);
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      soundEffects.playPacoBark();
    }
  };

  const handleNext = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (currentIndex < FUN_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
      // Musique Anniversaire ONLY as requested
      setIsPlayingBirthday(true);
      soundEffects.playHappyBirthday(true, () => {
        setIsPlayingBirthday(false);
      });
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#10B981', '#EC4899', '#6366F1', '#FBBF24']
      });
    }
  };

  const handlePrev = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleResetQuiz = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setIsPlayingBirthday(false);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    soundEffects.playTap(true);
  };

  const handleSpeakQuestion = () => {
    setIsSpeaking(true);
    const speech = `Question numéro ${currentQ.id} sur 5 : ${currentQ.title}. ${currentQ.visualCard.headline}. ${currentQ.visualCard.sub}. Choix A : ${currentQ.options[0].text}. Choix B : ${currentQ.options[1].text}. Choix C : ${currentQ.options[2].text}.`;
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner Navigation */}
      <div className="bg-[#131622] rounded-3xl p-5 sm:p-6 border border-stone-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mini-Jeu 3 · 100% Inédit & Rigolo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Le Grand Quiz de Sérénité Numérique
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-serif-warm">
            5 énigmes amusantes et visuelles pour déjouer les pièges avec Paco et le sourire ! 🐾
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => (isSpeaking ? handleStopSpeech() : handleSpeakQuestion())}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#1C2030] hover:bg-[#252B40] text-stone-200 border border-stone-700 cursor-pointer transition-colors"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span>{isSpeaking ? 'Arrêter la voix' : 'Écouter la question'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#161A26] hover:bg-[#1E2334] text-stone-200 border border-stone-700 cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress Tracker Bar */}
          <div className="bg-[#141724] rounded-2xl p-4 border border-stone-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-amber-400 uppercase tracking-wide">
                Énigme {currentIndex + 1} / {FUN_QUIZ_QUESTIONS.length}
              </span>
              <span className="text-stone-500">·</span>
              <span className="text-xs font-bold text-stone-300">
                Score : {score} / {currentIndex + (hasAnsweredCurrent ? 1 : 0)}
              </span>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {FUN_QUIZ_QUESTIONS.map((q, idx) => {
                const answer = selectedAnswers[q.id];
                const isAnswered = answer !== undefined;
                const isCorrect = isAnswered && q.options.find(o => o.letter === answer)?.isCorrect;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      stopSpeaking();
                      setIsSpeaking(false);
                    }}
                    className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center transition-all cursor-pointer ${
                      idx === currentIndex ? 'ring-2 ring-amber-400 scale-110 font-black' : ''
                    } ${
                      !isAnswered
                        ? 'bg-[#1D2235] text-stone-400 border border-stone-700'
                        : isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {q.icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fun Question Card - VISUAL & PUNCHY (NO TEXT DUMPS) */}
          <div className="bg-[#141724] rounded-3xl p-6 sm:p-8 border-2 border-stone-800 space-y-6 shadow-xl">
            {/* Visual Headline Banner */}
            <div className={`p-5 sm:p-6 rounded-2xl border-2 ${currentQ.visualCard.borderColor} ${currentQ.visualCard.bgColor} space-y-3`}>
              <div className="flex items-center justify-between gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${currentQ.badgeColor}`}>
                  {currentQ.badge}
                </span>
                <span className="text-3xl">{currentQ.icon}</span>
              </div>

              <div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block">
                  {currentQ.visualCard.tag}
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-display text-white mt-1 leading-snug">
                  {currentQ.visualCard.headline}
                </h2>
                <p className="text-sm sm:text-base text-stone-300 font-serif-warm mt-1">
                  {currentQ.visualCard.sub}
                </p>
              </div>
            </div>

            {/* Visual Options (Funny, Clear, Easy to Touch) */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-300">
                👉 Votre décision (cliquez sur la bonne carte) :
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isChosen = userChoice === opt.letter;
                  const showResult = hasAnsweredCurrent;

                  let cardStyle = 'bg-[#181D2C] border-stone-700 hover:border-amber-400/80 text-stone-200';
                  if (showResult) {
                    if (opt.isCorrect) {
                      cardStyle = 'bg-[#132A1F] border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50';
                    } else if (isChosen && !opt.isCorrect) {
                      cardStyle = 'bg-[#2E181D] border-rose-500 text-rose-100 ring-2 ring-rose-500/50';
                    } else {
                      cardStyle = 'bg-[#131622] border-stone-800 text-stone-400 opacity-60';
                    }
                  } else if (isChosen) {
                    cardStyle = 'bg-[#1E2538] border-amber-400 text-white ring-2 ring-amber-400';
                  }

                  return (
                    <button
                      key={opt.letter}
                      type="button"
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleSelectOption(opt.letter)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 min-h-[64px] cursor-pointer ${cardStyle} ${
                        !hasAnsweredCurrent ? 'hover:scale-[1.01] active:scale-[0.99]' : ''
                      }`}
                    >
                      <span className={`w-10 h-10 rounded-xl text-lg font-black flex items-center justify-center shrink-0 ${
                        showResult && opt.isCorrect
                          ? 'bg-emerald-500 text-white'
                          : showResult && isChosen && !opt.isCorrect
                          ? 'bg-rose-500 text-white'
                          : 'bg-stone-800 text-amber-300 border border-stone-600'
                      }`}>
                        {opt.emoji}
                      </span>

                      <div className="flex-1 text-base sm:text-lg font-bold leading-snug">
                        <span className="text-amber-400 font-mono mr-2">{opt.letter}.</span>
                        {opt.text}
                      </div>

                      {showResult && opt.isCorrect && (
                        <span className="shrink-0 text-emerald-400 flex items-center gap-1 text-xs font-black uppercase bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Gagné !</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Benevolent Funny Feedback & Tip when answered */}
            {hasAnsweredCurrent && (
              <div className="space-y-4 pt-4 border-t-2 border-stone-800 animate-fadeIn">
                <div className={`p-5 rounded-2xl border-2 flex items-start gap-4 ${
                  isCurrentCorrect
                    ? 'bg-[#122A1E] border-emerald-500/80 text-emerald-100'
                    : 'bg-[#2A181C] border-rose-500/80 text-rose-100'
                }`}>
                  <img
                    src={pacoImg}
                    alt="Paco le Chihuahua"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-amber-400 shrink-0 shadow-md"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black text-white">
                        {isCurrentCorrect
                          ? '🐕 Paco remue joyeusement la queue : Bravo !'
                          : '🐕 Paco dresse les oreilles avec un sourire complice :'}
                      </span>
                    </div>

                    {chosenOption?.funnyReaction && (
                      <p className="text-sm sm:text-base font-bold italic text-amber-200">
                        « {chosenOption.funnyReaction} »
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-stone-200 font-serif-warm leading-relaxed">
                      {currentQ.explanation}
                    </p>

                    <div className="pt-2 p-3 bg-black/40 rounded-xl border border-stone-700/80 text-xs sm:text-sm font-bold text-emerald-200 flex items-start gap-2">
                      <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{currentQ.goldenRule}</span>
                    </div>
                  </div>
                </div>

                {/* Next / Previous Navigation */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-4 py-2.5 rounded-xl font-bold text-sm text-stone-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    ← Précédente
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-500 active:scale-98 text-white rounded-2xl font-black text-base shadow-md cursor-pointer transition-all border border-amber-400/40"
                  >
                    <span>{currentIndex < FUN_QUIZ_QUESTIONS.length - 1 ? 'Énigme suivante' : 'Voir mon bilan final'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Final Completion Screen with Happy Birthday Music as reward! */
        <div className="bg-[#141724] rounded-3xl p-6 sm:p-10 border-4 border-amber-500/50 shadow-2xl space-y-8 text-center animate-fadeIn">
          <div className="flex items-center justify-center gap-4">
            <img
              src={pacoImg}
              alt="Paco"
              className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 shadow-md"
            />
            <img
              src={minouPlumeImg}
              alt="Minou et Plume"
              className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 shadow-md"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800">
              Résultat du Grand Quiz
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              {score === 5
                ? '⭐ 5 / 5 : Championne de la Sérénité !'
                : score >= 3
                ? `👏 Très Beau Score : ${score} / 5`
                : `🐾 Quiz Terminé : ${score} / 5`}
            </h2>
            <p className="text-base sm:text-lg text-stone-300 font-serif-warm max-w-xl mx-auto">
              {score === 5
                ? 'Aucun piège ne vous a résisté ! Vous déjouez les arnaques les plus farfelues les yeux fermés.'
                : score >= 3
                ? 'Les arnaques courantes sont bien démasquées ! Le bon réflexe est acquis : toujours vérifier avant de cliquer.'
                : 'Bravo d’avoir joué ! L’essentiel à retenir : si une offre semble trop belle ou trop urgente, on demande toujours l’avis d’un proche !'}
            </p>
          </div>

          {/* Birthday Music Reward Banner (NO cat purr, only Birthday music) */}
          <div className="bg-[#1C2236] rounded-2xl p-4 border border-amber-500/40 max-w-md mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center justify-center gap-1.5">
              <Music className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Récompense Spéciale Anniversaire</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setIsPlayingBirthday(true);
                soundEffects.playHappyBirthday(true, () => setIsPlayingBirthday(false));
                confetti({
                  particleCount: 50,
                  spread: 70,
                  origin: { y: 0.6 }
                });
              }}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition shadow-md"
            >
              <Music className="w-4 h-4" />
              <span>{isPlayingBirthday ? '🎵 Musique en cours...' : '🎶 Rejouer « Joyeux Anniversaire »'}</span>
            </button>
          </div>

          {/* Summary of the 5 Rules */}
          <div className="space-y-3 text-left">
            <h3 className="text-sm font-black uppercase tracking-wider text-amber-300 text-center">
              📋 Les 5 Réflexes d'Or du Quiz
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {FUN_QUIZ_QUESTIONS.map((q) => {
                const answer = selectedAnswers[q.id];
                const isCorrect = q.options.find(o => o.letter === answer)?.isCorrect;

                return (
                  <div
                    key={q.id}
                    className="p-3.5 bg-[#1B2030] rounded-xl border border-stone-700 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span>{q.icon}</span>
                        <span>{q.title}</span>
                      </span>
                      {isCorrect ? (
                        <span className="text-xs font-black text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Réussi</span>
                        </span>
                      ) : (
                        <span className="text-xs font-black text-amber-400">À retenir</span>
                      )}
                    </div>
                    <p className="text-stone-300 text-xs font-serif-warm leading-snug">
                      👉 {q.goldenRule}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-stone-800">
            <button
              type="button"
              onClick={handleResetQuiz}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1F2538] hover:bg-[#282F46] text-stone-200 border border-stone-700 font-bold text-sm cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Recommencer le Quiz</span>
            </button>

            <button
              type="button"
              onClick={onBackToGame}
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-black text-sm cursor-pointer transition-colors border border-amber-400/50"
            >
              <span>Aller aux Mots Croisés</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
