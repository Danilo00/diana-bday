'use client';

import { useRef, useState, useEffect } from 'react';
import { debugLog } from '@/lib/debug';
import { useAppState } from '@/hooks/useAppState';
import Welcome from '@/components/Welcome';
import Tutorial from '@/components/Tutorial';
import CodeInput from '@/components/CodeInput';
import LettersHistory from '@/components/LettersHistory';
import FinalLetter from '@/components/FinalLetter';
import ScrollToBottomFab from '@/components/ScrollToBottomFab';
import ResetAppDialog from '@/components/ResetAppDialog';
import { resetAllAppStorage } from '@/lib/storage';

export default function Home() {
  const {
    state,
    isLoaded,
    error,
    handleCompleteTutorial,
    handleCodeSubmit,
    getUnlockedLetters,
    markFinalLetterRevealed,
  } = useAppState();
  
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [latestUnlockedLevel, setLatestUnlockedLevel] = useState<number | undefined>();
  const [showFinalLetter, setShowFinalLetter] = useState(false);
  const [finalLetterRunId, setFinalLetterRunId] = useState(0);
  const [forceReplayAnimation, setForceReplayAnimation] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const resetHoldTimerRef = useRef<number | null>(null);
  
  debugLog.debug('Home page rendered', { state, isLoaded });

  // Quando si sblocca una nuova lettera, scorri fino al messaggio appena sbloccato
  useEffect(() => {
    if (!isLoaded) return;
    if (showTutorial || showWelcome || showFinalLetter) return;
    if (latestUnlockedLevel === undefined || latestUnlockedLevel === null) return;

    // aspetta il render del DOM
    const t = window.setTimeout(() => {
      const el = document.getElementById(`letter-level-${latestUnlockedLevel}`);
      if (!el) return;
      debugLog.info('Scrolling to latest unlocked letter', { latestUnlockedLevel });
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    return () => window.clearTimeout(t);
  }, [isLoaded, latestUnlockedLevel, showFinalLetter, showTutorial, showWelcome]);
  
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
      // Il nuovo livello sbloccato è quello successivo a quello corrente
      setLatestUnlockedLevel(state.currentLevel + 1);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };
  
  const handleOpenFinalLetter = () => {
    debugLog.info('Opening final letter');
    setShowFinalLetter(true);
    // forza remount (utile se si riapre dopo replay)
    setFinalLetterRunId((v) => v + 1);
    setTimeout(() => {
      const el = document.querySelector('.final-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReplayFinalLetter = () => {
    debugLog.info('Replaying final letter animation');
    setForceReplayAnimation(true);
    setFinalLetterRunId((v) => v + 1);
    setTimeout(() => {
      const el = document.querySelector('.final-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const startFooterHold = () => {
    if (resetHoldTimerRef.current) window.clearTimeout(resetHoldTimerRef.current);
    resetHoldTimerRef.current = window.setTimeout(() => {
      debugLog.info('Footer long-press: open reset dialog');
      setShowResetDialog(true);
    }, 5000);
  };

  const cancelFooterHold = () => {
    if (resetHoldTimerRef.current) {
      window.clearTimeout(resetHoldTimerRef.current);
      resetHoldTimerRef.current = null;
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
  const canOpenFinalLetter = state.currentLevel >= 3 && !showFinalLetter;
  const totalPieces = 3; // tutorial non conta
  const currentPieces = Math.min(Math.max(state.currentLevel, 0), totalPieces); // 0..3 (tutorial=0)
  
  return (
    <main className="main-container">
      {/* Success notification */}
      {/* {showSuccess && (
        <div className="success-notification">
          <div className="success-content">
            <span className="success-icon">✨</span>
            <span className="success-text">Nuovo messaggio sbloccato!</span>
            <span className="success-icon">✨</span>
          </div>
        </div>
      )} */}
      
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
          Livello {currentPieces} di {totalPieces}
        </p>
      </header>
      
      {/* Final Letter (se aperta) */}
      {showFinalLetter && (
        <div className="final-section">
          {state.finalLetterRevealed && (
            <div className="final-replay-bar">
              <button
                type="button"
                className="final-replay-button"
                onClick={handleReplayFinalLetter}
              >
                Riavvia la Lettera 💝
              </button>
            </div>
          )}
          <FinalLetter
            key={finalLetterRunId}
            animate={forceReplayAnimation || !state.finalLetterRevealed}
            onComplete={() => {
              // Segna come rivelata solo dopo la prima animazione completata
              markFinalLetterRevealed();
              setForceReplayAnimation(false);
            }}
          />
        </div>
      )}
      
      {/* Letters History */}
      {unlockedLetters.length > 0 && !showFinalLetter && (
        <LettersHistory 
          letters={unlockedLetters} 
          latestLevel={latestUnlockedLevel}
        />
      )}
      
      {/* Pulsante per aprire lettera finale (quando sbloccato livello 3) */}
      {canOpenFinalLetter && (
        <div className="final-unlock-section">
          <div className="final-unlock-content">
            <h2 className="final-unlock-title">Tutti i pezzi sono al loro posto </h2>
            <p className="final-unlock-text">
              Sei pronta per scoprire il regalo?
            </p>
            <button 
              onClick={handleOpenFinalLetter}
              className="final-unlock-button"
            >
              Apri la Lettera Finale 💝
            </button>
          </div>
        </div>
      )}
      
      {/* Code Input (solo se non può ancora aprire la lettera finale) */}
      {!canOpenFinalLetter && !showFinalLetter && (
        <div className="input-section">
          <CodeInput 
            onCodeSubmit={handleNewCodeSubmit}
            currentLevel={state.currentLevel}
          />
        </div>
      )}
      
      {/* Footer */}
      <footer className="app-footer">
        <button
          type="button"
          className="app-footer-hold"
          onPointerDown={startFooterHold}
          onPointerUp={cancelFooterHold}
          onPointerCancel={cancelFooterHold}
          onPointerLeave={cancelFooterHold}
          onContextMenu={(e) => e.preventDefault()}
          aria-label="Tieni premuto 5 secondi per reset"
        >
          Fatto con il ❤️ da Danilo per i 22 anni di Diana
        </button>
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

      <ScrollToBottomFab />

      <ResetAppDialog
        open={showResetDialog}
        onClose={() => setShowResetDialog(false)}
        onConfirm={() => {
          resetAllAppStorage();
          // ricarica per tornare allo stato iniziale (welcome/tutorial)
          window.location.reload();
        }}
      />
    </main>
  );
}
