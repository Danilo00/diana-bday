/**
 * Componente Tutorial - Spiega come funziona il sistema
 */

'use client';

import { useState } from 'react';
import { debugLog } from '@/lib/debug';

interface TutorialProps {
  onComplete: (code: string) => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [code, setCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  
  debugLog.debug('Tutorial component rendered');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debugLog.info('Tutorial code submitted', code);
    onComplete(code);
  };
  
  const handleShowHint = () => {
    debugLog.debug('Tutorial hint requested');
    setShowHint(true);
  };
  
  return (
    <div className="tutorial-container">
      <div className="tutorial-content">
        <h2 className="tutorial-title">Come Funziona</h2>
        
        <div className="tutorial-steps">
          <div className="tutorial-step">
            <span className="step-number">1</span>
            <div className="step-content">
              <h3>Trova la lettera fisica</h3>
              <p>Ogni scatola contiene una lettera con un codice</p>
            </div>
          </div>
          
          <div className="tutorial-step">
            <span className="step-number">2</span>
            <div className="step-content">
              <h3>Inserisci il codice qui</h3>
              <p>Il codice sblocca un contenuto digitale</p>
            </div>
          </div>
          
          <div className="tutorial-step">
            <span className="step-number">3</span>
            <div className="step-content">
              <h3>Leggi il messaggio</h3>
              <p>Ogni messaggio è un pezzo del puzzle</p>
            </div>
          </div>
          
          <div className="tutorial-step">
            <span className="step-number">4</span>
            <div className="step-content">
              <h3>Continua fino alla fine</h3>
              <p>Il senso completo si rivelerà nell'ultimo messaggio</p>
            </div>
          </div>
        </div>
        
        <div className="tutorial-practice">
          <h3>Prova Subito!</h3>
          <p>Cerca il codice nella prima lettera fisica e inseriscilo qui:</p>
          
          <form onSubmit={handleSubmit} className="tutorial-form">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="INSERISCI IL CODICE"
              className="code-input"
              autoComplete="off"
              autoCapitalize="characters"
            />
            
            <button type="submit" className="submit-button">
              Sblocca 🔓
            </button>
          </form>
          
          {!showHint && (
            <button 
              onClick={handleShowHint}
              className="hint-button"
            >
              Non trovo il codice...
            </button>
          )}
          
          {showHint && (
            <div className="hint-box">
              <p>💡 Il primo codice dovrebbe essere scritto sulla lettera fisica che hai trovato nella prima scatola.</p>
              <p>Cerca qualcosa tipo: <code>INIZIO2025</code></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

