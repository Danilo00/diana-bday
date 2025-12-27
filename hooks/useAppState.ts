/**
 * Custom Hook per gestire lo stato dell'applicazione
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { debugLog } from '@/lib/debug';
import { 
  AppState, 
  loadState, 
  saveState, 
  unlockLevel, 
  completeTutorial,
  setFinalLetterRevealed,
} from '@/lib/storage';
import { validateCode, isCodeUsed } from '@/lib/codes';
import { getLetterContent } from '@/lib/content';

export function useAppState() {
  const [state, setState] = useState<AppState>({
    tutorialCompleted: false,
    unlockedLevels: [],
    currentLevel: -1,
    finalLetterRevealed: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Carica lo stato all'avvio
  useEffect(() => {
    debugLog.info('Loading initial state');
    const loaded = loadState();
    setState(loaded);
    setIsLoaded(true);
    debugLog.info('State loaded', loaded);
  }, []);
  
  // Salva lo stato quando cambia
  useEffect(() => {
    if (isLoaded) {
      debugLog.debug('Saving state', state);
      saveState(state);
    }
  }, [state, isLoaded]);
  
  // Completa il tutorial
  const handleCompleteTutorial = useCallback(() => {
    debugLog.info('Completing tutorial');
    setState((prev) => completeTutorial(prev));
  }, []);

  const markFinalLetterRevealed = useCallback(() => {
    debugLog.info('Marking final letter as revealed');
    setState((prev) => setFinalLetterRevealed(prev, true));
  }, []);
  
  // Valida e sblocca un livello
  const handleCodeSubmit = useCallback((code: string): boolean => {
    debugLog.info('Validating code', { code, currentLevel: state.currentLevel });
    setError(null);
    
    // Verifica se il codice è già stato usato
    if (isCodeUsed(code, state.unlockedLevels)) {
      debugLog.info('Code already used', code);
      setError('Questo codice è già stato utilizzato!');
      return false;
    }
    
    // Valida il codice
    const validation = validateCode(code, state.currentLevel);
    
    if (!validation) {
      debugLog.info('Invalid code', code);
      setError('Codice non valido o livello errato. Assicurati di procedere in ordine!');
      return false;
    }
    
    // Sblocca il livello
    debugLog.info('Unlocking level', validation.level);
    setState((prev) => unlockLevel(prev, validation.level));
    setError(null);
    
    return true;
  }, [state.currentLevel, state.unlockedLevels]);
  
  // Ottiene le lettere sbloccate
  const getUnlockedLetters = useCallback(() => {
    return state.unlockedLevels
      .map((level) => getLetterContent(level))
      .filter((letter) => letter !== null)
      .sort((a, b) => a!.level - b!.level);
  }, [state.unlockedLevels]);
  
  return {
    state,
    isLoaded,
    error,
    handleCompleteTutorial,
    handleCodeSubmit,
    getUnlockedLetters,
    markFinalLetterRevealed,
  };
}

