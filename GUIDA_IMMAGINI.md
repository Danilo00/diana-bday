# 📸 Guida Inserimento Immagini

## Posizione delle Immagini

Le immagini vanno inserite nel componente `components/FinalLetter.tsx`.

Ci sono **3 placeholder** + **1 biglietto** da personalizzare.

---

## 🖼️ Immagine 1: Aereo (Gioco delle Differenze)

**Posizione**: Circa linea 105-115

**Placeholder attuale**:
```tsx
<div className="image-placeholder-content">
  [Inserisci qui l'immagine del gioco delle differenze con l'aereo]
</div>
```

**Come sostituire**:

### Opzione A - Immagine locale (consigliata)
1. Metti l'immagine in `public/images/aereo.jpg`
2. Sostituisci con:
```tsx
<div className="image-box">
  <img 
    src="/images/aereo.jpg" 
    alt="Gioco delle differenze - Aereo"
    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
  />
</div>
```

### Opzione B - URL esterno
```tsx
<div className="image-box">
  <img 
    src="https://tuo-url.com/aereo.jpg" 
    alt="Gioco delle differenze - Aereo"
    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
  />
</div>
```

---

## 🌸 Immagine 2: Fiore di Ciliegio

**Posizione**: Circa linea 130-140

**Placeholder attuale**:
```tsx
<div className="image-placeholder-content">
  [Inserisci qui l'immagine del fiore di ciliegio]
</div>
```

**Come sostituire**:

### Opzione A - Immagine locale
1. Metti l'immagine in `public/images/fiore.jpg`
2. Sostituisci con:
```tsx
<div className="image-box">
  <img 
    src="/images/fiore.jpg" 
    alt="Fiore di ciliegio"
    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
  />
</div>
```

---

## 🔴 Immagine 3: Bandiera Giappone

**Posizione**: Circa linea 155-165

**Placeholder attuale**:
```tsx
<div className="image-placeholder-content">
  [Inserisci qui l'immagine della pallina rossa/bandiera giapponese]
</div>
```

**Come sostituire**:

### Opzione A - Immagine locale
1. Metti l'immagine in `public/images/bandiera.jpg`
2. Sostituisci con:
```tsx
<div className="image-box">
  <img 
    src="/images/bandiera.jpg" 
    alt="Bandiera Giappone"
    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
  />
</div>
```

---

## 🎫 Biglietto Giappone (Opzionale)

Se hai una foto del biglietto reale, puoi aggiungerla nel contenuto del ticket.

**Posizione**: Circa linea 180-200

**Dentro il `ticket-content`**, aggiungi dopo la riga 205 circa:
```tsx
<div style={{ margin: '2rem 0', textAlign: 'center' }}>
  <img 
    src="/images/biglietto.jpg" 
    alt="Biglietto per il Giappone"
    style={{ 
      maxWidth: '100%', 
      height: 'auto', 
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
    }}
  />
</div>
```

---

## 📁 Struttura Cartelle Consigliata

```
diana-bday/
├── public/
│   └── images/           ← Crea questa cartella
│       ├── aereo.jpg     ← Gioco differenze
│       ├── fiore.jpg     ← Ciliegio
│       ├── bandiera.jpg  ← Bandiera Giappone
│       └── biglietto.jpg ← (Opzionale) Foto biglietto
```

---

## 🎨 Formato Immagini Consigliato

- **Formato**: JPG o PNG
- **Dimensioni**: Max 1200px larghezza
- **Peso**: Massimo 500KB per immagine
- **Aspect ratio**: 16:9 o 4:3 per migliore visualizzazione

---

## 🔧 Come Modificare il File

1. Apri `components/FinalLetter.tsx`
2. Cerca il placeholder (usa Ctrl+F):
   - `[Inserisci qui l'immagine del gioco`
   - `[Inserisci qui l'immagine del fiore`
   - `[Inserisci qui l'immagine della pallina`
3. Sostituisci con il codice fornito sopra
4. Salva il file
5. L'app si ricaricherà automaticamente (hot reload)

---

## ✅ Verifica

Dopo aver inserito le immagini:

1. Avvia l'app: `npm run dev`
2. Completa il flusso fino alla lettera finale
3. Verifica che tutte le immagini si carichino correttamente
4. Controlla su mobile (design principale)

---

## 🆘 Troubleshooting

### Le immagini non si vedono
- ✅ Verifica che siano nella cartella `public/images/`
- ✅ Controlla che il nome file corrisponda esattamente
- ✅ Ricarica la pagina (Ctrl+R)

### Le immagini sono troppo grandi
Aggiungi `maxWidth` allo style:
```tsx
style={{ 
  width: '100%', 
  maxWidth: '600px',  ← aggiungi questo
  height: 'auto' 
}}
```

### Voglio usare immagini da un servizio esterno (es. Imgur, Google Photos)
1. Carica l'immagine sul servizio
2. Ottieni il link diretto all'immagine
3. Usa l'URL nello `src` dell'img tag

---

## 💡 Suggerimento Finale

Se non hai le immagini pronte, **puoi lasciare i placeholder** e l'app funzionerà comunque perfettamente. I box delle immagini appariranno con il testo placeholder, che è già descrittivo.

Potrai sempre aggiungere le immagini reali dopo! 🎨

