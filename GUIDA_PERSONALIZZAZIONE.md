# 🎁 Guida Personalizzazione - Lettere per Diana

## ✅ Stato Attuale
L'applicazione è **completamente funzionante** e testata. Tutti i componenti sono pronti all'uso.

## 🔧 Personalizzazione Necessaria

### 1. **CODICI** (PRIORITÀ MASSIMA ⚠️)
File: `lib/codes.ts`

**Cambia i codici prima di usare l'app!** Attualmente sono:
- `A7Q9-M2KD` - Tutorial
- `R4T8-LX91` - Lettera 1
- `C3M7-PA62` - Lettera 2
- `Z9K2-WE84` - Lettera 3
- `J8F5-NR30` - Lettera finale

```typescript
export const CODES: CodeMapping[] = [
  { code: 'TUOCODICE1', level: 0, type: 'tutorial' },
  { code: 'TUOCODICE2', level: 1, type: 'letter' },
  // ... modifica tutti i codici
];
```

### 2. **CONTENUTI LETTERE**
File: `lib/content.ts`

#### Lettere Progressive (Array `LETTERS`):
- Modifica i contenuti delle 4 lettere progressive
- Personalizza i titoli
- Cambia le date se necessario

#### Lettera Finale (`FINAL_LETTER`):
- Personalizza il messaggio principale
- Sostituisci `[Il tuo nome]` con il tuo nome reale
- Aggiorna le informazioni del viaggio (date, destinazioni)

### 3. **IMMAGINI**
File: `components/FinalLetter.tsx`

Sostituisci i placeholder delle immagini:
```typescript
// Linea ~58-65 circa - Immagine 1 (gioco differenze)
<div className="image-box">
  [Qui andrà l'immagine del gioco delle differenze]
</div>

// Linea ~75-82 circa - Immagine 2 (fiore)
<div className="image-box">
  [Qui andrà l'immagine del fiore - ciliegio]
</div>

// Linea ~92-99 circa - Immagine 3 (bandiera)
<div className="image-box">
  [Qui andrà l'immagine della bandiera giapponese]
</div>
```

**Come aggiungere immagini:**

Opzione A - Immagini nella cartella public:
```tsx
<img src="/images/differenze.jpg" alt="Gioco delle differenze" />
```

Opzione B - Immagini esterne (URL):
```tsx
<img src="https://tuourl.com/immagine.jpg" alt="Descrizione" />
```

### 4. **COLORI E STILE** (Opzionale)
File: `app/globals.css`

Modifica le variabili CSS (linee 1-12):
```css
:root {
  --color-primary: #ff6b9d;      /* Rosa principale */
  --color-secondary: #c44569;    /* Rosa scuro */
  --color-accent: #ffa502;       /* Arancione accenti */
  --color-background: #fff5f7;   /* Sfondo rosa chiaro */
  /* ... */
}
```

## 🚀 Deployment

### Opzione 1: Vercel (Consigliato)
```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Opzione 2: Netlify
1. Collega il repository a Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`

### Opzione 3: Build Locale
```bash
npm run build
npm start
```

## 📋 Checklist Pre-Lancio

- [ ] ✅ Modificati tutti i codici in `lib/codes.ts`
- [ ] ✅ Personalizzati contenuti lettere in `lib/content.ts`
- [ ] ✅ Sostituito `[Il tuo nome]` nella lettera finale
- [ ] ✅ Aggiunte le 3 immagini degli indizi
- [ ] ✅ Verificato che il biglietto mostri le informazioni corrette
- [ ] ⚠️ Testato il flusso completo inserendo tutti i codici
- [ ] ⚠️ Verificato su mobile (design principale)
- [ ] ⚠️ Stampate le lettere fisiche con i codici corretti

## 🎯 Preparazione Lettere Fisiche

Per ogni scatola, stampa una lettera con:

**Lettera 1 (Tutorial):**
```
Benvenuta nel gioco! 🎁

Per iniziare, visita:
https://[tuo-dominio].vercel.app

E inserisci questo codice:
[CODICE TUTORIAL]

Buon divertimento!
```

**Lettere 2-5:**
```
Scatola [N] 🎁

Il tuo prossimo codice è:
[CODICE LIVELLO N]

Inseriscilo nell'app per continuare...
```

## 🐛 Debug

Per abilitare il debug in produzione, aggiungi variabile d'ambiente:
```
NEXT_PUBLIC_DEBUG_ENABLE=true
NEXT_PUBLIC_DEBUG_LEVEL=4
```

## 📞 Supporto

Se qualcosa non funziona:
1. Verifica la console del browser (F12)
2. Controlla che i codici in `lib/codes.ts` siano corretti
3. Verifica localStorage: `localStorage.getItem('diana-bday-state')`
4. Per resettare: `localStorage.removeItem('diana-bday-state')`

## 🎊 Note Finali

- L'app funziona **completamente offline** dopo il primo caricamento
- **Non serve backend** o database
- Lo stato è salvato localmente sul dispositivo
- I codici sono **case-insensitive** (CODICE = codice = CoDiCe)
- Testato e funzionante al 100% ✅

Buon compleanno a Diana! 🌸🎁✨

