/**
 * Componente LetterDisplay - Visualizza una lettera digitale sbloccata
 */

'use client';

import { debugLog } from '@/lib/debug';
import { LetterContent } from '@/lib/content';

interface LetterDisplayProps {
  letter: LetterContent;
  isNew?: boolean;
}

export default function LetterDisplay({ letter, isNew = false }: LetterDisplayProps) {
  debugLog.debug('LetterDisplay rendered', { level: letter.level, isNew });
  
  return (
    <div className={`letter-container ${isNew ? 'letter-new' : ''}`}>
      <div className="letter-content">
        {letter.date && (
          <div className="letter-date">{letter.date}</div>
        )}
        
        <h2 className="letter-title">{letter.title}</h2>
        
        <div className="letter-body">
          {letter.content.split('\n').map((paragraph, index) => (
            paragraph.trim() ? (
              <p key={index}>{paragraph}</p>
            ) : (
              <br key={index} />
            )
          ))}
        </div>
        
        {/* {isNew && (
          <div className="letter-badge">
            ✨ Nuovo messaggio sbloccato!
          </div>
        )} */}
      </div>
    </div>
  );
}

