/**
 * Componente CodeInput - Input per inserimento codici con validazione
 */

'use client';

import { useState } from 'react';
import { debugLog } from '@/lib/debug';

interface CodeInputProps {
  onCodeSubmit: (code: string) => void;
  currentLevel: number;
  disabled?: boolean;
}

export default function CodeInput({ onCodeSubmit, currentLevel, disabled = false }: CodeInputProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  debugLog.debug('CodeInput rendered', { currentLevel, disabled });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Inserisci un codice');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    debugLog.info('Code submitted', { code, currentLevel });
    
    // Simula un piccolo delay per feedback visivo
    setTimeout(() => {
      onCodeSubmit(code.trim().toUpperCase());
      setCode('');
      setIsSubmitting(false);
    }, 300);
  };
  
  const handleChange = (value: string) => {
    setCode(value.toUpperCase());
    if (error) setError('');
  };
  
  return (
    <div className="code-input-container">
      <div className="code-input-content">
        <h3 className="code-input-title">
          🔐 Inserisci il Prossimo Codice
        </h3>
        
        <p className="code-input-description">
          Trova la lettera nella prossima scatola e inserisci il codice qui sotto.
        </p>
        
        <form onSubmit={handleSubmit} className="code-form">
          <div className="input-wrapper">
            <input
              type="text"
              value={code}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="ES: A7Q9-M2KD"
              className={`code-input ${error ? 'error' : ''}`}
              disabled={disabled || isSubmitting}
              autoComplete="off"
              autoCapitalize="characters"
              maxLength={20}
            />
            
            {error && (
              <p className="error-message">{error}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={disabled || isSubmitting || !code.trim()}
          >
            {isSubmitting ? 'Verifica...' : 'Sblocca 🔓'}
          </button>
        </form>
        
        <div className="code-hint">
          <p>💡 Livello attuale: <strong>{currentLevel >= 0 ? currentLevel : 'Tutorial'}</strong></p>
          <p className="hint-text">
            Ricorda: devi procedere in ordine, non puoi saltare livelli!
          </p>
        </div>
      </div>
    </div>
  );
}

