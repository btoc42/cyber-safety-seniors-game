/**
 * Gentle Web Audio and Speech Synthesis for senior comfort
 */

class SoundController {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playTap(enabled: boolean = true) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // AudioContext muted/unsupported
    }
  }

  playSuccess(enabled: boolean = true) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.06, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } catch {
      // Silently ignore
    }
  }

  playVictory(enabled: boolean = true) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Joyful celebratory arpeggio: C5 - E5 - G5 - C6
      const arpeggio = [523.25, 659.25, 783.99, 1046.5];
      arpeggio.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.08, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.4);
      });
    } catch {
      // Silently ignore
    }
  }

  // Synthesized "Joyeux Anniversaire" (Happy Birthday) melody using Web Audio API
  playHappyBirthday(enabled: boolean = true, onEnded?: () => void) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Happy Birthday notes and rhythm:
      // "Joyeux" (G4, 0.25s) "an-ni-" (G4, 0.25s) "ver-" (A4, 0.5s) "saire" (G4, 0.5s), (C5, 0.5s), (B4, 1.0s)...
      const notes: { freq: number; dur: number; delay: number }[] = [
        // Phrase 1: Joyeux anniversaire
        { freq: 392.00, dur: 0.28, delay: 0.0 },   // Sol (G4)
        { freq: 392.00, dur: 0.28, delay: 0.32 },  // Sol (G4)
        { freq: 440.00, dur: 0.55, delay: 0.64 },  // La (A4)
        { freq: 392.00, dur: 0.55, delay: 1.25 },  // Sol (G4)
        { freq: 523.25, dur: 0.55, delay: 1.85 },  // Do (C5)
        { freq: 493.88, dur: 0.95, delay: 2.45 },  // Si (B4)

        // Phrase 2: Joyeux anniversaire
        { freq: 392.00, dur: 0.28, delay: 3.55 },  // Sol (G4)
        { freq: 392.00, dur: 0.28, delay: 3.87 },  // Sol (G4)
        { freq: 440.00, dur: 0.55, delay: 4.19 },  // La (A4)
        { freq: 392.00, dur: 0.55, delay: 4.80 },  // Sol (G4)
        { freq: 587.33, dur: 0.55, delay: 5.40 },  // Ré (D5)
        { freq: 523.25, dur: 1.05, delay: 6.00 },  // Do (C5)

        // Phrase 3: Joyeux anniversaire (montée festive)
        { freq: 392.00, dur: 0.28, delay: 7.20 },  // Sol (G4)
        { freq: 392.00, dur: 0.28, delay: 7.52 },  // Sol (G4)
        { freq: 783.99, dur: 0.55, delay: 7.84 },  // Sol aigu (G5)
        { freq: 659.25, dur: 0.55, delay: 8.45 },  // Mi (E5)
        { freq: 523.25, dur: 0.55, delay: 9.05 },  // Do (C5)
        { freq: 493.88, dur: 0.55, delay: 9.65 },  // Si (B4)
        { freq: 440.00, dur: 0.85, delay: 10.25 }, // La (A4)

        // Phrase 4: Joyeux anniversaire final
        { freq: 698.46, dur: 0.28, delay: 11.25 }, // Fa (F5)
        { freq: 698.46, dur: 0.28, delay: 11.57 }, // Fa (F5)
        { freq: 659.25, dur: 0.55, delay: 11.89 }, // Mi (E5)
        { freq: 523.25, dur: 0.55, delay: 12.50 }, // Do (C5)
        { freq: 587.33, dur: 0.55, delay: 13.10 }, // Ré (D5)
        { freq: 523.25, dur: 1.40, delay: 13.70 }, // Do final (C5)
      ];

      notes.forEach((n) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const subOsc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Warm organ/vibraphone like timbre
        osc.type = 'triangle';
        subOsc.type = 'sine';

        osc.frequency.setValueAtTime(n.freq, now + n.delay);
        subOsc.frequency.setValueAtTime(n.freq * 0.5, now + n.delay); // Sub-octave for warmth

        gain.gain.setValueAtTime(0.0001, now + n.delay);
        gain.gain.linearRampToValueAtTime(0.09, now + n.delay + 0.03);
        gain.gain.setValueAtTime(0.08, now + n.delay + n.dur * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.delay + n.dur);

        osc.connect(gain);
        subOsc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + n.delay);
        subOsc.start(now + n.delay);
        osc.stop(now + n.delay + n.dur);
        subOsc.stop(now + n.delay + n.dur);
      });

      if (onEnded) {
        setTimeout(onEnded, 15500);
      }
    } catch {
      // Silently ignore
    }
  }

  // Synthesized playful Chihuahua "waf-waf" bark
  playPacoBark(enabled: boolean = true) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Two quick cute yips
      [0, 0.16].forEach((offset) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        // Chihuahua pitch starts around 900Hz and drops to 450Hz
        osc.frequency.setValueAtTime(880, now + offset);
        osc.frequency.exponentialRampToValueAtTime(1150, now + offset + 0.04);
        osc.frequency.exponentialRampToValueAtTime(420, now + offset + 0.12);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, now + offset);
        filter.Q.setValueAtTime(3, now + offset);

        gain.gain.setValueAtTime(0.09, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.13);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.13);
      });
    } catch {
      // Silently ignore
    }
  }

  // Cat purr sound completely removed per user request: only Birthday music is kept as reward
  playCatPurr(_enabled: boolean = true) {
    // Disabled: cat purring sound removed
  }

  // Satisfying treat reward sound
  playTreatSound(enabled: boolean = true) {
    if (!enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [659.25, 880, 1046.5]; // E5, A5, C6
      notes.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.06);
        gain.gain.setValueAtTime(0.08, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.15);
      });
    } catch {
      // Silently ignore
    }
  }
}

export const soundEffects = new SoundController();

/**
 * Text to Speech in French for senior accessibility
 */
export function speakFrenchClue(text: string, rate: number = 0.85): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return () => {};
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const cleanText = text.replace(/\(Cyber\)/gi, '').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'fr-FR';
  utterance.rate = rate; // Calm, gentle pace for an 80yo
  utterance.pitch = 1.0;

  // Try to find a French voice
  const voices = window.speechSynthesis.getVoices();
  const frVoice = voices.find(v => v.lang.startsWith('fr') || v.lang.startsWith('FR'));
  if (frVoice) {
    utterance.voice = frVoice;
  }

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
