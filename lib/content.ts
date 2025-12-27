/**
 * Contenuti delle lettere digitali
 */

export interface LetterContent {
  level: number;
  title: string;
  content: string;
  date?: string;
}

export const LETTERS: LetterContent[] = [
  {
    level: 0,
    title: 'Benvenuta',
    content: `Hai inserito il codice di esempio. Ora sai come funziona l’app: facile, vero?

Apri la prima scatola.
Ti aspetta il primo mini-gioco: trova gli intrusi!`,
    date: 'Tutorial',
  },
  {
    level: 1,
    title: 'Primo Pezzo',
    content: `Ok.

Il primo gioco era molto semplice, serviva a rompere il ghiaccio.
Il prossimo mini-gioco ti farà perdere più tempo, armati di pazienza.

Per ora non serve capire nulla.

Continua a giocare.`,
    date: 'Livello 1'
  },
  {
    level: 2,
    title: 'Secondo Pezzo',
    content: `Non tutto va spiegato subito.

Alcune cose funzionano solo
quando smetti di cercare risposte
e continui ad andare avanti.

Hai sbloccato il secondo pezzo.

C'è ancora un ultimo gioco, tranquilla è più semplice del secondo.`,
    date: 'Livello 2'
  },
  {
    level: 3,
    title: 'Terzo Pezzo',
    content: `Ok.

Dai, questa era facile.

I giochi sono finiti, congratulazioni.

Ora puoi aprire la lettera finale.

Leggi ad alta voce`,
    date: 'Livello 3'
  },
];

export const FINAL_LETTER = {
  level: 3,
  title: 'La Lettera',
  content: `Ora puoi fermarti.

Ora... posso dirti tutto.

[PAUSE]

C'è stato un compleanno in cui, senza saperlo, ho alzato l'asticella molto in alto.

[PAUSE]

Ti avevo promesso un viaggio.
Che poi alla fine abbiamo fatto insieme.

[PAUSE]

Negli anni ho pensato tante volte a come superare quel regalo…

[PAUSE]

E alla fine ho capito una cosa.

[PAUSE_LONG]

Non dovevo superarlo.

[PAUSE]

Potevo uguagliarlo.

[PAUSE]

E per farlo, ho provato a raccontartelo senza dirtelo...

[PAUSE]

[INDIZI_START]

[IMAGE_1]

[PAUSE_BEAT]

Nel primo gioco c'era un aereo.

Perché quello che faremo
è partire.

[PAUSE]

[IMAGE_2]

[PAUSE_BEAT]

Nel secondo c'era un fiore.

Perché il momento giusto
è quando tutto fiorisce, la primavera.

[PAUSE]

[IMAGE_3]

[PAUSE_BEAT]

Nell'ultimo c'era una pallina rossa, su uno sfondo bianco.

Una bandiera, la nostra destinazione.

[PAUSE_FINAL]

Buon compleanno amore.

[TICKET]`,
};

/**
 * Ottiene il contenuto di una lettera per livello
 */
export function getLetterContent(level: number): LetterContent | null {
  return LETTERS.find(l => l.level === level) || null;
}
