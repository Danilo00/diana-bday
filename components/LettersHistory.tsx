/**
 * Componente LettersHistory - Mostra tutte le lettere sbloccate
 */

'use client';

import { debugLog } from '@/lib/debug';
import { LetterContent } from '@/lib/content';
import LetterDisplay from './LetterDisplay';

interface LettersHistoryProps {
  letters: LetterContent[];
  latestLevel?: number;
}

export default function LettersHistory({ letters, latestLevel }: LettersHistoryProps) {
  debugLog.debug('LettersHistory rendered', { count: letters.length, latestLevel });
  
  if (letters.length === 0) {
    return null;
  }
  
  return (
    <div className="letters-history">
      <h2 className="history-title">📖 Messaggi Sbloccati</h2>
      
      <div className="history-content">
        {letters.map((letter) => (
          <LetterDisplay 
            key={letter.level} 
            letter={letter}
            isNew={letter.level === latestLevel}
          />
        ))}
      </div>
      
      <div className="history-divider" />
    </div>
  );
}

