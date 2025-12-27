/**
 * Componente FinalLetter - Lettera finale con immagini e biglietto
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { debugLog } from '@/lib/debug';
import { FINAL_LETTER } from '@/lib/content';

interface FinalLetterProps {
  onComplete?: () => void;
}

export default function FinalLetter({ onComplete }: FinalLetterProps) {
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);
  
  debugLog.info('FinalLetter component mounted');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = entry.target.getAttribute('data-image-id');
            if (imageId) {
              debugLog.debug('Image marker visible', imageId);
              setVisibleImages((prev) => new Set([...prev, imageId]));
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    
    // Osserva tutti i marker delle immagini
    const markers = contentRef.current?.querySelectorAll('[data-image-id]');
    markers?.forEach((marker) => observer.observe(marker));
    
    return () => observer.disconnect();
  }, []);
  
  // Processa il contenuto per inserire i marker delle immagini
  const renderContent = () => {
    const parts = FINAL_LETTER.content.split(/(\[IMAGE_\d+\]|\[TICKET\])/);
    
    return parts.map((part, index) => {
      if (part.match(/\[IMAGE_1\]/)) {
        return (
          <div key={index} data-image-id="image1" className="image-marker">
            {visibleImages.has('image1') && (
              <div className="reveal-image">
                <div className="image-placeholder image-1">
                  <p className="image-caption">🔍 Gioco delle differenze</p>
                  <div className="image-box">
                    [Qui andrà l'immagine del gioco delle differenze]
                  </div>
                  <p className="image-hint">Le differenze formavano un simbolo...</p>
                </div>
              </div>
            )}
          </div>
        );
      }
      
      if (part.match(/\[IMAGE_2\]/)) {
        return (
          <div key={index} data-image-id="image2" className="image-marker">
            {visibleImages.has('image2') && (
              <div className="reveal-image">
                <div className="image-placeholder image-2">
                  <p className="image-caption">🌸 Il fiore</p>
                  <div className="image-box">
                    [Qui andrà l'immagine del fiore - ciliegio]
                  </div>
                  <p className="image-hint">Un fiore di ciliegio...</p>
                </div>
              </div>
            )}
          </div>
        );
      }
      
      if (part.match(/\[IMAGE_3\]/)) {
        return (
          <div key={index} data-image-id="image3" className="image-marker">
            {visibleImages.has('image3') && (
              <div className="reveal-image">
                <div className="image-placeholder image-3">
                  <p className="image-caption">🔴 La pallina rossa</p>
                  <div className="image-box">
                    [Qui andrà l'immagine della bandiera giapponese]
                  </div>
                  <p className="image-hint">Il sole nascente...</p>
                </div>
              </div>
            )}
          </div>
        );
      }
      
      if (part.match(/\[TICKET\]/)) {
        return (
          <div key={index} data-image-id="ticket" className="image-marker">
            {visibleImages.has('ticket') && (
              <div className="reveal-image ticket-reveal">
                <div className="ticket-container">
                  <div className="ticket-shine" />
                  <h2 className="ticket-title">🎫 Il Tuo Biglietto 🎫</h2>
                  <div className="ticket-content">
                    <div className="ticket-destination">
                      <span className="destination-label">Destinazione</span>
                      <span className="destination-name">TOKYO, JAPAN 🇯🇵</span>
                    </div>
                    <div className="ticket-info">
                      <p>✈️ Volo Andata e Ritorno</p>
                      <p>🏨 Hotel prenotato</p>
                      <p>🌸 Stagione dei ciliegi in fiore</p>
                    </div>
                    <div className="ticket-date">
                      <p className="date-label">Data di partenza</p>
                      <p className="date-value">[Controllare ultima scatola]</p>
                    </div>
                  </div>
                  <div className="ticket-footer">
                    <p>Preparati al viaggio della tua vita! 🌸✨</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }
      
      // Testo normale
      return part.split('\n').map((line, lineIndex) => (
        line.trim() ? (
          <p key={`${index}-${lineIndex}`} className="final-text">
            {line}
          </p>
        ) : (
          <br key={`${index}-${lineIndex}`} />
        )
      ));
    });
  };
  
  return (
    <div className="final-letter-container">
      <div className="final-letter-header">
        <h1 className="final-title">{FINAL_LETTER.title}</h1>
        <div className="sparkles">✨🌸✨</div>
      </div>
      
      <div className="final-letter-content" ref={contentRef}>
        {renderContent()}
      </div>
      
      <div className="final-footer">
        <p className="completion-message">
          🎉 Hai completato il viaggio! 🎉
        </p>
        <p className="final-note">
          Questo è solo l'inizio della nostra avventura insieme...
        </p>
      </div>
    </div>
  );
}

