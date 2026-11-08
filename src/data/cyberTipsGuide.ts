import { CyberTip } from '../types';

export const CYBER_GUIDE_TIPS: CyberTip[] = [
  {
    id: 'faux_sms_colis',
    title: 'Le Faux SMS de Colis ou de Livraison',
    category: 'phishing_sms',
    summary: 'Un message vous annonce qu’un colis est retenu ou qu’il manque une adresse ou 1,99 € de frais.',
    scamStory: 'Vous recevez un SMS disant : "Votre colis numéro 4892 est bloqué en centre de tri. Merci de confirmer votre adresse et régler 1,80€ sur chronopost-livraison-info.com". En réalité, vous n’attendiez pas de paquet, ou les escrocs tentent leur chance au hasard !',
    dangerSigns: [
      'Un lien internet étrange (qui ne finit pas par laposte.fr ou chronopost.fr)',
      'Une demande de payer une petite somme (pour vous faire sortir votre carte bancaire)',
      'Un sentiment d’urgence injustifié ("Dernier rappel avant retour à l’expéditeur")'
    ],
    goldenRule: 'La règle d’or de Maman : La Poste ne demande JAMAIS de payer des frais par SMS. On ne clique pas sur le lien, on supprime le SMS !'
  },
  {
    id: 'faux_banquier',
    title: 'Le Faux Conseiller Bancaire au Téléphone',
    category: 'faux_banquier',
    summary: 'Une personne très polie appelle en prétendant être du service des fraudes de votre banque.',
    scamStory: 'Un interlocuteur très courtois vous appelle : "Bonjour Madame, je suis du service sécurité de votre banque. Des pirates essaient de débiter 800€ sur votre compte. Pour annuler, lisez-moi le code reçu par SMS ou validez sur votre téléphone". Si vous le faites, c’est lui qui valide le virement !',
    dangerSigns: [
      'Il vous met la pression en disant qu’il faut agir tout de suite',
      'Il vous demande de lui lire un code reçu par SMS ou de valider une notification sur votre mobile',
      'Le numéro qui s’affiche ressemble à celui de votre agence (les escrocs savent falsifier le numéro affiché)'
    ],
    goldenRule: 'La règle d’or de Maman : Votre vrai banquier ne vous demandera JAMAIS un code reçu par SMS. Vous raccrochez immédiatement et vous appelez vous-même votre agence habituelle.'
  },
  {
    id: 'faux_proche',
    title: 'L’Arnaque au Faux Enfant : "Coucou Maman"',
    category: 'faux_proche',
    summary: 'Un message WhatsApp ou SMS prétendant venir de votre fils ou fille disant avoir cassé son téléphone.',
    scamStory: 'Message reçu : "Coucou maman, j’ai fait tomber mon téléphone dans l’eau, c’est mon nouveau numéro temporaire. Peux-tu m’enregistrer et me dépanner de 400€ pour payer une facture urgente ?". C’est un robot escroc qui envoie ce message à des milliers de mamans.',
    dangerSigns: [
      'Le numéro est inconnu et vous demande d’enregistrer le nouveau numéro',
      'Il ne vous appelle pas de vive voix et refuse le coup de fil prétextant un micro cassé',
      'Une demande d’argent ou d’achat de tickets prépayés (PCS, Transcash)'
    ],
    goldenRule: 'La règle d’or de Maman : Avant d’envoyer le moindre euro, appelez toujours votre enfant sur son ANCIEN numéro habituel pour vérifier de vive voix !'
  },
  {
    id: 'mots_de_passe',
    title: 'Le Mot de Passe en Or (Facile et Solide)',
    category: 'mots_de_passe',
    summary: 'Créer un mot de passe facile à retenir pour vous, mais impossible à deviner pour les voleurs.',
    scamStory: 'Les pirates testent des listes de mots courants comme "123456", "Maman123" ou la date de naissance des petits-enfants. En utilisant une simple petite phrase que vous aimez, personne ne pourra le forcer.',
    dangerSigns: [
      'Utiliser le même mot de passe partout (messagerie, banque, achats)',
      'Noter ses codes bancaires sur un post-it collé sur l’écran de l’ordinateur',
      'Donner son mot de passe à quelqu’un qui le demande par courriel'
    ],
    goldenRule: 'La règle d’or de Maman : Utilisez la méthode de la phrase secrète ! Exemple : "JadoreLeTheAuxPommesPourToujours!". C’est long, sécurisé et amusant à retenir.'
  },
  {
    id: 'faux_impots_ameli',
    title: 'Le Faux Remboursement des Impôts ou de la Sécurité Sociale',
    category: 'faux_impots',
    summary: 'Un courriel vous promet un remboursement inattendu de 250 € pour vous appâter.',
    scamStory: 'Un courriel avec le logo officiel des Impôts ou de l’Assurance Maladie Ameli : "Vous avez un trop-perçu de 312 euros en votre faveur. Cliquez ici pour mettre à jour votre carte bancaire et recevoir l’argent". En remplissant le formulaire, c’est l’escroc qui vide votre compte !',
    dangerSigns: [
      'L’adresse de l’expéditeur est bizarre (ex: support@impots-remboursement-fr.xyz au lieu de @dgfip.finances.gouv.fr)',
      'On vous demande votre numéro de carte bancaire pour vous VIRER de l’argent (or pour un virement, on n’a besoin que d’un RIB, jamais d’une carte bancaire !)'
    ],
    goldenRule: 'La règle d’or de Maman : Pour recevoir de l’argent, on ne donne jamais ses 16 chiffres de carte bancaire ! Allez toujours vous-même sur ameli.fr ou impots.gouv.fr en tapant l’adresse.'
  },
  {
    id: 'ecran_bloque',
    title: 'L’Alerte Écran Bloqué et le Faux Dépannage Informatique',
    category: 'ecran_bloque',
    summary: 'Une sirène retentit sur l’ordinateur avec un message disant "Virus détecté, appelez ce numéro".',
    scamStory: 'Pendant que vous lisez une recette, l’écran devient rouge avec une sonnerie stridente et un texte "Votre ordinateur est infecté par un cheval de Troie ! N’éteignez pas, appelez le support technique au 09 70...". Si vous appelez, un faux technicien prend la main à distance et vous facture 300€ !',
    dangerSigns: [
      'Une sonnerie qui fait peur et un écran figé en plein écran',
      'Un numéro de téléphone affiché qui insiste pour que vous appeliez d’urgence',
      'Microsoft ou Windows n’affichent JAMAIS de numéro de téléphone à appeler !'
    ],
    goldenRule: 'La règle d’or de Maman : Pas de panique ! L’ordinateur n’est pas cassé. Il suffit d’appuyer longuement sur le bouton d’allumage pour éteindre l’appareil, puis de le rallumer tranquillement.'
  },
  {
    id: 'faux_achats',
    title: 'Le Robot Ménager Gagné à 1 Euro (Les Faux Concours)',
    category: 'faux_achats',
    summary: 'Une annonce qui vous annonce que vous avez gagné un cadeau magnifique pour 1 €.',
    scamStory: 'Sur Facebook ou par courriel : "Félicitations, vous avez été tirée au sort pour recevoir un aspirateur sans fil ou un robot pâtissier pour seulement 1€95 de frais d’envoi". En réalité, vous vous abonnez sans le savoir à un prélèvement mensuel de 69€ !',
    dangerSigns: [
      'Un cadeau très cher offert pour presque rien',
      'Un faux compte à rebours ("Plus que 3 minutes pour en profiter")',
      'Des faux commentaires de personnes disant "Merci, je l’ai bien reçu !"'
    ],
    goldenRule: 'La règle d’or de Maman : Sur Internet comme dans la rue, les cadeaux gratuits de grande valeur n’existent pas. Quand c’est gratuit ou à 1€, le piège n’est jamais loin.'
  },
  {
    id: 'reflexe_famille',
    title: 'Le Réflexe Sérénité : Demander Conseil à ses Proches',
    category: 'general',
    summary: 'Le meilleur antivirus au monde, c’est de prendre son temps et d’appeler son fils ou sa fille.',
    scamStory: 'Les escrocs jouent toujours sur la précipitation. Ils veulent que vous réagissiez dans la seconde. Dès que vous posez votre téléphone pour prendre une tasse de thé et demander l’avis de votre enfant, l’arnaque tombe à l’eau à 100% !',
    dangerSigns: [
      'Un message qui commence par "Très urgent", "Dernier avis avant poursuites" ou "Action immédiate"',
      'Une demande qui vous semble inhabituelle ou suspecte'
    ],
    goldenRule: 'La règle d’or de Maman : Rien n’est jamais si urgent sur Internet. Prenez une tasse de thé, respirez, et passez un coup de fil à la famille pour vérifier ensemble !'
  }
];
