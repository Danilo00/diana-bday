# Lettere per Diana - Sistema a Livelli 🎁

Applicazione interattiva per un regalo di compleanno con sistema di sblocco progressivo tramite codici.

## 🎯 Caratteristiche

- **Sistema a livelli**: 3 livelli reali (il tutorial non conta nel contatore)
- **Sblocco progressivo**: ogni codice sblocca il pezzo successivo
- **Persistenza locale**: stato salvato in localStorage
- **Mobile-first**: design ottimizzato per smartphone
- **Debug logging**: sistema di logging configurabile
- **Zero backend**: tutto funziona client-side
- **Bottone flottante**: scorri sempre in fondo (utile per leggere i nuovi messaggi)

## 🚀 Installazione

```bash
# Installa le dipendenze
npm install

# Avvia in modalità sviluppo
npm run dev

# Build per produzione
npm run build
npm start
```

## 🎮 Come Funziona

1. **Welcome Screen**: introduzione al gioco
2. **Tutorial**: spiega il meccanismo e richiede il primo codice
3. **3 Lettere Progressive**: ogni codice sblocca un nuovo pezzo (Livello 1-3)
4. **Lettera Finale**: si apre con un pulsante dopo il terzo pezzo

## 🔐 Codici Predefiniti

I codici sono configurati in `lib/codes.ts`:

- `A7Q9` - Tutorial (livello 0)
- `R4T8` - Lettera 1 (livello 1)
- `C3M7` - Lettera 2 (livello 2)
- `Z9K2` - Lettera 3 (livello 3)

**Nota**: la lettera finale non richiede un codice: si apre con il pulsante **“Apri la Lettera Finale 💝”**.

**⚠️ Importante**: Modifica questi codici prima di usare l'app!

## 📝 Personalizzazione Contenuti

### Lettere Digitali

Modifica `lib/content.ts` per personalizzare:
- Contenuto delle lettere (array `LETTERS`)
- Lettera finale (`FINAL_LETTER`)
- Titoli e date

### Token speciali nella lettera finale

Dentro `FINAL_LETTER.content` puoi usare:
- `[PAUSE]`, `[PAUSE_LONG]`, `[PAUSE_FINAL]`: pause tra le sezioni
- `[PAUSE_BEAT]`: **pausa breve extra** (a tua discrezione)
- `[IMAGE_1]`, `[IMAGE_2]`, `[IMAGE_3]`: indizi
- `[TICKET]`: ticket finale

### Stile e Colori

Modifica le variabili CSS in `app/globals.css`:
```css
:root {
  --color-primary: #ff6b9d;
  --color-secondary: #c44569;
  --color-accent: #ffa502;
  /* ... */
}
```

## 🐛 Debug

### Abilitare il debug

Metodo 1 - Variabile d'ambiente:
```env
NEXT_PUBLIC_DEBUG_ENABLE=true
NEXT_PUBLIC_DEBUG_LEVEL=4
```

Metodo 2 - Console del browser:
```javascript
window.DEBUG_ENABLE = true;
```

### Livelli di debug

- `1` = CRITICAL - Solo errori critici
- `2` = ERROR - Errori e problemi
- `3` = INFO - Informazioni importanti
- `4` = DEBUG - Tutti i dettagli

### Reset dello stato

Console del browser:
```javascript
localStorage.removeItem('diana-bday-state');
location.reload();
```

## 🏗️ Struttura del Progetto

```
├── app/
│   ├── page.tsx          # Pagina principale con orchestrazione
│   ├── layout.tsx        # Layout e metadata
│   └── globals.css       # Stili globali
├── components/
│   ├── Welcome.tsx       # Schermata di benvenuto
│   ├── Tutorial.tsx      # Tutorial interattivo
│   ├── CodeInput.tsx     # Input per codici
│   ├── LetterDisplay.tsx # Visualizzazione singola lettera
│   ├── LettersHistory.tsx # Storia lettere sbloccate
│   └── FinalLetter.tsx   # Lettera finale con immagini
│   └── ScrollToBottomFab.tsx # Bottone flottante "vai in fondo"
├── lib/
│   ├── debug.ts          # Sistema di logging
│   ├── codes.ts          # Validazione codici
│   ├── storage.ts        # Gestione localStorage
│   └── content.ts        # Contenuti lettere
└── hooks/
    └── useAppState.ts    # Hook gestione stato
```

## 🎨 Componenti

Tutti i componenti sono:
- **Modulari**: riutilizzabili e configurabili via props
- **Sotto 300 righe**: per facilitare manutenzione
- **Con debug logging**: ogni azione è tracciata
- **Type-safe**: completamente tipizzati con TypeScript

## 📱 Supporto Browser

- Chrome/Edge (moderno)
- Safari (iOS 12+)
- Firefox (moderno)

## 🔒 Sicurezza

- Nessun dato sensibile
- Tutto funziona offline dopo il primo caricamento
- Nessuna chiamata a backend esterni
- Stato salvato solo localmente

## 📦 Dipendenze

- Next.js 15
- React 19
- TypeScript
- (Nessun Tailwind: styling custom in `app/globals.css`)

## 🎁 Personalizzazione Finale

Prima di usare l'app:

1. ✅ Modifica i codici in `lib/codes.ts`
2. ✅ Personalizza i contenuti in `lib/content.ts`
3. ✅ Sostituisci i placeholder delle immagini
4. ✅ Aggiorna i colori (opzionale)
5. ✅ Testa il flusso completo
6. ✅ Build di produzione

## 📄 Licenza

Progetto personale - Tutti i diritti riservati

---

Fatto con il ❤️ da Danilo per i 22 anni di Diana
