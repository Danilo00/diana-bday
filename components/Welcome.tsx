/**
 * Componente Welcome - Schermata iniziale di benvenuto
 */

'use client';

import { debugLog } from '@/lib/debug';

interface WelcomeProps {
  onStartTutorial: () => void;
}

export default function Welcome({ onStartTutorial }: WelcomeProps) {
  debugLog.debug('Welcome component rendered');
  
  const handleStart = () => {
    debugLog.info('User started tutorial');
    onStartTutorial();
  };
  
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">
          Ciao Diana! 
        </h1>
        
        <div className="welcome-text">          
          <p>
            Hai davanti a te una serie di scatole.🎁<br />
            Ogni scatola contiene un mini-gioco ed una lettera.✉️
          </p>
          
          <p>
            <strong>Ogni lettera contiene un codice.</strong><br />
            Ogni codice sblocca una parte del messaggio nascosto.
          </p>
          
          <p>
            Completa il gioco.<br />
            Leggi la lettera.<br />
            Apri la prossima scatola.
          </p>
          
          <p className="highlight">
            La lettera finale ti svelerà il tuo regalo.
          </p>
        </div>
        
        <button 
          onClick={handleStart}
          className="welcome-button"
        >
          Iniziamo il gioco ✨
        </button>
        
        <p className="welcome-hint">
          (Tieni pronto il primo codice per il tutorial)
        </p>
      </div>
    </div>
  );
}

