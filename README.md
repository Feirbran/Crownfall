# 👑 CROWNFALL — Tactical Commander Skirmish

<p align="center">
  <a href="https://feirbran.github.io/Crownfall/">
    <img src="https://img.shields.io/badge/PLAY_NOW_ONLINE-GitHub_Pages-gold?style=for-the-badge&logo=googlechrome&logoColor=black" alt="Play Live">
  </a>
  <img src="https://img.shields.io/badge/Status-Digital_Alpha-crimson?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Vision-Future_Physical_Board_Game-blueviolet?style=for-the-badge" alt="Physical Vision">
  <img src="https://img.shields.io/badge/Audio-Procedural_Web_Audio_API-darkred?style=for-the-badge" alt="Audio">
  <img src="https://img.shields.io/badge/Multiplayer-PeerJS_P2P_%2B_Supabase-green?style=for-the-badge" alt="Multiplayer">
</p>

<p align="center">
  <b>No downloads. No installations. No registration required.</b><br>
  👉 <a href="https://feirbran.github.io/Crownfall/"><b>https://feirbran.github.io/Crownfall/</b></a> 👈
</p>

---

## 🎲 The Vision: A Future Physical Tabletop Skirmish Game

> [!NOTE]
> **This web application is an open digital Alpha prototype.**
> Our ultimate goal is to bring **Crownfall** to life as a **physical tabletop skirmish board game** featuring high-detail miniature figures, illustrated tarot-sized grimorie cards, modular tectonic grid tiles, and physical Altars and Blood tokens. 
> 
> This browser build serves as an active, living testbed for rules refinement, competitive balance, card mechanics, and community playtesting. Your feedback directly shapes the development of the physical game!

---

## ⚔️ What is Crownfall?

**Crownfall** is a turn-based dark fantasy tactical skirmish game that merges the rigorous spatial depth of **siege chess**, the strategic variety of **collectible card deckbuilding**, and battlefield resource management.

Two Warlords clash across an 8×8 tectonic battlefield to claim the shattered shards of the Primordial Crown. Your objective is decisive: consecrate sacred Altars to harvest Mana, deploy lethal troops, coordinate flanking maneuvers, unleash Commander Weapon Rites, and **execute the enemy Commander**.

---

## 🌌 Lore: The Chronicles of Veridia

### The Subtraction of the Absolute
Centuries ago, the cataclysm known as the **Subtraction of the Absolute** (*La Sottrazione dell'Assoluto*) severed the divine thread of the cosmos. The celestial Primordial Crown was shattered into five shards of incomprehensible power, embedding themselves into the tectonic flesh of Veridia. The earth crystallized into rigid vectors—a scarred arena of orthogonal, diagonal, and perpendicular impact lines.

Five dominant martial and philosophical Orders rose from the ruins, each worshipping a shard and vying for absolute sovereignty:

| Order / Faction | Emblem | Combat Doctrine & Philosophy | Iconic Commanders |
| :--- | :---: | :--- | :--- |
| **Iron Bastion**<br>*(Bastione di Ferro)* | 🛡️ | **Impenetrable Defense & Retaliation.** Heavy plate armor, testudo shield walls, stone barriers, and brutal counterattacks. They do not break; they outlast. | **Valeria of the Bastion**<br>*Garek the Breaker* |
| **Ashes of Judgment**<br>*(Ceneri del Giudizio)* | 💀 | **Scavenging, Sacrifice & Necromancy.** Death is fuel. Fallen allies become hazard graveyards, minions are sacrificed for Blood, and corpses rise again. | **Malakor of the Pyre**<br>*Morbida the Wetnurse* |
| **Abyssal Tide**<br>*(Marea Abissale)* | 🌊 | **Kinetic Control & Void Manipulation.** Fluid diagonal strikes, gravitational vortexes dragging foes out of position, and opening bottomless chasms. | **Vespera of the Tides**<br>*Kaelen, Vortex Eye* |
| **Eternal Silence**<br>*(Silenzio Eterno)* | ⚖️ | **Dogmatic Inquisition & Denial.** Anti-magic sanctions, mana taxation, passive suppression, and harsh punishment for opponents who hoard resources. | **Aurelius the Just**<br>*Justiciar Kael* |
| **Magma Forge**<br>*(Forgia del Magma)* | ⚒️ | **Constructs, Slag & Transmutation.** Automated war machines, slag deposits, and the sacrificial transmutation of friendly Altars into frontline siege monsters. | **Vulkan the Smith**<br>*Ignis, the Living Forge* |

---

## 📜 How to Play: Core Rules & Gameplay Pillars

Crownfall plays on an **8×8 chessboard grid**. Each player commands an army comprising 1 Commander, a deck of 40 cards (Structures, Units, Spells, Reactions), and starts with 1 Mana.

```
       [ PLAYER 2 / ENEMY TERRITORY ] (Rows 7–8)
  ·   ·   ·   ·   ·   ·   ·   ·
  ·   ·   ·   ·   ·   ·   ·   ·
  ·   ·   ·   ·   ·   ·   ·   ·
  ·   ·   ·   ·   ·   ·   ·   ·   <-- No-Man's Land (Flanking & Chasm Hazards)
  ·   ·   ·   ·   ·   ·   ·   ·
  ·   ·   ·   ·   ·   ·   ·   ·
       [ PLAYER 1 / ALLIED TERRITORY ] (Rows 1–2)
```

---

### 1. 🏛️ The Mana Economy: Altars & Territory
* You begin the duel with a maximum cap of **1 Mana (💧)**.
* To increase your maximum Mana (up to a ceiling of **4 Mana**), you must consecrate **Altars** directly onto the board.
* **Placement Rule**: Altars must be deployed in an unoccupied square orthogonally adjacent to your Commander or another friendly Altar.
* **Vulnerability**: Altars are impassable defensive structures. If an enemy demolishes one of your Altars, your **maximum Mana pool permanently decreases by 1**!

### 2. ⚡ Turn Structure & Tactical Actions
* Each turn you receive **2 Tactical Actions (⚡)**.
* During your turn, you have complete fluid freedom to spend **Mana** (to play cards) and **Actions** (to move or attack) in whatever strategic order you choose:
  * **Cast Spells & Deploy Units**: Costs Mana (as shown on the card pip). Does not consume Tactical Actions.
  * **Move a Unit**: Costs 1 Action (⚡).
  * **Attack an Enemy**: Costs 1 Action (⚡).
* When you are finished, click **"END TURN ⏳"** to pass initiative.

### 3. ♟️ Chess-Inspired Movement Vectors
Units navigate the board according to strict martial vectors:
* **Orthogonal (Rook)**: Advances horizontally and vertically (standard infantry, guardians, siege rams).
* **Diagonal (Bishop)**: Moves across diagonals (assassins, tidal weavers, scouts).
* **Omnidirectional (King)**: Moves 1 step in any direction (flexible skirmishers, warlords).
* **L-Shaped Leap (Knight)**: Leaps over intervening friendly or enemy pieces in a classical 2×1 chess knight jump (cavalry, crypt shadows, heavy knights).

### 4. ⚔️ Combat, Armor & Flanking
* **Melee & Range**: Standard units attack adjacent targets (Range 1). Ranged units (archers, ballistas) strike from 2–4 tiles away without taking counter-damage.
* **Armor (🛡️)**: Units with Armor absorb incoming physical damage (e.g., Armor 1 reduces 3 damage down to 2).
* **Counterattack (Presidio)**: In melee combat, defending units strike back with their Attack value unless incapacitated, stunned, or killed before hitting.
* **Flanking (Aggiramento)**: Position two allied units adjacent to the same enemy target to activate **Flanking**. Your attacks gain a devastating **+2 direct damage bonus**, tearing through armor!

### 5. 🩸 Blood Reserve & Weapon Rites
* War demands sacrifice: every unit that perishes in battle feeds the **Blood Reserve (🩸)**.
* Commanders possess a game-altering **Weapon Rite** (e.g., *Valeria's Seismic Slam*, *Malakor's Flesh Bond*, *Kaelen's Gravity Rift*).
* Spend accumulated Blood tokens (typically 3–4 🩸) to activate your Commander's Rite once per turn.

### 6. 👑 Victory Condition
* **Slay the Enemy Commander**: Reduce the opposing Commander's Health Points to 0 to shatter their claim and win the match!

---

## 🎮 Game Modes & Features

| Feature | Description |
| :--- | :--- |
| **⚔️ 1-Click Quick Play** | Jump directly into an AI skirmish from the Home Screen with zero setup delay. |
| **🤖 Tactical Combat AI** | An aggressive heuristic AI that consecrates Altari, flanks your positions, casts tactical spells, and activates Commander Rites. |
| **🌐 Real-Time P2P Multiplayer** | Create or join live online rooms via WebRTC (PeerJS) and Supabase Realtime Presence Channels with zero latency. |
| **📜 Arena Deckbuilder** | Craft 40-card grimories with visual mana curve analytics, faction synergy filters, and intelligent **1-Click AI Auto-Completion**. |
| **📦 500+ Unique Cards** | Set α (Alpha) and Set β (Beta) expansion boxes featuring Common, Uncommon, Rare, and Mythic cards unlocked with earned gold. |
| **🔊 Procedural Audio Engine** | Native browser **Web Audio API** sound synthesis for blade slashes, shield clangs, spell sweeps, seismic altar drops, and victory fanfares (0 KB external download). |
| **💥 Non-Blocking Fluid Action** | Floating Combat Text (`-3 💥`, `SHIELD 🛡️`, `COUNTER!`) and dynamic screen shake directly on the board without disruptive popup modals. |
| **☁️ Optional Cloud Sync** | Play instantly as a Guest, or sync your collection and customized decks across devices using Supabase authentication. |

---

## 🕹️ Live Access

You do **not** need to install anything or clone this repository to play:

👉 **[Launch Crownfall Live on GitHub Pages](https://feirbran.github.io/Crownfall/)**

Works seamlessly on Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, and modern mobile/tablet touchscreens.

---

## 🛠️ Repository Architecture

For developers, contributors, and tabletop designers interested in the engine codebase:

```
Crownfall/
├── index.html                 # Complete single-page application (UI, tactical engine, audio synthesizer)
├── crownfall.html             # Verified identical mirror file (100% byte-parity)
├── cards_alpha.js             # Set α database (290 unique cards & commanders)
├── cards_beta.js              # Set β database (270 unique cards & commanders)
├── build_cards.cjs            # Card compilation and validation script
├── scratch/                   # Automated regression and mechanics test suites
│   ├── verify_all_card_rules.js  # Master mechanics verification suite (100% pass)
│   ├── verify_html_syntax.js     # Syntax & DOM validation suite
│   └── test_ai_match.js          # Headless combat and AI turn simulator
└── README.md                  # Project documentation & tabletop design overview
```

---

## 🤝 Community & Feedback

Crownfall is evolving actively. If you encounter card balance anomalies, tactical edge cases, or have suggestions for the physical board game adaptation, please open an [Issue on GitHub](https://github.com/Feirbran/Crownfall/issues) or submit a pull request!

<p align="center">
  <i>Forged in iron, ashes, tide, silence, and magma for the tabletop tacticians of tomorrow. 🛡️⚔️👑</i>
</p>
