import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldAlert, Sparkles, CheckCircle2, RotateCcw, AlertTriangle, ArrowRight, Award } from 'lucide-react';
import { soundEffects, speakFrenchClue, stopSpeaking } from '../utils/audio';
import confetti from 'canvas-confetti';
import { pacoImg, minouPlumeImg } from '../assets';

interface Scenario {
  id: string;
  type: 'sms' | 'call' | 'whatsapp' | 'email' | 'alert';
  sender: string;
  senderSubtitle: string;
  time: string;
  title: string;
  content: string;
  previewNote?: string;
  linkText?: string;
  pacoWarning: string;
  catsPraise: string;
  goldenRule: string;
  whyDanger: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'chronopost',
    type: 'sms',
    sender: '+33 6 82 14 90 23',
    senderSubtitle: 'Numéro mobile inconnu se faisant passer pour la livraison',
    time: '11:42',
    title: 'Le faux SMS Chronopost / Colis',
    content: 'CHRONOPOST : Votre colis n° FR-94812 ne rentre pas dans la boîte aux lettres. Veuillez choisir un nouveau créneau et régler 1,99 € de frais de re-livraison.',
    linkText: 'chronopost-relais-frais2e.com/suivi',
    pacoWarning: 'Waf ! Paco aboie et dresse les oreilles ! Ne clique jamais sur ce lien bleu ! La Poste et Chronopost ne demandent JAMAIS de payer des frais imprévus par SMS.',
    catsPraise: 'Ron-ron... Minou et Plume s’étirent de bonheur ! Tu n’as pas mordu à l’hameçon. Les faux livreurs ne t’auront pas !',
    goldenRule: 'La règle d’or de Paco : On ne clique sur aucun lien bleu dans les SMS. Si j’attends un colis, je vais moi-même sur le site officiel de La Poste.',
    whyDanger: 'Le lien mène à une fausse page qui vous demande vos numéros de carte bancaire pour voler votre argent.'
  },
  {
    id: 'banque',
    type: 'call',
    sender: '01 42 68 00 12',
    senderSubtitle: 'Numéro masqué ou faux numéro affichant "Sécurité Bancaire"',
    time: '14:15',
    title: 'Le faux conseiller de la Banque',
    content: '« Bonjour Madame, je suis votre conseiller du service des fraudes de votre banque. Un pirate tente un débit de 950 € sur votre compte ! Pour que j’annule tout immédiatement, donnez-moi vite le code secret à 6 chiffres que vous venez de recevoir par SMS ! »',
    pacoWarning: 'Grrr... Paco grogne doucement ! C’est un imposteur ! Votre vrai banquier n’a JAMAIS besoin de votre code reçu par SMS pour bloquer une fraude !',
    catsPraise: 'Purrr... Plume frotte sa tête contre ta main ! En refusant de donner le code, tu as protégé tout ton compte en banque !',
    goldenRule: 'La règle d’or de Paco : Un code reçu par SMS est strictement CONFIDENTIEL. On ne le donne JAMAIS à personne au téléphone. On raccroche et on appelle son agence habituelle.',
    whyDanger: 'En lui lisant ce code, c’est vous qui validez le virement des voleurs sans le savoir.'
  },
  {
    id: 'coucou_maman',
    type: 'whatsapp',
    sender: '07 56 91 88 40',
    senderSubtitle: 'Message reçu d’un numéro totalement inconnu',
    time: '16:03',
    title: 'Le faux SMS : "Coucou Maman"',
    content: '« Coucou maman, j’ai fait tomber mon téléphone dans l’eau et mon écran est cassé. C’est mon nouveau numéro temporaire d’urgence. Envoie-moi vite un message sur WhatsApp car j’ai un gros souci pour payer une facture urgente... »',
    pacoWarning: 'Waf waf ! Paco renifle le texto et donne un coup de patte ! C’est un robot escroc qui écrit à des milliers de mamans en même temps !',
    catsPraise: 'Miaou ! Minou fait des petits bonds joyeux ! Tu as gardé la tête froide avant d’agir ! Ton amour maternel est bien gardé.',
    goldenRule: 'La règle d’or de Paco : Si un enfant écrit d’un nouveau numéro pour demander de l’argent, on l’appelle TOUJOURS d’abord sur son numéro de téléphone habituel pour entendre sa vraie voix.',
    whyDanger: 'L’escroc joue sur l’angoisse des mamans pour réclamer un virement ou des coupons prépayés impossibles à récupérer.'
  },
  {
    id: 'impots_edf',
    type: 'email',
    sender: 'remboursement@dgfip-fiscal-avis.fr',
    senderSubtitle: 'Adresse trompeuse imitant la Direction Générale des Finances',
    time: 'Hier, 18:20',
    title: 'Le faux courriel des Impôts ou de l’Assurance Maladie',
    content: '« Madame, Monsieur, après le calcul de vos droits pour l’année écoulée, vous êtes éligible à un remboursement exceptionnel de 145,20 €. Pour recevoir votre virement sur votre compte sous 48h, veuillez confirmer les numéros de votre carte bancaire. »',
    linkText: 'portail-remboursement-impots-france.net/acces',
    pacoWarning: 'Waf ! Paco lève la truffe et prévient : les Impôts et l’Assurance Maladie ne demandent JAMAIS un numéro de carte bleue pour vous rembourser !',
    catsPraise: 'Ron-ron-ron... Plume et Minou s’endorment paisiblement sur le coussin. Tu as déjoué le piège de l’argent facile !',
    goldenRule: 'La règle d’or de Paco : Pour un remboursement, les impôts demandent un RIB officiel sur impots.gouv.fr, jamais un numéro de carte de paiement.',
    whyDanger: 'Une carte bancaire sert à PAYER, jamais à RECEVOIR un remboursement de l’État.'
  },
  {
    id: 'alerte_virus',
    type: 'alert',
    sender: 'Alerte Système Bloqué !',
    senderSubtitle: 'Page internet qui clignote en rouge avec une sirène',
    time: 'En direct',
    title: 'La fausse alerte "Ordinateur Bloqué avec Sirène"',
    content: '🚨 ATTENTION ! VOTRE ORDINATEUR EST GRAVEMENT INFECTÉ PAR 5 VIRUS ! Votre disque dur va être effacé dans 2 minutes. N’éteignez pas votre appareil ! Appelez immédiatement les techniciens agréés au numéro gratuit : 08 90 21 44 00',
    pacoWarning: 'Waf ! Paco n’a pas peur de la fausse sirène ! Ce n’est PAS un virus, c’est une page internet piégée pour vous faire paniquer et vous faire payer un faux dépannage !',
    catsPraise: 'Ron-ron ! Minou donne un coup de patte zen ! Il suffit d’éteindre la tablette ou de fermer l’onglet pour que tout redevienne calme.',
    goldenRule: 'La règle d’or de Paco : Ne jamais appeler les numéros qui surgissent sur l’écran avec une sirène. On éteint l’appareil et on le rallume calmement.',
    whyDanger: 'Au téléphone, de faux réparateurs prennent le contrôle à distance de votre écran et vous facturent 300 € pour du vent.'
  }
];

interface PacoScamHuntProps {
  soundEnabled: boolean;
  highContrast: boolean;
}

export const PacoScamHunt: React.FC<PacoScamHuntProps> = ({ soundEnabled, highContrast }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [treatsCount, setTreatsCount] = useState<number>(0);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'success' | 'trap'>('idle');
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const scenario = SCENARIOS[currentIndex];

  const handleSpeech = (text: string) => {
    setIsSpeaking(true);
    speakFrenchClue(text, 0.85);
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

  // User refuses the trap (GOOD ACTION)
  const handleRefuse = () => {
    soundEffects.playSuccess(soundEnabled);
    soundEffects.playTreatSound(soundEnabled);
    setFeedbackState('success');
    setTreatsCount((prev) => prev + 1);

    if (!completedScenarios.includes(scenario.id)) {
      setCompletedScenarios((prev) => [...prev, scenario.id]);
    }

    if (completedScenarios.length + 1 >= SCENARIOS.length) {
      setTimeout(() => {
        soundEffects.playVictory(soundEnabled);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
        setShowCertificate(true);
      }, 1400);
    }
  };

  // User fell into the trap (PEDAGOGICAL CORRECTION)
  const handleFallIntoTrap = () => {
    soundEffects.playPacoBark(soundEnabled);
    setFeedbackState('trap');
  };

  const handleNext = () => {
    setFeedbackState('idle');
    handleStopSpeech();
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowCertificate(true);
    }
  };

  const handleResetGame = () => {
    setCurrentIndex(0);
    setTreatsCount(0);
    setFeedbackState('idle');
    setCompletedScenarios([]);
    setShowCertificate(false);
    handleStopSpeech();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Brigade Mascot Header Strip */}
      <div
        className="rounded-3xl p-5 sm:p-6 border transition-all bg-[#131622] border-stone-800 text-stone-100 shadow-md"
      >
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative shrink-0">
            <img
              src={pacoImg}
              alt="Paco le petit Chihuahua protecteur"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-3 border-amber-400 shadow-md"
            />
            <span className="absolute -bottom-2 -right-2 bg-amber-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-full shadow-xs">
              Paco 🐾
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-800/80 px-2.5 py-0.5 rounded-full">
                Mini-Jeu n°1
              </span>
              <span className="text-xs font-bold text-stone-400">
                Mission {currentIndex + 1} sur {SCENARIOS.length}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Le flair de Paco : Chasse aux pièges
            </h2>
            <p className="text-base text-stone-300 leading-relaxed font-serif-warm">
              Paco le chihuahua dresse les oreilles, tandis que Minou et Plume attendent leurs friandises.
              Aide la brigade à repérer les faux messages !
            </p>
          </div>

          {/* Friandises Counter Gauge */}
          <div className="shrink-0 bg-[#1C2030] rounded-2xl p-3.5 border border-amber-500/40 text-center shadow-xs min-w-[130px]">
            <span className="text-xs font-bold text-amber-300 block mb-1">
              Friandises gagnées
            </span>
            <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-amber-400">
              <span>🦴</span>
              <span>{treatsCount}</span>
            </div>
            <span className="text-[11px] font-semibold text-stone-400 block mt-0.5">
              pour Paco & les chats
            </span>
          </div>
        </div>
      </div>

      {/* Main Smartphone Simulation Card */}
      <div className="bg-[#121520] rounded-3xl p-4 sm:p-7 shadow-xl max-w-xl mx-auto border-4 border-stone-800">
        {/* Smartphone Bezel Header */}
        <div className="flex items-center justify-between text-stone-400 text-xs px-2 mb-3">
          <span className="font-mono font-bold text-stone-300">{scenario.time}</span>
          <div className="w-16 h-3.5 bg-stone-900 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-stone-700" />
          </div>
          <span className="font-semibold text-stone-300">4G 🔋 89%</span>
        </div>

        {/* Smartphone Screen Window */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 text-stone-900 space-y-4 shadow-inner min-h-[320px] flex flex-col justify-between">
          <div>
            {/* Sender identity bar */}
            <div className="flex items-center gap-3 pb-3 border-b border-stone-150">
              <div className="w-11 h-11 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xl shrink-0">
                {scenario.type === 'sms' && '💬'}
                {scenario.type === 'call' && '📞'}
                {scenario.type === 'whatsapp' && '🟢'}
                {scenario.type === 'email' && '✉️'}
                {scenario.type === 'alert' && '⚠️'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-extrabold text-stone-950 truncate">
                  {scenario.sender}
                </p>
                <p className="text-xs text-stone-500 font-medium leading-tight">
                  {scenario.senderSubtitle}
                </p>
              </div>
            </div>

            {/* Message Body Content */}
            <div className="mt-4">
              <div
                className={`rounded-2xl p-4 sm:p-5 text-base sm:text-lg font-medium leading-relaxed ${
                  scenario.type === 'alert'
                    ? 'bg-rose-50 border-2 border-rose-400 text-rose-950 animate-pulse'
                    : 'bg-stone-100 text-stone-900'
                }`}
              >
                <p>{scenario.content}</p>

                {scenario.linkText && (
                  <div className="mt-3 inline-block bg-blue-50 text-blue-800 underline font-semibold px-3 py-1.5 rounded-lg border border-blue-200 text-sm sm:text-base break-all">
                    🔗 {scenario.linkText}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prompt Question */}
          <div className="pt-2 text-center">
            <p className="text-base sm:text-lg font-bold text-stone-800">
              Que fais-tu face à ce message suspect ?
            </p>
          </div>
        </div>

        {/* 2 Big Accessible Action Buttons (>= 56px height) */}
        {feedbackState === 'idle' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
            {/* Safe Action Button (Refuse) */}
            <button
              type="button"
              onClick={handleRefuse}
              className="min-h-[58px] px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-md border-2 border-emerald-500 cursor-pointer transition-all"
            >
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <span>🛑 Stop ! Je refuse</span>
            </button>

            {/* Trap Action Button (Click / Fall) */}
            <button
              type="button"
              onClick={handleFallIntoTrap}
              className="min-h-[58px] px-4 py-3 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-md border-2 border-rose-500 cursor-pointer transition-all"
            >
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <span>👉 Je clique / Je donne</span>
            </button>
          </div>
        )}
      </div>

      {/* Feedback Panel: Success (Minou & Plume Purr) */}
      {feedbackState === 'success' && (
        <div className="bg-[#10221A] border-3 border-emerald-500/70 rounded-3xl p-5 sm:p-6 shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src={minouPlumeImg}
              alt="Minou et Plume les deux chats ronronnant"
              className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-400 shadow-sm shrink-0"
            />
            <div className="flex-1 space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full inline-block border border-emerald-800">
                ✨ Excellent réflexe de vigilance !
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-200 font-display">
                Minou & Plume ronronnent de bonheur !
              </h3>
              <p className="text-base sm:text-lg text-emerald-100 font-serif-warm leading-relaxed">
                {scenario.catsPraise}
              </p>
            </div>
          </div>

          <div className="bg-[#152B21] rounded-2xl p-4 border border-emerald-700/60 text-sm sm:text-base text-emerald-100 font-medium">
            <span className="font-bold text-emerald-300 block mb-1">🐾 Ce qu'il faut retenir :</span>
            {scenario.goldenRule}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) handleStopSpeech();
                else handleSpeech(`Bravo ! ${scenario.catsPraise}. ${scenario.goldenRule}`);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors cursor-pointer border border-emerald-600"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Arrêter la voix' : 'Écouter Minou & Plume'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="min-h-[50px] px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-extrabold text-base flex items-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer ml-auto border border-amber-400/50"
            >
              <span>Passer au piège suivant</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Feedback Panel: Trap Triggered (Paco gentle bark & protection) */}
      {feedbackState === 'trap' && (
        <div className="bg-[#261E14] border-3 border-amber-500/80 rounded-3xl p-5 sm:p-6 shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src={pacoImg}
              alt="Paco le chihuahua protecteur"
              className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-sm shrink-0"
            />
            <div className="flex-1 space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wide text-amber-200 bg-amber-950 px-2.5 py-0.5 rounded-full inline-block border border-amber-800">
                🐾 Paco dresse les oreilles !
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-amber-200 font-display">
                Waf ! Paco te protège : C'était un piège !
              </h3>
              <p className="text-base sm:text-lg text-amber-100 font-serif-warm leading-relaxed">
                {scenario.pacoWarning}
              </p>
            </div>
          </div>

          <div className="bg-[#302619] rounded-2xl p-4 border border-amber-700/60 text-sm sm:text-base text-amber-100 font-medium space-y-2">
            <p>
              <strong className="text-amber-300">Le danger :</strong> {scenario.whyDanger}
            </p>
            <p className="font-bold text-amber-200 bg-[#3D3020] p-2.5 rounded-xl border border-amber-600/50">
              💡 {scenario.goldenRule}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) handleStopSpeech();
                else handleSpeech(`Paco te protège : ${scenario.pacoWarning}. ${scenario.goldenRule}`);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-800 text-white rounded-xl text-sm font-bold hover:bg-amber-700 transition-colors cursor-pointer border border-amber-600"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Arrêter la voix' : 'Écouter le conseil de Paco'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="min-h-[50px] px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl font-extrabold text-base flex items-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer ml-auto border border-stone-600"
            >
              <span>J'ai compris, suite !</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Final Victory Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#161924] text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-4 border-amber-400 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-center -space-x-3">
              <img
                src={pacoImg}
                alt="Paco"
                className="w-20 h-20 rounded-full border-3 border-amber-400 shadow-md object-cover z-10"
              />
              <img
                src={minouPlumeImg}
                alt="Minou et Plume"
                className="w-20 h-20 rounded-full border-3 border-amber-400 shadow-md object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase text-amber-300 bg-amber-950/90 border border-amber-700/80 px-3 py-1 rounded-full">
                Diplôme d'Honneur
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Félicitations !
              </h3>
              <p className="text-lg font-serif-warm text-stone-300">
                Tu es officiellement promue <strong className="text-amber-400">Capitaine de la Brigade Anti-Arnaques</strong> !
              </p>
            </div>

            <div className="bg-[#202538] rounded-2xl p-4 border border-stone-700 text-base text-stone-200 space-y-2">
              <p>
                Avec Paco, Minou et Plume, plus aucun faux SMS de livraison ni faux appel de banquier ne pourra te duper !
              </p>
              <div className="flex items-center justify-center gap-2 text-xl font-bold text-amber-400 pt-1">
                <span>🦴</span>
                <span>{treatsCount} friandises récoltées avec succès !</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetGame}
                className="flex-1 py-3 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors border border-stone-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Rejouer les pièges</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-extrabold text-base flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors border border-amber-400"
              >
                <Award className="w-5 h-5" />
                <span>Continuer l'aventure</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
