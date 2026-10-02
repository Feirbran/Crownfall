# 👑 CROWNFALL — Tactical Commander Skirmish

<p align="center">
  <img src="https://img.shields.io/badge/Status-Playable_Live-gold?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Tech-Vanilla_HTML5_%2F_CSS3_%2F_JS-blue?style=for-the-badge" alt="Tech Stack">
  <img src="https://img.shields.io/badge/Audio-Procedural_Web_Audio_API-crimson?style=for-the-badge" alt="Audio Engine">
  <img src="https://img.shields.io/badge/Network-PeerJS_P2P_%2B_Supabase-green?style=for-the-badge" alt="Multiplayer">
</p>

---

## ⚔️ Cos'è Crownfall?

**Crownfall** è uno skirmish tattico *dark fantasy* a turni che fonde la profondità posizionale degli **scacchi d'assedio**, l'adrenalina del **deckbuilding di carte collezionabili** e la gestione delle risorse sul campo.

Due Condottieri si affrontano su una scacchiera 8x8 per contendersi i Frammenti della Corona Primordiale. L'obiettivo è assoluto: consacrare Altari, mobilitare truppe, manovrare con il *Flanking* (aggiramento tattico) ed **eliminare il Comandante avversario**.

---

## 🌌 Ambientazione: Gli Annali di Veridia

Dopo la **Sottrazione dell'Assoluto**, la Corona Primordiale si è spezzata in cinque frammenti di potere incommensurabile. Il piano di Veridia si è cristallizzato in una faglia tettonica dove i cinque Ordini Dominanti si scontrano senza pietà:

| Fazione | Simbolo | Filosofia & Dottrina | Comandanti Notabili |
| :--- | :---: | :--- | :--- |
| **Bastione di Ferro** | 🛡️ | Difesa d'acciaio impenetrabile, formazioni a testuggine, muri difensivi e armature pesanti. | *Valeria del Bastione*, *Garek lo Spezzatore* |
| **Ceneri del Giudizio** | 💀 | Sciacallaggio, necromanzia, cimiteri di passaggio e sacrificio di creature per alimentare il Sangue. | *Malakor del Rogo*, *Morbida la Nutrice* |
| **Marea Abissale** | 🌊 | Controllo cinetico, trascinamento nemico, aperture di voragini e manipolazione dello spazio. | *Vespera delle Maree*, *Kaelen Occhio del Vortice* |
| **Silenzio Eterno** | ⚖️ | Inquisizione dogmatica, soppressione delle magie, confisca del mana e castigo per chi spreca risorse. | *Aurelius il Giusto*, *Justiciar Kael* |
| **Forgia del Magma** | ⚒️ | Fonderie di scorie, animazione di automi meccanici e conversione di altari in truppe da guerra. | *Vulkan il Fabbro*, *Ignis la Forgia Vivente* |

---

## 🎯 I Pilastri del Gameplay

### 1. 🏛️ Altari & Economia del Mana
* All'inizio della partita disponi di 1 Mana.
* Per ampliare il Mana massimo (fino a 4 💧), devi consacrare **Altari** ortogonalmente adiacenti al tuo Comandante o ad altri Altari alleati.
* Se un Altare viene raso al suolo, la riserva di Mana massimo si riduce istantaneamente!

### 2. ⚡ Azioni & Movimento Scacchistico
* Ogni turno ti concede **2 Azioni Tattiche (⚡)**.
* Le miniature possiedono vettori di movimento unici:
  * **Ortogonale (Torre)**: truppe di fanteria e fortificazioni.
  * **Diagonale (Alfiere)**: assassini, spie e dominatori delle maree.
  * **Omnidirezionale (Re)**: schermagliatori e campioni veloci.
  * **Balzo a L (Cavallo)**: cavalieri, esploratori e abominazioni che scavalcano gli ostacoli.

### 3. ⚔️ Flanking (Aggiramento Tattico)
* Posizionare due miniature alleate adiacenti allo stesso bersaglio nemico attiva il **Flanking**: conferisce **+2 Danni addizionali** diretti, perforando gran parte delle armature.

### 4. 🩸 Riserva Sangue & Riti d'Arma
* La morte alimenta la guerra: ogni unità sconfitta rilascia token **Sangue (🩸)**.
* Accumulando Sangue puoi scatenare il devastante **Rito d'Arma** del tuo Comandante (es. *Schianto Sismico* di Valeria, *Vincolo di Carne* di Malakor, *Faglia Gravitazionale* di Kaelen).

### 5. 👑 Condizione di Vittoria
* Abbattere il Comandante nemico ponendo i suoi PV a 0 decreta la vittoria immediata della battaglia.

---

## ✨ Funzionalità Principali

* **⚡ Onboarding Istantaneo (Zero-Barrier)**: Nessun form di registrazione o login obbligatorio! Il gioco si avvia all'istante con un profilo Ospite (`Condottiero_XXX`), 100 monete e mazzo iniziale già pronto.
* **⚔️ Partita Rapida in 1-Click**: Clicca su *"Battaglia Rapida vs IA"* nella Home per essere catapultato subito sulla plancia senza menu intermedi.
* **🤖 IA Tattica Offensiva**: Intelligenza Artificiale euristica che schiera altari, lancia magie contestuali, accerchia le tue truppe e usa i Riti d'Arma.
* **🌐 Multiplayer Online P2P**: Crea o entra in stanze online in tempo reale con connessione WebRTC PeerJS a latenza ultra-bassa e matchmaking su cloud Supabase.
* **🔊 Sound Engine Procedurale Integrato**: Motore audio sintetico nativo basato su **Web Audio API** (0 KB di download esterni, zero lag) con suoni dedicati per attacchi con lama, armature, sortilegi, evocazioni e fanfare. Include pulsante di silenziamento rapido `🔊 / 🔇`.
* **💥 Floating Combat Text & Screen Shake**: Niente finestre popup invasive durante il combattimento. Numeri di danno dinamici (`-3 💥`, `PARATO 🛡️`, `CONTRATTACCO!`) fluttuano sulle pedine con scuotimento fisico della scacchiera.
* **📜 Deckbuilder Professionale**: Costruisci grimori da 40 carte con filtri per costo di mana, fazione, rarità, istogramma della curva di mana e **Autocompletamento Strategico IA**.
* **📦 Mercato Box & Collezione**: Oltre **500+ carte uniche** (Set α e Set β) con rarità da Comune a Mitica da sbustare spendendo l'oro conquistato in battaglia.
* **☁️ Sincronizzazione Cloud Opzionale**: Possibilità di collegare un account Supabase per salvare la collezione e i mazzi su qualsiasi dispositivo.

---

## 🛠️ Stack Tecnologico

* **Frontend**: HTML5 Semantico, CSS3 Moderno (Glassmorphism, CSS Grid, Custom Properties).
* **Motore Logico**: JavaScript Vanilla (ES6+) modulare e autonomo.
* **Audio**: Web Audio API (oscillatori, filtri passa-basso e curve di inviluppo esponenziali procedurali).
* **Multiplayer & Networking**: 
  * [PeerJS](https://peerjs.com/) (WebRTC Peer-to-Peer diretto).
  * [Supabase](https://supabase.com/) (Database profili, autenticazione e Realtime Presence Channel per le stanze).
* **Typography**: Google Fonts (*Cinzel*, *Crimson Pro*, *Inter*).

---

## 🚀 Come Avviare il Gioco

### Metodo 1: Avvio Rapido (Senza installazione)
Fai doppio click su `index.html` (o `crownfall.html`) per aprirlo in qualsiasi browser moderno (Chrome, Edge, Firefox, Safari).

### Metodo 2: Server Locale (Consigliato per Multiplayer P2P)
Avvia un server statico locale nella cartella del progetto:

```bash
# Con Node.js
npx serve .

# Oppure con Python 3
python -m http.server 8080
```

Apri quindi il browser su `http://localhost:8080`.

---

## 📂 Struttura del Repository

```
Crownfall/
├── index.html                 # Applicazione principale completa (UI, motore, stili, audio)
├── crownfall.html             # Mirror distribuibile identico (100% byte-parity)
├── cards_alpha.js             # Database carte Set α (Alpha - 290 carte)
├── cards_beta.js              # Database carte Set β (Beta - 270 carte)
├── build_cards.cjs            # Script di generazione e indicizzazione carte
├── scratch/                   # Test suite, diagnostica e verifiche del motore
│   ├── verify_all_card_rules.js  # Master test suite (100% pass)
│   ├── verify_html_syntax.js     # Validatore sintattico HTML e JavaScript
│   └── test_ai_match.js          # Simulatore headless di partite IA
└── README.md                  # Documentazione ufficiale del progetto
```

---

<p align="center">
  Forgiato con onore e sangue per gli amanti della strategia tattica. 🛡️⚔️👑
</p>
