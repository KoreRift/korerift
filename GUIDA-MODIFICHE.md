# 🛠️ Guida alle modifiche di KoreRift

Questa guida spiega **passo passo** come aggiungere giochi, guide e build da solo,
senza bisogno di saper programmare. Tienila sempre a portata di mano.

- **Cartella progetto:** `C:\Users\bened\korerift`
- **Sito online:** https://korerift.com
- **GitHub:** https://github.com/KoreRift/korerift

---

## 0. Il ciclo: come si lavora ogni volta

Apri **PowerShell** nella cartella del progetto:

```powershell
cd C:\Users\bened\korerift
```

Mentre modifichi, tieni acceso l'**anteprima dal vivo** (si aggiorna da sola):

```powershell
npm run dev
```

Poi apri **http://localhost:4321** nel browser. Per fermare l'anteprima: `CTRL + C`.

Quando hai finito e sei soddisfatto, **salva e pubblica**:

```powershell
git add -A
git commit -m "descrizione di cosa hai cambiato"
git push                # salva su GitHub (backup)
npm run build           # genera la cartella dist/
```

Infine **carica il contenuto di `dist/` su TopHost via FTP** (FileZilla).

> 💡 Più avanti possiamo automatizzare gli ultimi due passi con GitHub Actions:
> a quel punto basterà `git push` e il sito si aggiorna da solo.

---

## 1. Aggiungere una GUIDA

Le guide sono semplici file di testo in formato **Markdown** (`.md`).

### Passi
1. Vai nella cartella `src/content/guide/`
2. **Copia** un file esistente (es. `wuthering-waves-tier-list.md`) e **rinominalo**.
   Il nome del file diventa l'indirizzo: `nuova-guida.md` → `korerift.com/guide/nuova-guida`
   → usa solo lettere minuscole e trattini, niente spazi o accenti.
3. Apri il nuovo file e modifica le due parti:

#### Parte A — l'intestazione (tra i `---`)

```yaml
---
title: "Titolo della guida"
game: "Genshin Impact"          # deve combaciare con un gioco esistente
description: "Sottotitolo breve che appare nella card"
category: "GUIDA"               # GUIDA, BUILD oppure NEWS
date: 2026-06-19                # data di pubblicazione (anno-mese-giorno)
readingTime: "5 min lettura"
thumb: "gt-genshin"             # colore copertina (vedi tabella sotto)
emoji: "⚔️"                      # emoji mostrata sulla card
---
```

**Colori copertina disponibili (`thumb`):**

| Valore        | Colore        |
|---------------|---------------|
| `gt-wuwa`     | viola         |
| `gt-genshin`  | blu           |
| `gt-mha`      | verde         |
| `gt-creator`  | rosa/magenta  |

#### Parte B — il testo (sotto i `---`)

Scrivi normalmente. Comandi Markdown utili:

```markdown
## Titolo di sezione
### Sottotitolo

Testo normale. Per il **grassetto** usa due asterischi.

- elemento elenco
- altro elemento

1. elenco numerato
2. secondo punto

> Questo è un riquadro evidenziato (consiglio/nota)

[testo del link](/guide)
```

4. Salva. La guida appare **da sola** in `/guide`, nella home, e nella pagina del
   suo gioco (se il campo `game` combacia). Non devi toccare nient'altro.

### Copertina della card (campo `cover`)

Di default la card di un contenuto mostra lo sfondo colorato (`thumb`) + l'emoji.
Per metterci un'**immagine vera**, aggiungi nell'intestazione:

```yaml
cover: "/games/nte/nte_icon_Zero.png"
```

- Punta a qualsiasi immagine in `public/...` (il percorso parte da `/`, **senza** `public`).
- Per il risultato migliore usa un'immagine **16:10** (es. 800×500): viene ritagliata
  a riempimento e allineata in alto.
- Immagini pesanti → mettile in `public/games/...` e lancia `npm run ottimizza`.
- Togli la riga `cover:` per tornare allo sfondo colorato + emoji.

---

## 2. Aggiungere una SCHEDA BUILD (come quella di Zero)

Le build "ricche" con Core Build, Stats e Team usano un **template grafico**: compili
solo i dati ordinati nell'intestazione e il sito li impagina con icone e ritratti.

1. Copia `src/content/guide/zero-mc-build.md` e rinominalo (es. `nanally-build.md`).
2. Cambia i dati. Ecco tutti i campi disponibili:

```yaml
---
title: "Nanally — Best Build"
game: "Neverness To Everness"        # deve combaciare con un gioco in games.ts
description: "Sottotitolo breve"
category: "BUILD"
date: 2026-06-21
readingTime: "5 min lettura"
thumb: "gt-creator"
emoji: "🌃"
cover: "/games/nte/nte_icon_Nanally.png"

layout: "build"          # ATTIVA il template grafico (senza questa riga = guida normale)
character: "Nanally"     # personaggio principale (ritratto grande in alto)
version: "1.0"

coreBuild:               # le voci del Core Build (arma/moduli)
  - role: "Best Arc"
    name: "Day Off"       # nome ESATTO (serve a trovare l'icona)
    type: "weapon"        # "weapon" oppure "module"
    tag: "BIS + F2P"
    desc: "Descrizione breve."

mainStats:               # stat principali (con quando usarle)
  - when: "A3"
    stat: "CRIT DMG"

subStats: ["CRIT RATE", "CRIT DMG", "ATK %", "DMG %"]

skillPriority: "Skill = Ultimate · Basic Attack = Support Skill"

teams:                   # team consigliati
  - name: "Blossom Core"
    desc: "Descrizione del team."
    members: ["Nanally", "Jiuyuan", "Sakiri", "Zero"]   # nomi ESATTI

note: "Nota finale della sezione Core Build."
tip: "Consiglio finale in evidenza."
---
```

**Le icone si agganciano DA SOLE dal nome**, seguendo la convenzione dei file in
`public/games/<gioco>/`:
- Personaggi → `<gioco>_icon_<Nome>.png` &nbsp;(es. `nte_icon_Zero.png`)
- Armi/Arc → `<gioco>_weapon_<Nome>.png` &nbsp;(es. `nte_weapon_Day_Off.png`)
- Moduli → `<gioco>_module_<Nome>.png` &nbsp;(es. `nte_module_Lost_Radiance.png`)

Quindi basta che `name`/`members`/`character` combacino col nome del file
(gli spazi diventano `_`).

#### Importare gli asset di un gioco (una tantum)
Tutti gli asset NTE sono già nel progetto. Per un **nuovo gioco** copi e ottimizzi
un'intera cartella di immagini con un comando:

```powershell
npm run asset -- -Source "C:\percorso\della\cartella" -Slug <slug-del-gioco>
```

- `-Source` = la cartella con le immagini (tra virgolette se ha spazi)
- `-Slug` = lo slug del gioco **esatto** come in `games.ts`

Il comando ridimensiona a 256px mantenendo la **trasparenza PNG**, e mette tutto in
`public/games/<slug>/` **conservando i nomi originali dei file**.

##### ⚠️ Il prefisso dei file
Le icone si trovano cercando `<prefisso>_icon_<Nome>.png` (e `_weapon_`, `_module_`).
Il prefisso, per default, è lo **slug** del gioco. Se i tuoi file usano un prefisso
diverso, indicalo in `games.ts` con `assetPrefix`.

**Esempio — Wuthering Waves** (slug `wuthering-waves`, file tipo `wuwa_icon_Changli.png`):

```powershell
npm run asset -- -Source "C:\Users\bened\Desktop\KoreRift\WuWa\WUWA ASSET" -Slug wuthering-waves
```

Poi in `src/data/games.ts`, sul gioco Wuthering Waves, aggiungi:

```ts
assetPrefix: "wuwa",
```

Fatto: ora in una scheda build puoi scrivere `members: ["Changli", ...]` e l'icona
`wuwa_icon_Changli.png` si aggancia da sola. (Per NTE non serve: slug e prefisso
coincidono entrambi in `nte`.)

> 📁 **Dove metto la scheda?** In `src/content/guide/` appare tra le *Guide*;
> in `src/content/build/` appare tra le *Build*. In entrambi i casi compare anche
> nella pagina del suo gioco. La build di Zero è in `guide/`.

> ⚠️ Se un'icona non compare, controlla che il file esista in `public/games/<gioco>/`
> con il nome esatto (maiuscole comprese).

---

## 3. Aggiungere un GIOCO

I giochi sono elencati in **un solo file**: `src/data/games.ts`.

1. Apri `src/data/games.ts`
2. Copia un blocco esistente e aggiungilo alla lista:

```ts
{
  slug: "wuthering-waves",          // indirizzo: /giochi/wuthering-waves (minuscole e trattini)
  name: "Wuthering Waves",          // IMPORTANTE: deve essere IDENTICO al campo "game" delle guide
  thumb: "gt-wuwa",                 // colore di riserva se non c'è un'immagine
  emoji: "🌊",
  tagline: "Action RPG dinamico e veloce.",
  image: "/games/wuthering-waves.jpg",  // (opzionale) banner immagine — vedi punto 4
},
```

3. Salva. Il gioco appare nella pagina `/giochi` come banner cliccabile, e la sua
   pagina `/giochi/<slug>` mostrerà automaticamente tutte le guide/build con quel `name`.

> ⚠️ La regola d'oro: il `name` del gioco qui e il `game` nelle guide
> **devono essere scritti esattamente uguali** (maiuscole comprese), altrimenti
> il collegamento non funziona.

---

## 4. Aggiungere le IMMAGINI dei banner

1. Crea (se non c'è) la cartella `public/games/`
2. Metti dentro le tue immagini, es. `public/games/genshin-impact.jpg`
3. In `src/data/games.ts`, nel gioco corrispondente, aggiungi/aggiorna il campo:
   `image: "/games/genshin-impact.jpg"`
   (l'indirizzo parte da `/games/...`, **senza** scrivere `public`)

### Formato immagini banner
- **Rapporto:** 16:9
- **Risoluzione consigliata:** 1280 × 720 px (o 1600 × 900)
- **Formato:** JPG o WebP (più leggeri), max ~300 KB
- **Zona sicura:** il sito mette nome + sottotitolo in basso a sinistra.
  Tieni il soggetto principale in alto/al centro.

### Alleggerire le immagini pesanti (importante!)
Le immagini appena create pesano spesso 2-3 MB: troppo. C'è un comando che le
ottimizza tutte in automatico.

1. Metti le immagini (anche pesanti) in `public/games/` — conviene nominarle
   come lo `slug` del gioco, es. `gta-vi.png`, `league-of-legends.png`
2. Apri PowerShell nella cartella del progetto ed esegui:

   ```powershell
   npm run ottimizza
   ```

3. Lo script ridimensiona a 1280px, converte in JPG leggero e sposta gli
   originali pesanti in `_immagini-originali/` (backup, non caricato online).
4. In `src/data/games.ts`, nel gioco, metti `image: "/games/<slug>.jpg"`.

Se un gioco **non** ha il campo `image`, il sito usa automaticamente lo sfondo
colorato (`thumb`). Quindi puoi aggiungere le immagini a poco a poco.

### Banner che contiene GIÀ nome e bottone
Se la tua immagine include già il nome del gioco e/o il bottone (come il banner NTE),
aggiungi nel gioco anche:

```ts
bannerComplete: true,
```

Così il sito mostra **solo l'immagine**, senza scriverci sopra nome/sottotitolo/bottone
(che altrimenti farebbero doppione). Se invece l'immagine è "pulita" (solo artwork),
lascia perdere questa riga: il sito aggiungerà testo e bottone per te.

> 💡 Le immagini molto pesanti (oltre ~500 KB) vanno alleggerite prima di caricarle.
> Se non sai come fare, chiedimi pure e te le ottimizzo io.

---

## 5. Modificare qualcosa di esistente

- **Cambiare il testo di una guida/build:** apri il suo file `.md` e modifica.
- **Cambiare i link social / footer:** `src/components/Footer.astro` e `src/pages/community.astro`.
- **Cambiare le voci del menu:** `src/components/Navbar.astro`.
- **Cambiare i testi della home:** `src/pages/index.astro`.
- **Cambiare colori/stili:** `src/styles/global.css` (le variabili colore sono in cima, in `:root`).

Dopo ogni modifica: guarda l'anteprima (`npm run dev`), poi salva e pubblica (punto 0).

---

## 6. Errori comuni

- **La guida non compare** → controlla che l'intestazione tra `---` sia completa
  e che la `date` sia nel formato `anno-mese-giorno`.
- **La guida non appare nella pagina del gioco** → il campo `game` non combacia
  esattamente con il `name` in `games.ts`.
- **L'immagine del banner non si vede** → controlla che il file sia in `public/games/`
  e che il percorso in `image` inizi con `/games/` (senza `public`).
- **La copertina (`cover`) non si vede** → percorso sbagliato o file mancante: deve
  iniziare con `/` e il file deve esistere in `public/...`.
- **Le icone della scheda build non compaiono** → il `name`/`members` non combacia
  col nome del file in `public/games/<gioco>/` (controlla maiuscole e underscore).
- **Caratteri strani / accenti** → salva i file in formato UTF-8 (di default lo sono).
