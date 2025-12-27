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
          🎁 Un Regalo Speciale 🎁
        </h1>
        
        <div className="welcome-text">
          <p>Ciao Diana,</p>
          
          <p>
            Questo non è un sito normale.<br />
            È parte del tuo regalo di compleanno.
          </p>
          
          <p>
            Hai davanti a te una serie di scatole.<br />
            Ogni scatola contiene un mini-gioco e una lettera.
          </p>
          
          <p>
            <strong>Ogni lettera fisica contiene un codice.</strong><br />
            Ogni codice sblocca una parte del messaggio nascosto.
          </p>
          
          <p>
            Non puoi saltare avanti.<br />
            Non puoi leggere tutto subito.<br />
            Ogni pezzo ha il suo momento.
          </p>
          
          <p className="highlight">
            Il significato si rivelerà solo alla fine.
          </p>
        </div>
        
        <button 
          onClick={handleStart}
          className="welcome-button"
        >
          Inizia l'Avventura ✨
        </button>
        
        <p className="welcome-hint">
          (Apri la prima scatola per trovare il primo codice)
        </p>
      </div>
    </div>
  );
}

