/**
 * Componente FinalLetter - Lettera finale con pause e reveal progressivo
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { debugLog } from '@/lib/debug';
import { FINAL_LETTER } from '@/lib/content';

interface FinalLetterProps {
  onComplete?: () => void;
}

export default function FinalLetter({ onComplete }: FinalLetterProps) {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]));
  const [currentSection, setCurrentSection] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
  debugLog.info('FinalLetter component mounted');
  
  useEffect(() => {
    // Pulisci i timeout quando il componente si smonta
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);
  
  // Gestisce il reveal progressivo delle sezioni
  const revealNextSection = (sectionIndex: number) => {
    const timeout = setTimeout(() => {
      debugLog.debug('Revealing section', sectionIndex);
      setVisibleSections(prev => new Set([...prev, sectionIndex]));
      setCurrentSection(sectionIndex);
      
      // Scroll automatico alla nuova sezione
      setTimeout(() => {
        const element = document.querySelector(`[data-section="${sectionIndex}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }, 0);
    
    timeoutsRef.current.push(timeout);
  };
  
  // Processa il contenuto con pause e reveal progressivo
  const renderContent = () => {
    const parts = FINAL_LETTER.content.split(/(\[PAUSE\]|\[PAUSE_LONG\]|\[PAUSE_FINAL\]|\[IMAGE_\d+\]|\[TICKET\]|\[INDIZI_START\])/);
    
    let sectionIndex = 0;
    let pauseDelay = 0;
    const PAUSE_SHORT = 2000;
    const PAUSE_LONG = 3500;
    const PAUSE_FINAL = 4000;
    
    const elements: React.ReactElement[] = [];
    
    parts.forEach((part, index) => {
      if (part.match(/\[PAUSE\]/)) {
        pauseDelay += PAUSE_SHORT;
        if (sectionIndex < 20) {
          setTimeout(() => revealNextSection(sectionIndex + 1), pauseDelay);
        }
        return;
      }
      
      if (part.match(/\[PAUSE_LONG\]/)) {
        pauseDelay += PAUSE_LONG;
        if (sectionIndex < 20) {
          setTimeout(() => revealNextSection(sectionIndex + 1), pauseDelay);
        }
        return;
      }
      
      if (part.match(/\[PAUSE_FINAL\]/)) {
        pauseDelay += PAUSE_FINAL;
        if (sectionIndex < 20) {
          setTimeout(() => revealNextSection(sectionIndex + 1), pauseDelay);
        }
        return;
      }
      
      if (part.match(/\[INDIZI_START\]/)) {
        pauseDelay += 1000;
        if (sectionIndex < 20) {
          setTimeout(() => revealNextSection(sectionIndex + 1), pauseDelay);
        }
        return;
      }
      
      if (part.match(/\[IMAGE_1\]/)) {
        sectionIndex++;
        const currentIdx = sectionIndex;
        elements.push(
          <div 
            key={`section-${currentIdx}`}
            data-section={currentIdx}
            className={`reveal-section ${visibleSections.has(currentIdx) ? 'visible' : 'hidden'}`}
          >
            <div className="image-reveal">
              <div className="image-placeholder image-1">
                <p className="image-caption">✈️ Indizio 1: L'Aereo</p>
                <div className="image-box">
                  <div className="image-placeholder-content">
                    [Inserisci qui l'immagine del gioco delle differenze con l'aereo]
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        pauseDelay += 500;
        if (currentIdx < 20) {
          setTimeout(() => revealNextSection(currentIdx + 1), pauseDelay);
        }
        return;
      }
      
      if (part.match(/\[IMAGE_2\]/)) {
        sectionIndex++;
        const currentIdx = sectionIndex;
        elements.push(
          <div 
            key={`section-${currentIdx}`}
            data-section={currentIdx}
            className={`reveal-section ${visibleSections.has(currentIdx) ? 'visible' : 'hidden'}`}
          >
            <div className="image-reveal">
              <div className="image-placeholder image-2">
                <p className="image-caption">🌸 Indizio 2: Il Fiore</p>
                <div className="image-box">
                  <div className="image-placeholder-content">
                    [Inserisci qui l'immagine del fiore di ciliegio]
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        pauseDelay += 500;
        if (currentIdx < 20) {
          setTimeout(() => revealNextSection(currentIdx + 1), pauseDelay);
        }
        return;
      }
      
      if (part.match(/\[IMAGE_3\]/)) {
        sectionIndex++;
        const currentIdx = sectionIndex;
        elements.push(
          <div 
            key={`section-${currentIdx}`}
            data-section={currentIdx}
            className={`reveal-section ${visibleSections.has(currentIdx) ? 'visible' : 'hidden'}`}
          >
            <div className="image-reveal">
              <div className="image-placeholder image-3">
                <p className="image-caption">🔴 Indizio 3: La Bandiera</p>
                <div className="image-box">
                  <div className="image-placeholder-content">
                    [Inserisci qui l'immagine della pallina rossa/bandiera giapponese]
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        pauseDelay += 500;
        if (currentIdx < 20) {
          setTimeout(() => revealNextSection(currentIdx + 1), pauseDelay);
        }
        return;
      }
      
      if (part.match(/\[TICKET\]/)) {
        sectionIndex++;
        const currentIdx = sectionIndex;
        elements.push(
          <div 
            key={`section-${currentIdx}`}
            data-section={currentIdx}
            className={`reveal-section ${visibleSections.has(currentIdx) ? 'visible' : 'hidden'}`}
          >
            <div className="ticket-reveal-container">
              <div className="ticket-container">
                <div className="ticket-shine" />
                <h2 className="ticket-title">✈️ Il Tuo Regalo ✈️</h2>
                <div className="ticket-content">
                  <div className="ticket-destination">
                    <span className="destination-label">Destinazione</span>
                    <span className="destination-name">GIAPPONE 🇯🇵</span>
                  </div>
                  <div className="ticket-info">
                    <p>✈️ Volo Andata e Ritorno</p>
                    <p>🏨 Hotel Prenotato</p>
                    <p>🌸 Primavera - Stagione dei Ciliegi in Fiore</p>
                  </div>
                  <div className="ticket-date">
                    <p className="date-label">Preparati a partire</p>
                    <p className="date-value">Primavera 2025</p>
                  </div>
                </div>
                <div className="ticket-footer">
                  <p>Il viaggio che abbiamo sempre sognato 🌸✨</p>
                </div>
              </div>
            </div>
          </div>
        );
        return;
      }
      
      // Testo normale
      if (part.trim()) {
        sectionIndex++;
        const currentIdx = sectionIndex;
        elements.push(
          <div 
            key={`section-${currentIdx}`}
            data-section={currentIdx}
            className={`reveal-section text-section ${visibleSections.has(currentIdx) ? 'visible' : 'hidden'}`}
          >
            {part.split('\n').map((line, lineIndex) => (
              line.trim() ? (
                <p key={`${currentIdx}-${lineIndex}`} className="final-text">
                  {line}
                </p>
              ) : (
                <br key={`${currentIdx}-${lineIndex}`} />
              )
            ))}
          </div>
        );
        
        // Auto-reveal dopo un breve delay per il testo
        pauseDelay += 800;
        if (currentIdx < 20 && !part.includes('[')) {
          setTimeout(() => revealNextSection(currentIdx + 1), pauseDelay);
        }
      }
    });
    
    return elements;
  };
  
  return (
    <div className="final-letter-container">
      <div className="final-letter-header">
        <h1 className="final-title">{FINAL_LETTER.title}</h1>
        <div className="sparkles">✨💝✨</div>
      </div>
      
      <div className="final-letter-content" ref={contentRef}>
        {renderContent()}
      </div>
      
      <div className={`final-footer ${visibleSections.size > 15 ? 'visible' : 'hidden'}`}>
        <p className="completion-message">
          🎉 Hai completato il viaggio! 🎉
        </p>
        <p className="final-note">
          Questa è solo l'inizio della nostra avventura...
        </p>
      </div>
    </div>
  );
}
