import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CROSSWORD_PUZZLES, getDailyPuzzle } from './data/puzzles';
import { CrosswordPuzzle, CrosswordWord, TextSize, CyberTip } from './types';
import { Header, ActiveTab } from './components/Header';
import { CrosswordGrid } from './components/CrosswordGrid';
import { CluesPanel } from './components/CluesPanel';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { CyberTipModal } from './components/CyberTipModal';
import { CarnetAstuces } from './components/CarnetAstuces';
import { GridLibrary } from './components/GridLibrary';
import { BirthdayModal } from './components/BirthdayModal';
import { VictoryModal } from './components/VictoryModal';
import { PrintView } from './components/PrintView';
import { PacoScamHunt } from './components/PacoScamHunt';
import { QuizSerenite } from './components/QuizSerenite';
import { FridgeMemo } from './components/FridgeMemo';
import { soundEffects, speakFrenchClue, stopSpeaking } from './utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Keyboard, BookOpen, Heart, RotateCcw, ArrowRight } from 'lucide-react';
import { minouPlumeImg, pacoImg } from './assets';

const STORAGE_KEY_GRIDS = 'brigade_maman_user_grids_v5';
const STORAGE_KEY_COMPLETED = 'brigade_maman_completed_v5';
const STORAGE_KEY_NAME = 'maman_crossword_name_v1';
const STORAGE_KEY_SETTINGS = 'maman_crossword_settings_v1';

// Normalizes any French input character to unaccented uppercase A-Z
function normalizeFrenchLetter(raw: string): string {
  if (!raw) return '';
  const normalized = raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/œ/gi, 'oe')
    .replace(/æ/gi, 'ae')
    .toUpperCase();
  const match = normalized.match(/[A-Z]/);
  return match ? match[0] : '';
}

// Guarantees a 2D array matching the exact rows and cols of the puzzle, preserving letters
function normalizeGrid(
  saved: string[][] | undefined,
  rows: number,
  cols: number
): string[][] {
  const grid: string[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: string[] = [];
    for (let c = 0; c < cols; c++) {
      row.push(saved?.[r]?.[c] || '');
    }
    grid.push(row);
  }
  return grid;
}

export default function App() {
  // 1. Settings & Profile
  const [recipientName, setRecipientName] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_NAME) || 'Maman';
  });

  const [textSize, setTextSize] = useState<TextSize>('large'); // default to large for senior
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState<boolean>(true);

  // 2. Navigation State (Defaults to Mini-Jeu 1: Le flair de Paco)
  const [currentTab, setCurrentTab] = useState<ActiveTab>('hunt');
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  // 3. Modals
  const [showBirthdayModal, setShowBirthdayModal] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [activeCyberTip, setActiveCyberTip] = useState<CyberTip | null>(null);

  // 4. Speech State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // 5. Active Puzzle & Progress
  const [currentPuzzle, setCurrentPuzzle] = useState<CrosswordPuzzle>(() => {
    // Defaults to Puzzle 1 (the special 80th birthday puzzle)
    return CROSSWORD_PUZZLES[0] || getDailyPuzzle();
  });

  const [completedPuzzleIds, setCompletedPuzzleIds] = useState<string[]>(() => {
    try {
      // Clear legacy storage keys to avoid stale or corrupt puzzle letters from earlier versions
      localStorage.removeItem('brigade_mamie_user_grids_v2');
      localStorage.removeItem('maman_crossword_user_grids_v1');
      localStorage.removeItem('brigade_mamie_completed_v2');
      localStorage.removeItem('maman_crossword_completed_v1');
      localStorage.removeItem('brigade_maman_user_grids_v4');

      const savedV5 = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (savedV5) return JSON.parse(savedV5);
      return [];
    } catch {
      return [];
    }
  });

  // User grids map: { [puzzleId]: string[][] }
  // Every grid starts 100% virgin of letters unless actively played
  const [userGrids, setUserGrids] = useState<Record<string, string[][]>>(() => {
    try {
      const savedV5 = localStorage.getItem(STORAGE_KEY_GRIDS);
      if (savedV5) return JSON.parse(savedV5);
      return {};
    } catch {
      return {};
    }
  });

  // Current puzzle's grid, strictly guaranteed to have currentPuzzle.rows x currentPuzzle.cols
  const currentGrid = useMemo(() => {
    return normalizeGrid(
      userGrids[currentPuzzle.id],
      currentPuzzle.rows,
      currentPuzzle.cols
    );
  }, [userGrids, currentPuzzle]);

  // Selected cell & direction
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(() => {
    // Select first letter of first word
    const firstWord = currentPuzzle.words[0];
    if (firstWord) {
      return { row: firstWord.startRow, col: firstWord.startCol };
    }
    return null;
  });

  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [verifiedState, setVerifiedState] = useState<'idle' | 'checked'>('idle');

  // Save grids to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GRIDS, JSON.stringify(userGrids));
    } catch {
      // Storage full
    }
  }, [userGrids]);

  // Save completed puzzles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedPuzzleIds));
    } catch {
      // Storage full
    }
  }, [completedPuzzleIds]);

  // Save name
  const handleUpdateRecipientName = (name: string) => {
    setRecipientName(name);
    localStorage.setItem(STORAGE_KEY_NAME, name);
  };

  // Find the active word corresponding to selected cell and direction
  const activeWord = useMemo<CrosswordWord | null>(() => {
    if (!selectedCell) return currentPuzzle.words[0] || null;

    // Look for word in current direction passing through selectedCell
    const primary = currentPuzzle.words.find((w) => {
      if (w.direction !== direction) return false;
      if (direction === 'across') {
        return (
          w.startRow === selectedCell.row &&
          selectedCell.col >= w.startCol &&
          selectedCell.col < w.startCol + w.answer.length
        );
      } else {
        return (
          w.startCol === selectedCell.col &&
          selectedCell.row >= w.startRow &&
          selectedCell.row < w.startRow + w.answer.length
        );
      }
    });

    if (primary) return primary;

    // Fallback: look for other direction word passing through cell
    const otherDir = direction === 'across' ? 'down' : 'across';
    const secondary = currentPuzzle.words.find((w) => {
      if (w.direction !== otherDir) return false;
      if (otherDir === 'across') {
        return (
          w.startRow === selectedCell.row &&
          selectedCell.col >= w.startCol &&
          selectedCell.col < w.startCol + w.answer.length
        );
      } else {
        return (
          w.startCol === selectedCell.col &&
          selectedCell.row >= w.startRow &&
          selectedCell.row < w.startRow + w.answer.length
        );
      }
    });

    return secondary || currentPuzzle.words[0] || null;
  }, [selectedCell, direction, currentPuzzle]);

  // Check if puzzle is fully solved
  const checkVictory = useCallback(
    (grid: string[][]) => {
      for (const w of currentPuzzle.words) {
        for (let i = 0; i < w.answer.length; i++) {
          const r = w.direction === 'across' ? w.startRow : w.startRow + i;
          const c = w.direction === 'across' ? w.startCol + i : w.startCol;
          const userVal = grid[r]?.[c] || '';
          if (userVal.toUpperCase() !== w.answer[i].toUpperCase()) {
            return false;
          }
        }
      }
      return true;
    },
    [currentPuzzle]
  );

  // Set letter at cell
  const setLetterAt = useCallback(
    (row: number, col: number, char: string) => {
      const cleanChar = normalizeFrenchLetter(char);

      setUserGrids((prev) => {
        // ALWAYS build a guaranteed puzzle.rows x puzzle.cols grid
        const base = normalizeGrid(
          prev[currentPuzzle.id],
          currentPuzzle.rows,
          currentPuzzle.cols
        );

        if (
          row >= 0 &&
          row < currentPuzzle.rows &&
          col >= 0 &&
          col < currentPuzzle.cols
        ) {
          base[row][col] = cleanChar;
        }

        // Check if full puzzle completed
        if (cleanChar && checkVictory(base)) {
          if (!completedPuzzleIds.includes(currentPuzzle.id)) {
            setCompletedPuzzleIds((p) => [...p, currentPuzzle.id]);
          }
          soundEffects.playVictory(soundEnabled);
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 }
          });
          setShowVictoryModal(true);
        }

        return {
          ...prev,
          [currentPuzzle.id]: base
        };
      });

      // Reset verification state when typing
      if (verifiedState === 'checked') {
        setVerifiedState('idle');
      }
    },
    [currentPuzzle, checkVictory, completedPuzzleIds, soundEnabled, verifiedState]
  );

  // Move to next cell in current word
  const advanceCursor = useCallback(() => {
    if (!selectedCell || !activeWord) return;

    if (activeWord.direction === 'across') {
      const nextCol = selectedCell.col + 1;
      if (nextCol < activeWord.startCol + activeWord.answer.length) {
        setSelectedCell({ row: selectedCell.row, col: nextCol });
      }
    } else {
      const nextRow = selectedCell.row + 1;
      if (nextRow < activeWord.startRow + activeWord.answer.length) {
        setSelectedCell({ row: nextRow, col: selectedCell.col });
      }
    }
  }, [selectedCell, activeWord]);

  // Move to previous cell
  const retreatCursor = useCallback(() => {
    if (!selectedCell || !activeWord) return;

    if (activeWord.direction === 'across') {
      const prevCol = selectedCell.col - 1;
      if (prevCol >= activeWord.startCol) {
        setSelectedCell({ row: selectedCell.row, col: prevCol });
      }
    } else {
      const prevRow = selectedCell.row - 1;
      if (prevRow >= activeWord.startRow) {
        setSelectedCell({ row: prevRow, col: selectedCell.col });
      }
    }
  }, [selectedCell, activeWord]);

  // Move to next word in puzzle
  const handleNextWord = useCallback(() => {
    if (!activeWord) return;
    const currentIndex = currentPuzzle.words.findIndex((w) => w.id === activeWord.id);
    const nextIndex = (currentIndex + 1) % currentPuzzle.words.length;
    const nextWord = currentPuzzle.words[nextIndex];
    if (nextWord) {
      setDirection(nextWord.direction);
      setSelectedCell({ row: nextWord.startRow, col: nextWord.startCol });
    }
  }, [activeWord, currentPuzzle]);

  // Handle cell click with smart direction detection
  const handleCellClick = (r: number, c: number) => {
    soundEffects.playTap(soundEnabled);

    const acrossWord = currentPuzzle.words.find(
      (w) =>
        w.direction === 'across' &&
        w.startRow === r &&
        c >= w.startCol &&
        c < w.startCol + w.answer.length
    );
    const downWord = currentPuzzle.words.find(
      (w) =>
        w.direction === 'down' &&
        w.startCol === c &&
        r >= w.startRow &&
        r < w.startRow + w.answer.length
    );

    if (selectedCell?.row === r && selectedCell?.col === c) {
      // Toggle direction if clicked same cell and both directions exist
      if (acrossWord && downWord) {
        setDirection((prev) => (prev === 'across' ? 'down' : 'across'));
      }
    } else {
      setSelectedCell({ row: r, col: c });
      // If cell only belongs to one word, auto-switch direction to that word!
      if (acrossWord && !downWord) {
        setDirection('across');
      } else if (downWord && !acrossWord) {
        setDirection('down');
      }
    }
  };

  // Keyboard handler (A-Z, Backspace, Arrows)
  const handleKeyPress = useCallback(
    (letter: string) => {
      if (!selectedCell) return;
      soundEffects.playTap(soundEnabled);
      setLetterAt(selectedCell.row, selectedCell.col, letter);
      advanceCursor();
    },
    [selectedCell, soundEnabled, setLetterAt, advanceCursor]
  );

  const handleBackspace = useCallback(() => {
    if (!selectedCell) return;
    soundEffects.playTap(soundEnabled);
    const currentVal = currentGrid[selectedCell.row]?.[selectedCell.col] || '';

    if (currentVal) {
      setLetterAt(selectedCell.row, selectedCell.col, '');
    } else if (activeWord) {
      // If cell is already empty, move back 1 cell and clear it
      const prevR =
        activeWord.direction === 'down' ? selectedCell.row - 1 : selectedCell.row;
      const prevC =
        activeWord.direction === 'across' ? selectedCell.col - 1 : selectedCell.col;
      if (
        (activeWord.direction === 'across' && prevC >= activeWord.startCol) ||
        (activeWord.direction === 'down' && prevR >= activeWord.startRow)
      ) {
        setSelectedCell({ row: prevR, col: prevC });
        setLetterAt(prevR, prevC, '');
      }
    }
  }, [selectedCell, soundEnabled, currentGrid, setLetterAt, activeWord]);

  // Global physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside text fields (except our hidden cell input)
      if (
        (e.target instanceof HTMLInputElement && !e.target.getAttribute('aria-label')?.includes('Saisir une lettre')) ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleBackspace();
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setDirection((prev) => (prev === 'across' ? 'down' : 'across'));
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        handleNextWord();
        return;
      }

      if (selectedCell) {
        if (e.key === 'ArrowUp' && selectedCell.row > 0) {
          e.preventDefault();
          setSelectedCell({ row: selectedCell.row - 1, col: selectedCell.col });
          return;
        } else if (e.key === 'ArrowDown' && selectedCell.row < currentPuzzle.rows - 1) {
          e.preventDefault();
          setSelectedCell({ row: selectedCell.row + 1, col: selectedCell.col });
          return;
        } else if (e.key === 'ArrowLeft' && selectedCell.col > 0) {
          e.preventDefault();
          setSelectedCell({ row: selectedCell.row, col: selectedCell.col - 1 });
          return;
        } else if (e.key === 'ArrowRight' && selectedCell.col < currentPuzzle.cols - 1) {
          e.preventDefault();
          setSelectedCell({ row: selectedCell.row, col: selectedCell.col + 1 });
          return;
        }
      }

      // Single character input (including AZERTY keys like é, è, ê, à, ç, etc.)
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const norm = normalizeFrenchLetter(e.key);
        if (norm) {
          e.preventDefault();
          handleKeyPress(norm);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, handleBackspace, handleNextWord, selectedCell, currentPuzzle]);

  // Clue Speech helper
  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    speakFrenchClue(text, 0.85);

    // Watch for end of speech
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const checkInterval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsSpeaking(false);
          clearInterval(checkInterval);
        }
      }, 300);
    }
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  // Senior Hints: Reveal Letter
  const handleRevealLetter = () => {
    if (!selectedCell) return;
    // Find expected letter
    for (const w of currentPuzzle.words) {
      for (let i = 0; i < w.answer.length; i++) {
        const r = w.direction === 'across' ? w.startRow : w.startRow + i;
        const c = w.direction === 'across' ? w.startCol + i : w.startCol;
        if (r === selectedCell.row && c === selectedCell.col) {
          setLetterAt(r, c, w.answer[i]);
          advanceCursor();
          return;
        }
      }
    }
  };

  // Senior Hints: Reveal Word
  const handleRevealWord = () => {
    if (!activeWord) return;
    for (let i = 0; i < activeWord.answer.length; i++) {
      const r = activeWord.direction === 'across' ? activeWord.startRow : activeWord.startRow + i;
      const c = activeWord.direction === 'across' ? activeWord.startCol + i : activeWord.startCol;
      setLetterAt(r, c, activeWord.answer[i]);
    }
    soundEffects.playSuccess(soundEnabled);
  };

  // Verification button
  const handleVerifyGrid = () => {
    setVerifiedState('checked');
    soundEffects.playSuccess(soundEnabled);
  };

  // Dynamic root font scaling for senior accessibility (Loupe A / A+ / A++)
  useEffect(() => {
    const rootEl = document.documentElement;
    if (textSize === 'extralarge') {
      rootEl.style.fontSize = '21px';
    } else if (textSize === 'large') {
      rootEl.style.fontSize = '18.5px';
    } else {
      rootEl.style.fontSize = '16px';
    }
  }, [textSize]);

  // Clear / Reset Grid completely so all letters vanish and user can restart fresh
  const handleClearGrid = (skipConfirm = false) => {
    if (skipConfirm || window.confirm('Effacer toutes les lettres pour recommencer cette grille à zéro ?')) {
      setUserGrids((prev) => ({
        ...prev,
        [currentPuzzle.id]: Array.from({ length: currentPuzzle.rows }, () =>
          Array.from({ length: currentPuzzle.cols }, () => '')
        )
      }));
      setCompletedPuzzleIds((prev) => prev.filter((id) => id !== currentPuzzle.id));
      setVerifiedState('idle');
      setShowVictoryModal(false);
      const firstW = currentPuzzle.words[0];
      if (firstW) {
        setDirection(firstW.direction);
        setSelectedCell({ row: firstW.startRow, col: firstW.startCol });
      }
      soundEffects.playTap(soundEnabled);
    }
  };

  // Select a word from the clues list
  const handleSelectWord = (word: CrosswordWord) => {
    soundEffects.playTap(soundEnabled);
    setDirection(word.direction);
    setSelectedCell({ row: word.startRow, col: word.startCol });
  };

  // Switch to next puzzle
  const handleNextPuzzle = () => {
    const currentIndex = CROSSWORD_PUZZLES.findIndex((p) => p.id === currentPuzzle.id);
    const nextIndex = (currentIndex + 1) % CROSSWORD_PUZZLES.length;
    const nextP = CROSSWORD_PUZZLES[nextIndex];
    if (nextP) {
      setCurrentPuzzle(nextP);
      // Guarantee newly appeared puzzle is virgin of letters unless user previously completed it
      if (!completedPuzzleIds.includes(nextP.id)) {
        setUserGrids((prev) => ({
          ...prev,
          [nextP.id]: Array.from({ length: nextP.rows }, () =>
            Array.from({ length: nextP.cols }, () => '')
          )
        }));
      }
      setVerifiedState('idle');
      const firstW = nextP.words[0];
      if (firstW) {
        setDirection(firstW.direction);
        setSelectedCell({ row: firstW.startRow, col: firstW.startCol });
      }
    }
    setShowVictoryModal(false);
  };

  // If Print View is requested
  if (isPrinting) {
    return (
      <PrintView
        puzzle={currentPuzzle}
        recipientName={recipientName}
        onClose={() => setIsPrinting(false)}
      />
    );
  }

  const zoomFactor =
    textSize === 'extralarge'
      ? 1.15
      : textSize === 'large'
      ? 1.08
      : 1.0;

  return (
    <div
      style={{ zoom: zoomFactor }}
      className="min-h-screen flex flex-col bg-[#0B0D13] text-stone-100 transition-all"
    >
      {/* Top Bar Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        textSize={textSize}
        setTextSize={setTextSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenBirthday={() => setShowBirthdayModal(true)}
        onPrint={() => setIsPrinting(true)}
        recipientName={recipientName}
      />

      {/* Main Content Area based on currentTab */}
      <main className="flex-1 pb-16">
        {/* TAB 1: Le flair de Paco (Chasse aux pièges du quotidien) */}
        {currentTab === 'hunt' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <PacoScamHunt
              soundEnabled={soundEnabled}
              highContrast={highContrast}
            />
          </div>
        )}

        {/* TAB: Le Grand Quiz de Sérénité Numérique : Déjouer les Pièges du Quotidien */}
        {currentTab === 'quiz' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <QuizSerenite
              onBackToGame={() => setCurrentTab('crossword')}
              highContrast={highContrast}
              onPrint={() => window.print()}
            />
          </div>
        )}

        {/* TAB 4: Le Mémo du Frigo (Règles d'or & Numéros d'urgence A4) */}
        {currentTab === 'fridge' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <FridgeMemo highContrast={highContrast} />
          </div>
        )}

        {/* Library of 7 daily grids */}
        {currentTab === 'library' && (
          <GridLibrary
            currentPuzzleId={currentPuzzle.id}
            onSelectPuzzle={(p) => {
              setCurrentPuzzle(p);
              if (!completedPuzzleIds.includes(p.id) && !userGrids[p.id]) {
                setUserGrids((prev) => ({
                  ...prev,
                  [p.id]: Array.from({ length: p.rows }, () =>
                    Array.from({ length: p.cols }, () => '')
                  )
                }));
              }
              setVerifiedState('idle');
              const fw = p.words[0];
              if (fw) {
                setDirection(fw.direction);
                setSelectedCell({ row: fw.startRow, col: fw.startCol });
              }
            }}
            onBackToGame={() => setCurrentTab('crossword')}
            completedPuzzleIds={completedPuzzleIds}
            highContrast={highContrast}
          />
        )}

        {/* Guide / Carnet d'astuces */}
        {currentTab === 'carnet' && (
          <CarnetAstuces
            onBackToGame={() => setCurrentTab('crossword')}
            onSpeak={handleSpeak}
            isSpeaking={isSpeaking}
            onStopSpeaking={handleStopSpeaking}
            highContrast={highContrast}
            onPrint={() => setIsPrinting(true)}
          />
        )}

        {/* TAB 2: Les Mots Croisés de Plume & Minou */}
        {currentTab === 'crossword' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">
            {/* Friendly Mascot Hero Strip in Night Mode */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#131622] rounded-3xl p-4 sm:p-6 border border-stone-800 shadow-md">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={minouPlumeImg}
                    alt="Minou et Plume les deux chats"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/60 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 text-sm">🐱</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      Mini-Jeu n°2 · {currentPuzzle.dateLabel}
                    </span>
                    {completedPuzzleIds.includes(currentPuzzle.id) && (
                      <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/50">
                        ✓ Grille réussie
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                    Les Mots Croisés de Plume & Minou : {currentPuzzle.title}
                  </h1>
                  <p className="text-sm text-stone-400 font-serif-warm">
                    {currentPuzzle.introMessage}
                  </p>
                </div>
              </div>

              {/* Senior Quick Pet Assistants & Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleRevealLetter}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-black text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl border border-amber-500/40 transition-colors cursor-pointer shadow-xs"
                  title="Minou dévoile la lettre sous le curseur"
                >
                  <span>🐾</span>
                  <span>Indice de Minou</span>
                </button>

                <button
                  type="button"
                  onClick={handleVerifyGrid}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-black text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 rounded-xl border border-emerald-500/40 transition-colors cursor-pointer shadow-xs"
                  title="Paco vérifie la grille"
                >
                  <span>🐕</span>
                  <span>Le flair de Paco</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentTab('library')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-300 bg-stone-850 hover:bg-stone-800 rounded-xl border border-stone-750 transition-colors cursor-pointer"
                >
                  <span>📚</span>
                  <span>Autres grilles</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowBirthdayModal(true)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-300 bg-rose-950/70 hover:bg-rose-900 rounded-xl border border-rose-800/60 transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Anniversaire</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleClearGrid(false)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900/80 rounded-xl border border-rose-800/60 transition-colors cursor-pointer"
                  title="Effacer toutes les lettres pour recommencer cette grille à zéro"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  <span>Recommencer</span>
                </button>
              </div>
            </div>

            {/* If Current Puzzle is Completed: Celebration and Replay Banner */}
            {completedPuzzleIds.includes(currentPuzzle.id) && (
              <div className="bg-[#12241D] border-2 border-emerald-500/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-100 shadow-lg animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-2xl shrink-0">
                    🏆
                  </div>
                  <div>
                    <p className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                      <span>Grille complétée avec succès !</span>
                      <span className="text-[11px] bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/50">
                        100% sans faute
                      </span>
                    </p>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Toutes les lettres sont remplies. Tu peux l’effacer pour la rejouer à tout moment !
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowVictoryModal(true)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#1E2438] hover:bg-[#28304C] text-amber-300 border border-amber-500/40 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    title="Afficher la liste des mots et récompenses festives"
                  >
                    <span>📖 Voir les mots & félicitations</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleClearGrid(true)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all border border-amber-300 active:scale-95"
                    title="Effacer immédiatement toutes les lettres pour rejouer"
                  >
                    <RotateCcw className="w-4 h-4 text-stone-950" />
                    <span>Effacer et recommencer cette grille</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextPuzzle}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Grille suivante</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Play Area: 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Crossword Grid + On-Screen Virtual Keyboard */}
              <div className="lg:col-span-6 xl:col-span-5 space-y-4">
                <div className="bg-[#131622] rounded-3xl p-3 sm:p-5 border border-stone-800 shadow-md flex flex-col items-center">
                  <CrosswordGrid
                    puzzle={currentPuzzle}
                    userGrid={currentGrid}
                    selectedCell={selectedCell}
                    direction={direction}
                    onCellClick={handleCellClick}
                    verifiedState={verifiedState}
                    textSize={textSize}
                    highContrast={highContrast}
                    activeWord={activeWord}
                    onLetterInput={handleKeyPress}
                    onBackspace={handleBackspace}
                  />

                  {/* Keyboard toggle switch */}
                  <div className="w-full pt-3 mt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                    <span className="font-medium">
                      Touches physiques ou clavier tactile au choix
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                      className="flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                    >
                      <Keyboard className="w-3.5 h-3.5" />
                      <span>
                        {showVirtualKeyboard ? 'Masquer le clavier' : 'Afficher le clavier'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Virtual Keyboard (Senior AZERTY) */}
                {showVirtualKeyboard && (
                  <VirtualKeyboard
                    onKeyPress={handleKeyPress}
                    onBackspace={handleBackspace}
                    onNextWord={handleNextWord}
                    onToggleDirection={() =>
                      setDirection((prev) => (prev === 'across' ? 'down' : 'across'))
                    }
                    direction={direction}
                    highContrast={highContrast}
                  />
                )}
              </div>

              {/* Right Column: Clues Panel & Audio & Cyber Explanations */}
              <div className="lg:col-span-6 xl:col-span-7">
                <CluesPanel
                  puzzle={currentPuzzle}
                  activeWord={activeWord}
                  onSelectWord={handleSelectWord}
                  onSpeakClue={handleSpeak}
                  isSpeaking={isSpeaking}
                  onStopSpeaking={handleStopSpeaking}
                  onOpenCyberTip={(word) => {
                    if (word.cyberTip) {
                      setActiveCyberTip(word.cyberTip);
                    }
                  }}
                  onRevealLetter={handleRevealLetter}
                  onRevealWord={handleRevealWord}
                  onVerifyGrid={handleVerifyGrid}
                  onClearGrid={handleClearGrid}
                  textSize={textSize}
                  highContrast={highContrast}
                  userGrid={currentGrid}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-[#0B0D13] py-6 px-4 text-center text-xs text-stone-400 font-medium">
        <p>
          🌙 La Brigade Anti-Arnaques de {recipientName} · Mode Nuit exclusif reposant · Mots croisés conçus avec amour pour son Anniversaire.
        </p>
      </footer>

      {/* Modals */}
      <CyberTipModal
        tip={activeCyberTip}
        isOpen={activeCyberTip !== null}
        onClose={() => setActiveCyberTip(null)}
        onSpeak={handleSpeak}
        isSpeaking={isSpeaking}
        onStopSpeaking={handleStopSpeaking}
        highContrast={highContrast}
      />

      <BirthdayModal
        isOpen={showBirthdayModal}
        onClose={() => setShowBirthdayModal(false)}
        recipientName={recipientName}
        onUpdateRecipientName={handleUpdateRecipientName}
        highContrast={highContrast}
      />

      <VictoryModal
        isOpen={showVictoryModal}
        onClose={() => setShowVictoryModal(false)}
        puzzle={currentPuzzle}
        recipientName={recipientName}
        onNextPuzzle={handleNextPuzzle}
        onOpenCarnet={() => {
          setShowVictoryModal(false);
          setCurrentTab('carnet');
        }}
        onReplay={() => handleClearGrid(true)}
        highContrast={highContrast}
      />
    </div>
  );
}
