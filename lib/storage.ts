/**
 * Gestione dello stato persistente con localStorage
 */

import { debugLog } from './debug';

export interface AppState {
  tutorialCompleted: boolean;
  unlockedLevels: number[];
  currentLevel: number;
}

const STORAGE_KEY = 'diana-bday-state';

const DEFAULT_STATE: AppState = {
  tutorialCompleted: false,
  unlockedLevels: [],
  currentLevel: -1,
};

/**
 * Carica lo stato dal localStorage
 */
export function loadState(): AppState {
  if (typeof window === 'undefined') {
    return DEFAULT_STATE;
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      debugLog.debug('No stored state found, using default');
      return DEFAULT_STATE;
    }
    
    const parsed = JSON.parse(stored);
    debugLog.info('State loaded from localStorage', parsed);
    return parsed;
  } catch (error) {
    debugLog.error('Error loading state from localStorage', error);
    return DEFAULT_STATE;
  }
}

/**
 * Salva lo stato nel localStorage
 */
export function saveState(state: AppState): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    debugLog.info('State saved to localStorage', state);
  } catch (error) {
    debugLog.error('Error saving state to localStorage', error);
  }
}

/**
 * Sblocca un nuovo livello
 */
export function unlockLevel(state: AppState, level: number): AppState {
  if (state.unlockedLevels.includes(level)) {
    debugLog.info('Level already unlocked', level);
    return state;
  }
  
  const newState = {
    ...state,
    unlockedLevels: [...state.unlockedLevels, level].sort((a, b) => a - b),
    currentLevel: level,
  };
  
  debugLog.info('Level unlocked', { level, newState });
  return newState;
}

/**
 * Completa il tutorial
 */
export function completeTutorial(state: AppState): AppState {
  const newState = {
    ...state,
    tutorialCompleted: true,
  };
  
  debugLog.info('Tutorial completed');
  return newState;
}

/**
 * Reset dello stato (solo per debug)
 */
export function resetState(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(STORAGE_KEY);
  debugLog.info('State reset');
}

