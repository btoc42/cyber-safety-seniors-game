#!/usr/bin/env python3
import subprocess
import os

FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
OUT_DIR = "/tmp/demo_frames"
os.makedirs(OUT_DIR, exist_ok=True)

# Mascot circular icons
cmd_paco = f"convert src/assets/images/paco.jpg -resize 120x120^ -gravity center -extent 120x120 \\( +clone -threshold -1 -negate -fill white -draw 'circle 60,60 60,0' \\) -alpha off -compose copy_opacity -composite {OUT_DIR}/paco_circle.png"
subprocess.run(cmd_paco, shell=True, check=True)

cmd_cats = f"convert src/assets/images/minou_plume.jpg -resize 120x120^ -gravity center -extent 120x120 \\( +clone -threshold -1 -negate -fill white -draw 'circle 60,60 60,0' \\) -alpha off -compose copy_opacity -composite {OUT_DIR}/cats_circle.png"
subprocess.run(cmd_cats, shell=True, check=True)

cmd_shield = f"convert src/assets/images/shield.jpg -resize 120x120^ -gravity center -extent 120x120 \\( +clone -threshold -1 -negate -fill white -draw 'circle 60,60 60,0' \\) -alpha off -compose copy_opacity -composite {OUT_DIR}/shield_circle.png"
subprocess.run(cmd_shield, shell=True, check=True)

# --- FRAME 1: Titre & Présentation de la Brigade ---
f1_cmd = f"""convert -size 800x480 xc:'#0B0D13' \
  -fill '#141724' -stroke '#F59E0B' -strokewidth 3 -draw 'roundrectangle 25,20 775,460 20,20' \
  -stroke none -fill '#FBBF24' -font {FONT} -pointsize 26 -annotate +50+75 "🐾 LA BRIGADE ANTI-ARNAQUES DE MAMAN" \
  -fill '#E5E7EB' -font {FONT_REG} -pointsize 18 -annotate +50+110 "Mots Croises & Cyber-Serenite pour Seniors avec 2 chats et 1 chihuahua" \
  -fill '#1F2538' -stroke '#374151' -strokewidth 1 -draw 'roundrectangle 50,135 750,330 15,15' \
  -stroke none -fill '#F59E0B' -font {FONT} -pointsize 18 -annotate +70+170 "Ergonomie Senior Haut Contexte :" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 16 -annotate +70+205 "• Mode Nuit reposant exclusif (#0B0D13) - Contraste maximal WCAG AAA" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 16 -annotate +70+240 "• Bouton Loupe A / A+ / A++ pour agrandir l'ecran et les grilles" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 16 -annotate +70+275 "• Synthese Vocale pour lire a voix haute et sons rassurants (Web Audio)" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 16 -annotate +70+310 "• Clavier virtuel AZERTY geant avec touches tactiles bien visibles" \
  -fill '#10B981' -font {FONT} -pointsize 16 -annotate +50+370 "4 Espaces : 1. Pieges  |  2. Mots Croises  |  3. Grand Quiz  |  4. Memo Frigo" \
  {OUT_DIR}/frame1_base.png"""
subprocess.run(f1_cmd, shell=True, check=True)

# Composite mascots on frame 1
subprocess.run(f"composite -geometry +560+190 {OUT_DIR}/paco_circle.png {OUT_DIR}/frame1_base.png {OUT_DIR}/frame1_mid.png", shell=True, check=True)
subprocess.run(f"composite -geometry +630+210 {OUT_DIR}/cats_circle.png {OUT_DIR}/frame1_mid.png {OUT_DIR}/frame1.png", shell=True, check=True)

# --- FRAME 2: 1. Le flair de Paco (Chasse aux pièges) ---
f2_cmd = f"""convert -size 800x480 xc:'#0B0D13' \
  -fill '#141724' -stroke '#F59E0B' -strokewidth 3 -draw 'roundrectangle 25,20 775,460 20,20' \
  -stroke none -fill '#FBBF24' -font {FONT} -pointsize 24 -annotate +50+65 "🐕 1. LE FLAIR DE PACO (Chasse aux Pieges)" \
  -fill '#9CA3AF' -font {FONT_REG} -pointsize 16 -annotate +50+95 "5 scenarios reels sous forme de smartphones simules" \
  -fill '#1C2030' -stroke '#4B5563' -strokewidth 2 -draw 'roundrectangle 50,115 750,320 15,15' \
  -stroke none -fill '#EF4444' -font {FONT} -pointsize 16 -annotate +70+150 "SMS Suspect : Chronopost Livraison" \
  -fill '#F3F4F6' -font {FONT_REG} -pointsize 16 -annotate +70+185 "« Votre colis ne rentre pas dans la boite. Veuillez regler 1,99 €" \
  -fill '#F3F4F6' -font {FONT_REG} -pointsize 16 -annotate +70+215 "de frais de re-livraison via ce lien : bit.ly/colis-relais »" \
  -fill '#10B981' -font {FONT} -pointsize 15 -annotate +70+260 "🛑 Bouton : Je refuse et je me mefie  (Bonne decision !)" \
  -fill '#EF4444' -font {FONT} -pointsize 15 -annotate +70+290 "👉 Bouton : Je clique  (Paco aboie doucement et explique le piege)" \
  -fill '#1E293B' -stroke '#10B981' -strokewidth 2 -draw 'roundrectangle 50,340 750,440 12,12' \
  -stroke none -fill '#34D399' -font {FONT} -pointsize 16 -annotate +70+375 "🐾 La Regle d'Or de Paco :" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 15 -annotate +70+405 "La Poste ne demande JAMAIS de payer par SMS. On supprime sans cliquer." \
  {OUT_DIR}/frame2_base.png"""
subprocess.run(f2_cmd, shell=True, check=True)
subprocess.run(f"composite -geometry +610+140 {OUT_DIR}/paco_circle.png {OUT_DIR}/frame2_base.png {OUT_DIR}/frame2.png", shell=True, check=True)

# --- FRAME 3: 2. Mots Croisés de Minou (8 Grilles 100% Croisées) ---
f3_cmd = f"""convert -size 800x480 xc:'#0B0D13' \
  -fill '#141724' -stroke '#F59E0B' -strokewidth 3 -draw 'roundrectangle 25,20 775,460 20,20' \
  -stroke none -fill '#FBBF24' -font {FONT} -pointsize 24 -annotate +50+65 "🧩 2. LES MOTS CROISES DE PLUME & MINOU" \
  -fill '#9CA3AF' -font {FONT_REG} -pointsize 16 -annotate +50+95 "8 grilles thematiques 100% interconnectees (0 mot orphelin)" \
  -fill '#1F2538' -stroke '#3B82F6' -strokewidth 1 -draw 'roundrectangle 50,115 480,435 15,15' \
  -stroke none -fill '#60A5FA' -font {FONT} -pointsize 16 -annotate +70+150 "Grille 8 d'Honneur : Les Mots d'Or" \
  -fill '#F3F4F6' -font {FONT_REG} -pointsize 14 -annotate +70+185 "• SAUVEGARDE (L'assurance-vie numerique)" \
  -fill '#F3F4F6' -font {FONT_REG} -pointsize 14 -annotate +70+215 "• ANTIVIRUS (Le bouclier indispensable)" \
  -fill '#F3F4F6' -font {FONT_REG} -pointsize 14 -annotate +70+245 "• PHISHING (La menace n°1 par SMS/Email)" \
  -fill '#F3F4F6' -font {FONT_REG} -pointsize 14 -annotate +70+275 "• MOT DE PASSE (La cle unique et secrete)" \
  -fill '#F3F4F6' -font {FONT_REG} -pointsize 14 -annotate +70+305 "• RANCONGICIEL (Le chantage aux fichiers)" \
  -fill '#F3F4F6' -font {FONT_REG} -pointsize 14 -annotate +70+335 "• DOUBLE FACTEUR (Le verrou en plus)" \
  -fill '#10B981' -font {FONT} -pointsize 14 -annotate +70+375 "✓ Clavier AZERTY tactile + Indice de Minou 🐾" \
  -fill '#10B981' -font {FONT} -pointsize 14 -annotate +70+405 "✓ Bouton Vider pour rejouer a volonte" \
  -fill '#1C2030' -stroke '#4B5563' -strokewidth 1 -draw 'roundrectangle 510,115 750,435 15,15' \
  -stroke none -fill '#FBBF24' -font {FONT} -pointsize 16 -annotate +530+150 "Aides Accessibilite :" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 14 -annotate +530+190 "🔊 Vocalisation des indices" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 14 -annotate +530+230 "🔍 Loupe Zoom (A/A+/A++)" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 14 -annotate +530+270 "🐕 Verification par Paco" \
  -fill '#FBBF24' -font {FONT} -pointsize 14 -annotate +530+310 "🎶 Musique Anniversaire" \
  {OUT_DIR}/frame3_base.png"""
subprocess.run(f3_cmd, shell=True, check=True)
subprocess.run(f"composite -geometry +615+325 {OUT_DIR}/cats_circle.png {OUT_DIR}/frame3_base.png {OUT_DIR}/frame3.png", shell=True, check=True)

# --- FRAME 4: 3. Le Grand Quiz de Sérénité Numérique (NO REDUNDANCY, FUN & VISUAL) ---
f4_cmd = f"""convert -size 800x480 xc:'#0B0D13' \
  -fill '#141724' -stroke '#F59E0B' -strokewidth 3 -draw 'roundrectangle 25,20 775,460 20,20' \
  -stroke none -fill '#FBBF24' -font {FONT} -pointsize 24 -annotate +50+65 "🛡️ 3. LE GRAND QUIZ DE SERENITE (100% Inedit & Rigolo)" \
  -fill '#9CA3AF' -font {FONT_REG} -pointsize 16 -annotate +50+95 "5 enigmes visuelles sans pave de texte : humoristiques et claires !" \
  -fill '#1C2030' -stroke '#10B981' -strokewidth 1 -draw 'roundrectangle 50,115 750,265 15,15' \
  -stroke none -fill '#10B981' -font {FONT} -pointsize 16 -annotate +70+145 "🛒 Enigme 2 : Le Caddie Geant Gratuit de 800 € !" \
  -fill '#E5E7EB' -font {FONT_REG} -pointsize 15 -annotate +70+175 "« Felicitation ! Vous gagnez un Caddie de 800 € de foie gras ! Transferez vite ! »" \
  -fill '#EF4444' -font {FONT_REG} -pointsize 14 -annotate +70+205 "A) 🏃‍♀️ Je prepare mes sacs et je partage le lien au club de bridge." \
  -fill '#10B981' -font {FONT} -pointsize 14 -annotate +70+235 "B) 🗑️ Poubelle directe ! Personne ne donne 800 € de courses ! (Bravo !)" \
  -fill '#11221B' -stroke '#F59E0B' -strokewidth 2 -draw 'roundrectangle 50,285 750,435 15,15' \
  -stroke none -fill '#FBBF24' -font {FONT} -pointsize 16 -annotate +70+320 "🐕 Paco rigole : Pas de caddie magique sur Internet !" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 15 -annotate +70+355 "5 scenarios amusants : Le Mot de passe Post-it, Le Caddie 800€, Le faux PV," \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 15 -annotate +70+385 "Les coupons Tabac d'Yvette, et Le Prince Archibald et ses 4 millions !" \
  -fill '#FBBF24' -font {FONT} -pointsize 14 -annotate +70+415 "🎶 Recompense Exclusive : La musique 'Joyeux Anniversaire' au piano !" \
  {OUT_DIR}/frame4_base.png"""
subprocess.run(f4_cmd, shell=True, check=True)
subprocess.run(f"composite -geometry +615+130 {OUT_DIR}/shield_circle.png {OUT_DIR}/frame4_base.png {OUT_DIR}/frame4.png", shell=True, check=True)

# --- FRAME 5: 4. Le Mémo du Frigo & Lexique Pratique ---
f5_cmd = f"""convert -size 800x480 xc:'#0B0D13' \
  -fill '#141724' -stroke '#F59E0B' -strokewidth 3 -draw 'roundrectangle 25,20 775,460 20,20' \
  -stroke none -fill '#FBBF24' -font {FONT} -pointsize 24 -annotate +50+65 "📑 4. LE MEMO DU FRIGO & PETIT LEXIQUE" \
  -fill '#9CA3AF' -font {FONT_REG} -pointsize 16 -annotate +50+95 "A imprimer et coller avec un aimant pour l'avoir sous les yeux" \
  -fill '#1F2538' -stroke '#4B5563' -strokewidth 1 -draw 'roundrectangle 50,115 750,270 15,15' \
  -stroke none -fill '#FBBF24' -font {FONT} -pointsize 16 -annotate +70+150 "Les 3 Regles d'Or de Paco :" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 15 -annotate +70+185 "1. Ne jamais cliquer sur un lien recu par SMS ou e-mail imprevu" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 15 -annotate +70+215 "2. La banque ou la police ne demande JAMAIS de mot de passe ou code SMS" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 15 -annotate +70+245 "3. En cas de doute : j'appelle directement mes proches au telephone" \
  -fill '#1C2030' -stroke '#10B981' -strokewidth 1 -draw 'roundrectangle 50,290 750,435 15,15' \
  -stroke none -fill '#34D399' -font {FONT} -pointsize 16 -annotate +70+325 "📋 Nouveau Lexique des 10 Mots-Cles integre :" \
  -fill '#D1D5DB' -font {FONT_REG} -pointsize 14 -annotate +70+360 "Phishing, Mot de passe, Antivirus, Rancongiciel, Mise a jour, Spam, Pirate, 2FA..." \
  -fill '#FBBF24' -font {FONT} -pointsize 14 -annotate +70+395 "Numeros d'urgence : Info Escroqueries 0 805 805 817  |  Signalement 33700" \
  -fill '#60A5FA' -font {FONT} -pointsize 14 -annotate +70+420 "🖨️ Bouton d'impression propre sur papier blanc A4" \
  {OUT_DIR}/frame5_base.png"""
subprocess.run(f5_cmd, shell=True, check=True)
subprocess.run(f"composite -geometry +615+130 {OUT_DIR}/paco_circle.png {OUT_DIR}/frame5_base.png {OUT_DIR}/frame5.png", shell=True, check=True)

# Build animated GIF with 3.2 seconds per frame
gif_cmd = f"convert -delay 320 -loop 0 {OUT_DIR}/frame1.png {OUT_DIR}/frame2.png {OUT_DIR}/frame3.png {OUT_DIR}/frame4.png {OUT_DIR}/frame5.png demo.gif"
subprocess.run(gif_cmd, shell=True, check=True)

# Also copy to public/demo.gif
subprocess.run("cp demo.gif public/demo.gif", shell=True, check=True)
print("demo.gif successfully updated!")
