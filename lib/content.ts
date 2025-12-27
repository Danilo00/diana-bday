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
    title: 'Benvenuta nel gioco',
    content: `Ciao amore mio,

Se stai leggendo questo, hai aperto la prima scatola e scoperto come funziona questo gioco.

Ogni lettera fisica che troverai conterrà un codice.
Ogni codice sbloccherà una parte del messaggio che ho preparato per te.

Non cercare di saltare avanti.
Non leggere tutto in una volta.
Ogni pezzo ha senso solo quando arriva il suo momento.

Alla fine, tutto si ricomporrà.

Questo è solo l'inizio.

Con tutto il mio amore,
Il tuo esploratore di sogni`,
    date: '27 Dicembre 2025'
  },
  {
    level: 1,
    title: 'Frammento I',
    content: `Diana,

Ricordi quella sera sul balcone?
Le stelle, il freddo, le tue mani nelle mie.
Hai detto: "Un giorno vorrei vedere il mondo con te."

Quel giorno non mi sembrava reale.
Ora lo è.

Ma ancora non puoi sapere cosa significa.
Continua a giocare.`,
    date: 'Lettera 1'
  },
  {
    level: 2,
    title: 'Frammento II',
    content: `Ogni volta che parliamo di viaggi,
i tuoi occhi si illuminano.

Tokyo. Kyoto. I ciliegi in fiore.
I templi. Le lucine. Il monte Fuji.

Ne parli come di un sogno lontano.

E se ti dicessi che i sogni
a volte si avvicinano più di quanto pensi?

Ancora un passo.`,
    date: 'Lettera 2'
  },
  {
    level: 3,
    title: 'Frammento III',
    content: `Ho passato settimane a organizzare questo momento.
Ogni scatola, ogni indizio, ogni parola.

Volevo che fosse speciale.
Volevo che fosse magico.
Volevo che fossi tu al centro di tutto.

Perché meriti la magia.
Perché meriti il mondo.

E il mondo sta per aprirsi davanti a te.

Un ultimo codice. Un ultimo passo.`,
    date: 'Lettera 3'
  },
];

export const FINAL_LETTER = {
  level: 4,
  title: '🌸 Il Regalo 🌸',
  content: `Diana, amore mio,

Ogni scatola che hai aperto, ogni codice che hai inserito, ogni lettera che hai letto... tutto ti ha portato qui.

Questo non è solo un gioco.
È un viaggio che inizia oggi e continua davvero.

Perché...

[IMAGE_1]

...ricordi le differenze che hai trovato?
Erano indizi.

[IMAGE_2]

...e il fiore?
Non era solo decorazione.

[IMAGE_3]

...e la pallina rossa?
Era la bandiera che cercavi.

La bandiera del Giappone.

Perché Diana, 

[TICKET]

STIAMO ANDANDO IN GIAPPONE.

Io e te.
I ciliegi in fiore.
Le strade di Tokyo.
I templi di Kyoto.
Il monte Fuji all'alba.

Tutto quello di cui hai sempre sognato.

Questo è il tuo regalo.
Questo è il nostro regalo.

Perché i sogni non devono restare sogni.
E perché voglio vedere il mondo attraverso i tuoi occhi.

Buon compleanno, amore mio.
Preparati a vivere la magia.

Con tutto me stesso,
[Il tuo nome]

P.S. Le date esatte sono dentro l'ultima scatola. Preparati a fare la valigia! 🎌✈️🌸`,
};

/**
 * Ottiene il contenuto di una lettera per livello
 */
export function getLetterContent(level: number): LetterContent | null {
  return LETTERS.find(l => l.level === level) || null;
}

