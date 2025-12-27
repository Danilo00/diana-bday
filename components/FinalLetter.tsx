/**
 * Componente FinalLetter - Lettera finale con pause e reveal progressivo
 */

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { debugLog } from '@/lib/debug';
import { FINAL_LETTER } from '@/lib/content';

interface FinalLetterProps {
  onComplete?: () => void;
}

type FinalStep =
  | { kind: 'text'; text: string; delayAfterMs: number }
  | { kind: 'image1'; delayAfterMs: number }
  | { kind: 'image2'; delayAfterMs: number }
  | { kind: 'image3'; delayAfterMs: number }
  | { kind: 'ticket'; delayAfterMs: number };

function buildFinalSteps(content: string): FinalStep[] {
  const parts = content.split(
    /(\[PAUSE\]|\[PAUSE_LONG\]|\[PAUSE_FINAL\]|\[PAUSE_BEAT\]|\[IMAGE_\d+\]|\[TICKET\]|\[INDIZI_START\])/
  );

  const steps: FinalStep[] = [];
  const PAUSE_SHORT = 6000;
  const PAUSE_LONG = 10000;
  const PAUSE_FINAL = 10000;
  // Pausa breve extra (usala liberamente nel contenuto con [PAUSE_BEAT])
  const PAUSE_BEAT = 1500;

  const addDelayToPrev = (ms: number) => {
    if (steps.length === 0) return;
    const last = steps[steps.length - 1];
    steps[steps.length - 1] = { ...last, delayAfterMs: last.delayAfterMs + ms } as FinalStep;
  };

  for (const raw of parts) {
    const part = raw ?? '';
    if (!part.trim()) continue;

    if (part === '[PAUSE]') {
      addDelayToPrev(PAUSE_SHORT);
      continue;
    }
    if (part === '[PAUSE_LONG]') {
      addDelayToPrev(PAUSE_LONG);
      continue;
    }
    if (part === '[PAUSE_FINAL]') {
      addDelayToPrev(PAUSE_FINAL);
      continue;
    }
    if (part === '[PAUSE_BEAT]') {
      addDelayToPrev(PAUSE_BEAT);
      continue;
    }
    if (part === '[INDIZI_START]') {
      addDelayToPrev(1000);
      continue;
    }

    if (part === '[IMAGE_1]') {
      steps.push({ kind: 'image1', delayAfterMs: 500 });
      continue;
    }
    if (part === '[IMAGE_2]') {
      steps.push({ kind: 'image2', delayAfterMs: 500 });
      continue;
    }
    if (part === '[IMAGE_3]') {
      steps.push({ kind: 'image3', delayAfterMs: 500 });
      continue;
    }
    if (part === '[TICKET]') {
      steps.push({ kind: 'ticket', delayAfterMs: 0 });
      continue;
    }

    steps.push({ kind: 'text', text: part, delayAfterMs: 800 });
  }

  return steps;
}

export default function FinalLetter({ onComplete }: FinalLetterProps) {
  const steps = useMemo(() => buildFinalSteps(FINAL_LETTER.content), []);
  const [visibleCount, setVisibleCount] = useState(1);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    debugLog.info('FinalLetter component mounted');
  }, []);

  useEffect(() => {
    // Idempotente (compatibile con React StrictMode in dev):
    // ogni run cancella e rischedula i timer.
    timersRef.current.forEach(id => window.clearTimeout(id));
    timersRef.current = [];

    debugLog.debug('FinalLetter animation (re)start', { steps: steps.length });

    // sblocca la prima sezione subito
    setVisibleCount(steps.length > 0 ? 1 : 0);

    let cumulative = 0;
    for (let i = 1; i < steps.length; i++) {
      cumulative += steps[i - 1].delayAfterMs;
      const t = window.setTimeout(() => {
        debugLog.debug('Revealing section', i + 1);
        setVisibleCount(i + 1);
        if (i + 1 === steps.length) {
          debugLog.info('FinalLetter animation completed');
          onComplete?.();
        }
      }, cumulative);
      timersRef.current.push(t);
    }

    return () => {
      timersRef.current.forEach(id => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, [onComplete, steps]);

  useEffect(() => {
    // scroll controllato: vai alla sezione appena apparsa, senza tornare in cima
    if (typeof window === 'undefined') return;
    if (visibleCount <= 0) return;

    const el = document.querySelector(`[data-section="${visibleCount}"]`) as HTMLElement | null;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const targetTop = window.scrollY + rect.top - 96; // offset per header/spazio respiro
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  }, [visibleCount]);

  const renderStep = (step: FinalStep, idx: number) => {
    const sectionIndex = idx + 1;
    const isVisible = sectionIndex <= visibleCount;

    if (step.kind === 'text') {
      return (
        <div
          key={`section-${sectionIndex}`}
          data-section={sectionIndex}
          className={`reveal-section text-section ${isVisible ? 'visible' : 'hidden'}`}
        >
          {step.text.split('\n').map((line, lineIndex) =>
            line.trim() ? (
              <p key={`${sectionIndex}-${lineIndex}`} className="final-text">
                {line}
              </p>
            ) : (
              <br key={`${sectionIndex}-${lineIndex}`} />
            )
          )}
        </div>
      );
    }

    if (step.kind === 'image1') {
      return (
        <div
          key={`section-${sectionIndex}`}
          data-section={sectionIndex}
          className={`reveal-section ${isVisible ? 'visible' : 'hidden'}`}
        >
          <div className="image-reveal">
            <div className="image-placeholder image-1">
              <p className="image-caption">✈️ Indizio 1: L'Aereo</p>
              <div className="image-box">
                <img
                  src="/Indizio1.png"
                  alt="Indizio 1 - Aereo"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (step.kind === 'image2') {
      return (
        <div
          key={`section-${sectionIndex}`}
          data-section={sectionIndex}
          className={`reveal-section ${isVisible ? 'visible' : 'hidden'}`}
        >
          <div className="image-reveal">
            <div className="image-placeholder image-2">
              <p className="image-caption">🌸 Indizio 2: Il Fiore</p>
              <div className="image-box">
                <img
                  src="/Indizio2.png"
                  alt="Indizio 2 - Fiore"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (step.kind === 'image3') {
      return (
        <div
          key={`section-${sectionIndex}`}
          data-section={sectionIndex}
          className={`reveal-section ${isVisible ? 'visible' : 'hidden'}`}
        >
          <div className="image-reveal">
            <div className="image-placeholder image-3">
              <p className="image-caption">🔴 Indizio 3: La Bandiera</p>
              <div className="image-box">
                <img
                  src="/Indizio3.png"
                  alt="Indizio 3 - Bandiera"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ticket
    return (
      <div
        key={`section-${sectionIndex}`}
        data-section={sectionIndex}
        className={`reveal-section ${isVisible ? 'visible' : 'hidden'}`}
      >
        <div className="ticket-reveal-container">
          <div className="ticket-container">
            <div className="ticket-shine" />
            <h2 className="ticket-title">✈️ Il Tuo Regalo</h2>
            <p className="ticket-subtitle">Aprilo. Guardalo bene. È reale.</p>
            <div className="ticket-content">
              <div className="ticket-image-wrap">
                <img
                  src="/Biglietto.PNG"
                  alt="Biglietto per il Giappone"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    display: 'block',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                  }}
                />
              </div>
            </div>
            <div className="ticket-actions">
              <div className="ticket-hint">💝</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="final-letter-container">
      <div className="final-letter-header">
        <h1 className="final-title">{FINAL_LETTER.title}</h1>
        <div className="sparkles">✨💝✨</div>
      </div>
      
      <div className="final-letter-content">
        {steps.map((s, idx) => renderStep(s, idx))}
      </div>
      
      <div className={`final-footer ${visibleCount >= steps.length ? 'visible' : 'hidden'}`}>
        <p className="completion-message">
          🎉 Tanti auguri! 🎉
        </p>
        <p className="final-note">
          Questo è solo l'inizio della nostra nuova avventura...
        </p>
      </div>
    </div>
  );
}
