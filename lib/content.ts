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
    title: 'Benvenuta.',
    content: `Questa applicazione serve a leggere il tuo regalo,
ma non tutto insieme.

Ogni volta che completerai un livello del gioco fisico,
riceverai un codice.

Inserendo il codice qui, sbloccherai una nuova parte del messaggio.

Alcuni contenuti, da soli, non avranno molto senso.
È normale.

Il significato completo arriverà solo alla fine.

Quando troverai un nuovo codice, inseriscilo qui sotto.`,
    date: 'Tutorial'
  },
  {
    level: 1,
    title: 'Primo Pezzo',
    content: `Ok.

Hai sbloccato il primo pezzo.

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
e continui ad andare avanti.`,
    date: 'Livello 2'
  },
  {
    level: 3,
    title: 'Ultimo Pezzo',
    content: `Hai finalmente sbloccato l'ultimo pezzo del puzzle.

Ora puoi leggere la lettera finale.`,
    date: 'Livello 3'
  },
];

export const FINAL_LETTER = {
  level: 4,
  title: 'La Lettera',
  content: `Ora puoi fermarti.

Ora posso dirti tutto.

[PAUSE]

C'è stato un compleanno in cui, senza saperlo, ho alzato l'asticella molto in alto.

[PAUSE]

Ti avevo promesso un viaggio.
E non era solo un viaggio.

[PAUSE]

Negli anni ho pensato tante volte a come superare quel regalo…

[PAUSE]

E alla fine ho capito una cosa.

[PAUSE_LONG]

Non dovevo superarlo.

Potevo uguagliarlo.

E per farlo, ho provato a raccontartelo senza dirtelo...

[INDIZI_START]

[IMAGE_1]

Nel primo gioco c'era un aereo.

Perché quello che faremo
è partire.

[PAUSE]

[IMAGE_2]

Nel secondo c'era un fiore.

Perché il momento giusto
è quando tutto fiorisce, la primavera.

[PAUSE]

[IMAGE_3]

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
