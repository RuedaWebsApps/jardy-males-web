// Lightweight Web Audio synthesizer for interactive urban preview beats
class UrbanSoundEngine {
  constructor() {
    this.ctx = null;
    this.intervalId = null;
    this.masterGain = null;
    this.isMuted = false;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.22;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return true;
  }

  playKick(time, freq = 115) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(36, time + 0.16);

    gain.gain.setValueAtTime(0.85, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.32);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.34);
  }

  playRim(time) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, time);
    osc.frequency.exponentialRampToValueAtTime(170, time + 0.05);

    filter.type = "highpass";
    filter.frequency.value = 300;

    gain.gain.setValueAtTime(0.28, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.09);
  }

  playHat(time) {
    if (!this.ctx || this.isMuted) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 6500;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.09, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.038);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(time);
  }

  playPadChord(time, rootFreq, duration) {
    if (!this.ctx || this.isMuted) return;
    // Minor 9th atmospheric urban chord
    const ratios = [1, 1.1892, 1.4983, 1.7818];
    ratios.forEach((r) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(rootFreq * 2 * r, time);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(520, time);
      filter.frequency.exponentialRampToValueAtTime(260, time + duration);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start(time);
      osc.stop(time + duration + 0.05);
    });
  }

  startTrack(track) {
    this.stop();
    if (!this.init()) return;

    this.isPlaying = true;
    const bpm = track?.bpm || 94;
    const rootFreq = track?.rootFreq || 110;
    const stepMs = (60 / bpm / 4) * 1000; // 16th note in ms
    let step = 0;

    const triggerStep = () => {
      if (!this.ctx || !this.isPlaying) return;
      const now = this.ctx.currentTime + 0.02;
      const s = step % 16;

      // Dembow / Urban reggaeton-trap groove:
      // Kick on 0, 4, 8, 12; syncopated snare/rim on 3, 6, 11, 14
      if (s === 0 || s === 8) this.playKick(now, 120);
      if (s === 4 || s === 12) this.playKick(now, 105);
      if (s === 3 || s === 6 || s === 11 || s === 14) this.playRim(now);
      if (s % 2 === 0) this.playHat(now);
      if (s === 0) {
        const chordRoot = step % 32 < 16 ? rootFreq : rootFreq * 0.8909;
        this.playPadChord(now, chordRoot, (stepMs * 15) / 1000);
      }
      step++;
    };

    triggerStep();
    this.intervalId = setInterval(triggerStep, stepMs);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.22, this.ctx.currentTime, 0.04);
    }
  }
}

export const soundEngine = new UrbanSoundEngine();
