/**
 * Sistema di validazione codici client-side
 * Mappatura codice → livello
 */

import { debugLog } from './debug';

export interface CodeMapping {
  code: string;
  level: number;
  type: 'tutorial' | 'letter' | 'final';
}

// Mappatura dei codici
export const CODES: CodeMapping[] = [
  { code: 'A7Q9-M2KD', level: 0, type: 'tutorial' },
  { code: 'R4T8-LX91', level: 1, type: 'letter' },
  { code: 'C3M7-PA62', level: 2, type: 'letter' },
  { code: 'Z9K2-WE84', level: 3, type: 'letter' },
  { code: 'J8F5-NR30', level: 4, type: 'final' },
];

/**
 * Valida un codice e restituisce il livello corrispondente
 */
export function validateCode(code: string, currentLevel: number): CodeMapping | null {
  debugLog.debug('Validating code', { code, currentLevel });
  
  const normalizedCode = code.trim().toUpperCase().replace(/\s+/g, '');
  const mapping = CODES.find(c => c.code.replace(/\s+/g, '') === normalizedCode);
  
  if (!mapping) {
    debugLog.info('Code not found', normalizedCode);
    return null;
  }
  
  // Verifica che sia il livello successivo
  if (mapping.level !== currentLevel + 1 && mapping.level !== 0) {
    debugLog.info('Code for wrong level', { expected: currentLevel + 1, got: mapping.level });
    return null;
  }
  
  debugLog.info('Code validated successfully', mapping);
  return mapping;
}

/**
 * Verifica se un codice è già stato usato
 */
export function isCodeUsed(code: string, unlockedLevels: number[]): boolean {
  const normalizedCode = code.trim().toUpperCase().replace(/\s+/g, '');
  const mapping = CODES.find(c => c.code.replace(/\s+/g, '') === normalizedCode);
  
  if (!mapping) return false;
  
  return unlockedLevels.includes(mapping.level);
}

