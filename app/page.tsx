'use client';

import { useState, useEffect } from 'react';
import { debugLog } from '@/lib/debug';
import { useAppState } from '@/hooks/useAppState';
import Welcome from '@/components/Welcome';
import Tutorial from '@/components/Tutorial';
import CodeInput from '@/components/CodeInput';
import LettersHistory from '@/components/LettersHistory';
import FinalLetter from '@/components/FinalLetter';

export default function Home() {
  const {
    state,
    isLoaded,
    error,
    handleCompleteTutorial,
    handleCodeSubmit,
    getUnlockedLetters,
    isFinalLetterUnlocked,
  } = useAppState();
  
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [latestUnlockedLevel, setLatestUnlockedLevel] = useState<number | undefined>();
  
  debugLog.debug('Home page rendered', { state, isLoaded });
  
  // Gestisce il primo caricamento
  useEffect(() => {
    if (isLoaded) {
      if (state.tutorialCompleted) {
        setShowWelcome(false);
        setShowTutorial(false);
      }
    }
  }, [isLoaded, state.tutorialCompleted]);
  
  // Handlers
  const handleStartTutorial = () => {
    debugLog.info('Starting tutorial');
    setShowWelcome(false);
    setShowTutorial(true);
  };
  
  const handleTutorialComplete = (code: string) => {
    debugLog.info('Tutorial code submitted', code);
    const success = handleCodeSubmit(code);
    
    if (success) {
      handleCompleteTutorial();
      setShowTutorial(false);
      setShowSuccess(true);
      setLatestUnlockedLevel(0);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };
  
  const handleNewCodeSubmit = (code: string) => {
    const success = handleCodeSubmit(code);
    
    if (success) {
      setShowSuccess(true);
      setLatestUnlockedLevel(state.currentLevel);
      
      // Scroll verso l'alto per vedere la nuova lettera
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };
  
  // Loading state
  if (!isLoaded) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🎁</div>
        <p>Caricamento...</p>
      </div>
    );
  }
  
  // Welcome screen
  if (showWelcome) {
    return <Welcome onStartTutorial={handleStartTutorial} />;
  }
  
  // Tutorial screen
  if (showTutorial) {
    return <Tutorial onComplete={handleTutorialComplete} />;
  }
  
  // Main app
  const unlockedLetters = getUnlockedLetters();
  const finalUnlocked = isFinalLetterUnlocked();
  
  return (
    <main className="main-container">
      {/* Success notification */}
      {showSuccess && (
        <div className="success-notification">
          <div className="success-content">
            <span className="success-icon">✨</span>
            <span className="success-text">Nuovo messaggio sbloccato!</span>
            <span className="success-icon">✨</span>
          </div>
        </div>
      )}
      
      {/* Error notification */}
      {error && (
        <div className="error-notification">
          <div className="error-content">
            <span className="error-icon">❌</span>
            <span className="error-text">{error}</span>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">🎁 Lettere per Diana 🎁</h1>
        <p className="app-subtitle">
          Livello {state.currentLevel >= 0 ? state.currentLevel + 1 : 1} di 5
        </p>
      </header>
      
      {/* Final Letter (se sbloccata) */}
      {finalUnlocked && (
        <div className="final-section">
          <FinalLetter />
        </div>
      )}
      
      {/* Letters History */}
      {unlockedLetters.length > 0 && !finalUnlocked && (
        <LettersHistory 
          letters={unlockedLetters} 
          latestLevel={latestUnlockedLevel}
        />
      )}
      
      {/* Code Input (solo se non è stata sbloccata la lettera finale) */}
      {!finalUnlocked && (
        <div className="input-section">
          <CodeInput 
            onCodeSubmit={handleNewCodeSubmit}
            currentLevel={state.currentLevel}
          />
        </div>
      )}
      
      {/* Footer */}
      <footer className="app-footer">
        <p>Made with ❤️ for Diana's Birthday</p>
        {process.env.NODE_ENV === 'development' && (
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                (window as any).DEBUG_ENABLE = true;
                debugLog.info('Debug mode enabled from UI');
                alert('Debug mode enabled! Check console.');
              }
            }}
            className="debug-button"
          >
            Enable Debug
          </button>
        )}
      </footer>
    </main>
  );
}
