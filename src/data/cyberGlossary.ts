/**
 * Official Senior Cybersecurity Glossary & Crossword Clues Reference
 * Tailored for seniors: simple, non-blaming, clear and encouraging.
 */

export interface CyberGlossaryItem {
  id: string;
  keyword: string;
  alternateName?: string;
  definition: string; // The exact clue for crossword puzzles
  notionKey: string; // "La menace n°1", "Le bouclier", etc.
  pedagogy: string; // Core pedagogical takeaway
  goldenRule: string; // Practical daily rule
  category: 'menace' | 'protection' | 'cle_secrete' | 'reflexe';
  icon: string;
}

export const CYBER_GLOSSARY_ITEMS: CyberGlossaryItem[] = [
  {
    id: 'phishing',
    keyword: 'PHISHING',
    alternateName: 'Hameçonnage',
    definition: 'Faux message (e-mail ou SMS) imitant une grande enseigne pour vous voler vos mots de passe ou coordonnées bancaires.',
    notionKey: 'La menace n°1',
    pedagogy: 'Apprendre à ne jamais cliquer sur un lien suspect ou donner ses identifiants personnels.',
    goldenRule: 'Dans le doute, on supprime le SMS ou l’e-mail sans jamais cliquer sur le lien bleu souligné.',
    category: 'menace',
    icon: '🎣'
  },
  {
    id: 'mot_de_passe',
    keyword: 'MOT DE PASSE',
    alternateName: 'Code secret / Séquence secrète',
    definition: 'Séquence secrète de caractères protégeant l’accès à un compte ou un appareil.',
    notionKey: 'La clé',
    pedagogy: 'Doit être longue, facile à retenir pour vous (une phrase) et unique pour chaque site (jamais le même partout).',
    goldenRule: 'Utilisez une petite phrase que vous aimez : personne ne pourra la deviner, et vous ne l’oublierez jamais !',
    category: 'cle_secrete',
    icon: '🔑'
  },
  {
    id: 'antivirus',
    keyword: 'ANTIVIRUS',
    alternateName: 'Bouclier de sécurité',
    definition: 'Logiciel indispensable installé sur l’ordinateur ou la tablette pour bloquer les programmes malveillants.',
    notionKey: 'Le bouclier',
    pedagogy: 'Assure une surveillance continue et bienveillante contre les menaces numériques.',
    goldenRule: 'Laissez votre antivirus et votre tablette faire leur travail de surveillance en toute tranquillité.',
    category: 'protection',
    icon: '🛡️'
  },
  {
    id: 'rancongiciel',
    keyword: 'RANÇONGICIEL',
    alternateName: 'Ransomware / Chantage aux photos',
    definition: 'Logiciel malveillant qui bloque l’accès à vos photos et documents en exigeant de l’argent pour les débloquer.',
    notionKey: 'Le piège financier',
    pedagogy: 'Ne jamais payer la rançon et faire des sauvegardes régulières de ses précieux souvenirs.',
    goldenRule: 'Ne versez jamais un centime aux pirates : avec des sauvegardes régulières, vos souvenirs restent protégés quoi qu’il arrive.',
    category: 'menace',
    icon: '💰'
  },
  {
    id: 'mise_a_jour',
    keyword: 'MISE À JOUR',
    alternateName: 'Actualisation de sécurité',
    definition: 'Action d’installer les dernières versions des logiciels pour combler les failles de sécurité.',
    notionKey: 'La protection',
    pedagogy: 'Ne pas repousser ces installations d’amélioration proposées gentiment par votre appareil.',
    goldenRule: 'Quand votre tablette vous propose une mise à jour, branchez-la et laissez-la s’installer : elle se renforce toute seule.',
    category: 'protection',
    icon: '🔄'
  },
  {
    id: 'spam',
    keyword: 'SPAM',
    alternateName: 'Pourriel / Courrier indésirable',
    definition: 'Courrier électronique indésirable, souvent publicitaire ou malveillant, reçu en grande quantité.',
    notionKey: 'Le tri',
    pedagogy: 'Ne jamais ouvrir les pièces jointes ni cliquer sur les liens de ces courriers non sollicités.',
    goldenRule: 'Traitez le spam comme les prospectus publicitaires de votre boîte aux lettres : direction la corbeille directement !',
    category: 'menace',
    icon: '📬'
  },
  {
    id: 'pirate',
    keyword: 'PIRATE',
    alternateName: 'Hacker / Escroc informatique',
    definition: 'Personne malintentionnée qui tente de s’introduire dans vos appareils informatiques.',
    notionKey: 'L’interlocuteur invisible',
    pedagogy: 'Ne rien céder à la panique en cas de contact suspect : poser l’appareil et appeler un proche.',
    goldenRule: 'Ne paniquez jamais : le pirate n’a aucun pouvoir sur vous tant que vous ne lui donnez rien.',
    category: 'menace',
    icon: '🏴‍☠️'
  },
  {
    id: 'escroquerie',
    keyword: 'ESCROQUERIE',
    alternateName: 'Arnaque / Tromperie en ligne',
    definition: 'Tromperie en ligne, comme le faux support technique qui prétend que votre ordinateur est infecté.',
    notionKey: 'La vigilance',
    pedagogy: 'Aucun organisme officiel ni dépanneur sérieux ne réclame d’argent ou de mot de passe par téléphone ou SMS.',
    goldenRule: 'Face à un appel alarmiste ou une fausse alarme stridente, raccrochez ou éteignez simplement l’écran.',
    category: 'menace',
    icon: '⚠️'
  },
  {
    id: 'sauvegarde',
    keyword: 'SAUVEGARDE',
    alternateName: 'Copie de sécurité / Le Nuage (Cloud)',
    definition: 'Copie de vos fichiers importants (photos, documents) sur un autre support ou dans le "nuage" (cloud).',
    notionKey: 'L’assurance-vie numérique',
    pedagogy: 'Permet de ne rien perdre de précieux (photos de famille, courriers) en cas de panne ou de piratage.',
    goldenRule: 'Faites des copies de vos photos de famille sur une clé USB ou avec l’aide de vos enfants.',
    category: 'protection',
    icon: '💾'
  },
  {
    id: 'double_facteur',
    keyword: 'DOUBLE FACTEUR',
    alternateName: '2FA / Vérification en deux étapes',
    definition: 'Sécurité supplémentaire demandant un code envoyé par SMS ou application pour valider une connexion.',
    notionKey: 'Le verrou en plus',
    pedagogy: 'Rend le piratage de compte beaucoup plus difficile en ajoutant une deuxième serrure.',
    goldenRule: 'Ce code à 6 chiffres est le double de vos clés : gardez-le précieusement et ne le dictez JAMAIS à personne au téléphone !',
    category: 'cle_secrete',
    icon: '🔐'
  }
];
