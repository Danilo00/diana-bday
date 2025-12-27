/**
 * Sistema di debug logging con livelli configurabili
 * 
 * Livelli:
 * 1 = CRITICAL - Solo errori critici
 * 2 = ERROR - Errori e problemi
 * 3 = INFO - Informazioni importanti
 * 4 = DEBUG - Tutti i dettagli
 */

const DEBUG_ENABLE = process.env.NEXT_PUBLIC_DEBUG_ENABLE === 'true';
const DEBUG_LEVEL = parseInt(process.env.NEXT_PUBLIC_DEBUG_LEVEL || '4', 10);

export const debugLog = {
  critical: (message: string, ...args: unknown[]) => {
    const localDebug = typeof window !== 'undefined' && (window as any).DEBUG_ENABLE === true;
    if ((DEBUG_ENABLE || localDebug) && DEBUG_LEVEL >= 1) {
      console.error(`[CRITICAL] ${message}`, ...args);
    }
  },
  
  error: (message: string, ...args: unknown[]) => {
    const localDebug = typeof window !== 'undefined' && (window as any).DEBUG_ENABLE === true;
    if ((DEBUG_ENABLE || localDebug) && DEBUG_LEVEL >= 2) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: unknown[]) => {
    const localDebug = typeof window !== 'undefined' && (window as any).DEBUG_ENABLE === true;
    if ((DEBUG_ENABLE || localDebug) && DEBUG_LEVEL >= 3) {
      console.info(`[INFO] ${message}`, ...args);
    }
  },
  
  debug: (message: string, ...args: unknown[]) => {
    const localDebug = typeof window !== 'undefined' && (window as any).DEBUG_ENABLE === true;
    if ((DEBUG_ENABLE || localDebug) && DEBUG_LEVEL >= 4) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }
};

