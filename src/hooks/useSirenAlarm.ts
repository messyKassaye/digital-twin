import { useEffect, useRef, useState } from "react";
import useDangerEventStore from "../store/useDangerEventStore";

const CRITICAL_FREQ_LOW = 500;
const CRITICAL_FREQ_HIGH = 900;
const CRITICAL_WAIL_MS = 400; // how fast the siren wails between low/high

export function useSirenAlarm(muted: boolean) {
  const events = useDangerEventStore((s) => s.events);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const wailIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const processedIds = useRef<Set<string>>(new Set());
  const [unlocked, setUnlocked] = useState(false);

  // call this from a button click to satisfy the browser's autoplay policy
  const unlockAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    setUnlocked(true);
  };

  const stopSiren = () => {
    if (wailIntervalRef.current) {
      clearInterval(wailIntervalRef.current);
      wailIntervalRef.current = null;
    }
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (gainRef.current) {
      gainRef.current.disconnect();
      gainRef.current = null;
    }
  };

  const playCriticalSiren = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    stopSiren(); // don't stack multiple sirens if one is already running

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = CRITICAL_FREQ_LOW;
    gain.gain.value = 0.15; // keep it well below full volume
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscillatorRef.current = osc;
    gainRef.current = gain;

    let high = false;
    wailIntervalRef.current = setInterval(() => {
      high = !high;
      osc.frequency.setValueAtTime(
        high ? CRITICAL_FREQ_HIGH : CRITICAL_FREQ_LOW,
        ctx.currentTime,
      );
    }, CRITICAL_WAIL_MS);
  };

  const playWarningBeep = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 700;
    gain.gain.value = 0.12;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    // short beep, auto-stops itself — doesn't need to loop like critical
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.stop(ctx.currentTime + 0.3);
  };

  useEffect(() => {
    if (!unlocked || muted) return;

    // only react to NEW events since last render, so re-renders don't replay sounds
    const newEvents = events.filter((e) => !processedIds.current.has(e.id));
    newEvents.forEach((e) => processedIds.current.add(e.id));
    if (newEvents.length === 0) return;

    const hasCritical = newEvents.some((e) => e.severity === "critical");
    const hasWarning = newEvents.some((e) => e.severity === "warning");

    if (hasCritical) {
      playCriticalSiren();
    } else if (hasWarning) {
      playWarningBeep();
    }
    // "info" severity intentionally makes no sound
  }, [events, unlocked, muted]);

  // stop the ongoing critical siren once there are no more active critical events
  useEffect(() => {
    const stillCritical = events.some((e) => e.severity === "critical");
    if (!stillCritical) stopSiren();
  }, [events]);

  useEffect(() => {
    return () => stopSiren(); // cleanup on unmount
  }, []);

  return { unlocked, unlockAudio };
}
