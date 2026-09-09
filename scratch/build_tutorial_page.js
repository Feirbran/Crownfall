const fs = require('fs');

// Generate the complete HTML and CSS for the new Tutorial section
const tutorialHtml = `
    <!-- TUTORIAL: ACCADEMIA TATTICA DI VERIDIA -->
    <div id="pane-tutorial" class="pane">
      <div class="tutorial-container">
        
        <!-- HERO / MANIFESTO ACCADEMIA -->
        <header class="tutorial-hero">
          <div class="tutorial-eyebrow">Accademia Militare dei Cinque Troni</div>
          <h1 class="tutorial-hero-title">MANUALE TATTICO DI CROWNFALL</h1>
          <p class="tutorial-hero-subtitle">Dalla prima goccia di Sangue alla Decapitazione: la guida definitiva per dominare le Zolle del Giudizio.</p>
          
          <div class="tutorial-manifesto">
            <blockquote>
              «La Corona non concede seconde occasioni. Sulle Zolle del Giudizio, ogni passo è una sentenza, ogni Altare è un patto di potere e ogni goccia di sangue versata è la miccia di un Rito supremo. Impara le leggi della Fessura o verrai polverizzato nel fango.»
            </blockquote>
            <div class="tutorial-manifesto-author">— Gran Maestro d'Armi dell'Antico Baluardo</div>
          </div>
        </header>

        <!-- INDICE DI NAVIGAZIONE RAPIDA -->
        <nav class="tutorial-nav-bar" aria-label="Indice del Manuale">
          <a class="tutorial-nav-link" href="#tut-obiettivo">1. Obiettivo: Decapitazione</a>
          <a class="tutorial-nav-link" href="#tut-scacchiera">2. Campo 8x8 & HUD</a>
          <a class="tutorial-nav-link" href="#tut-risorse">3. Il Triangolo delle Risorse</a>
          <a class="tutorial-nav-link" href="#tut-azioni">4. Economia delle Azioni (0 vs 1)</a>
          <a class="tutorial-nav-link" href="#tut-turno">5. Anatomia del Turno (3 Fasi)</a>
          <a class="tutorial-nav-link" href="#tut-schieramento">6. Schieramento & Altari</a>
          <a class="tutorial-nav-link" href="#tut-movimento">7. Movimento Scacchistico</a>
          <a class="tutorial-nav-link" href="#tut-combattimento">8. Combattimento & Contrattacco</a>
          <a class="tutorial-nav-link" href="#tut-urto">9. Spinta & Danni da Urto</a>
          <a class="tutorial-nav-link" href="#tut-riti">10. Riti d'Armi Supremi</a>
          <a class="tutorial-nav-link" href="#tut-regole-speciali">11. Regola Turno 1 & Mazzi</a>
          <a class="tutorial-nav-link" href="#tut-anatomia-carta">12. Anatomia di una Carta</a>
        </nav>

        <!-- 1. OBIETTIVO PRIMARIO -->
        <section class="tutorial-section" id="tut-obiettivo">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">1</div>
            <h2 class="tutorial-section-title">L'OBIETTIVO PRIMARIO: LA DECAPITAZIONE</h2>
          </div>

          <article class="tutorial-card">
            <div class="tutorial-card-header">
              <h3 class="tutorial-card-title">👑 Come si Vince una Partita</h3>
              <span class="tutorial-badge gold">Regola Cardine</span>
            </div>
            <p>In Crownfall l'obiettivo è netto e viscerale: <strong>ridurre a 0 i Punti Vita (PV) del Comandante nemico</strong>.</p>
            <p>A differenza di altri giochi di carte dove il totale vite del giocatore è astratto, in Crownfall il tuo leader è fisicamente presente sul campo di battaglia come pezzo titanico (PV variabili da 16 a 24 e 1-3 ATT). Se il tuo Comandante cade, la partita termina istantaneamente con la tua disfatta.</p>

            <div class="tutorial-callout blood">
              <div class="tutorial-callout-title">La Legge della Dissoluzione Istantanea</div>
              <p>Tutte le truppe e gli Altari della tua fazione sono tenuti in vita unicamente dalla presenza radiante del tuo Comandante. Se il Comandante viene decapitato, l'intero esercito si dissolve all'istante in polvere e rottami: non c'è possibilità di pareggio né spareggio successivo.</p>
            </div>
          </article>
        </section>

        <!-- 2. IL CAMPO DI BATTAGLIA 8x8 & HUD -->
        <section class="tutorial-section" id="tut-scacchiera">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">2</div>
            <h2 class="tutorial-section-title">IL CAMPO DI BATTAGLIA & L'INTERFACCIA TATTICA</h2>
          </div>

          <article class="tutorial-card">
            <div class="tutorial-card-header">
              <h3 class="tutorial-card-title">🗺️ La Griglia 8x8 (64 Caselle)</h3>
              <span class="tutorial-badge cyan">Scacchiera Tattica</span>
            </div>
            <p>La battaglia si combatte su una scacchiera di 64 caselle quadrate (8 colonne: <code>a–h</code>, 8 righe: <code>1–8</code>).</p>
            <ul class="tutorial-list">
              <li><strong>Fase di Piazzamento Iniziale:</strong> All'avvio, il Giocatore 1 piazza il proprio Comandante su una qualsiasi casella della prima riga (<code>a1–h1</code>). L'avversario piazza il suo su <code>a8–h8</code>.</li>
              <li><strong>Mano Iniziale:</strong> Entrambi i contendenti pescano <strong>4 carte</strong> dal proprio Grimorio.</li>
              <li><strong>Stato Iniziale:</strong> Si comincia con <strong>1 Mana</strong> massimo, <strong>2 Azioni Tattiche</strong> e <strong>0 Sangue</strong>.</li>
            </ul>

            <!-- MOCKUP 1: PLANCIA & HUD -->
            <div class="tutorial-mockup">
              <div class="tutorial-mockup-bar">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-title">📷 SCHERMATA DI GIOCO FITTIZIA — PLANCIA 8x8 & HUD IN COMBATTIMENTO</span>
                <span class="mockup-tag">HUD Live</span>
              </div>
              
              <div class="mockup-hud-top">
                <div class="hud-comm-chip opp">
                  <span class="glyph">💀</span>
                  <div class="info">
                    <div class="name">Malakor (IA Nemica)</div>
                    <div class="stat-bar"><span class="hp-fill" style="width: 75%;"></span><span class="hp-text">18 / 18 PV</span></div>
                  </div>
                </div>
                <div class="hud-center-turn">
                  <span class="turn-label">ROUND 2 — TUO TURNO</span>
                  <div class="turn-actions-pip">⚡ AZIONI: <strong>2 / 2</strong></div>
                </div>
                <div class="hud-comm-chip me">
                  <span class="glyph">🛡️</span>
                  <div class="info">
                    <div class="name">Valeria (Comandante Alleato)</div>
                    <div class="stat-bar"><span class="hp-fill" style="width: 100%;"></span><span class="hp-text">24 / 24 PV</span></div>
                  </div>
                </div>
              </div>

              <!-- MINI BOARD GRID -->
              <div class="mockup-board-wrap">
                <div class="mockup-board">
                  <!-- Row 8 (Enemy row) -->
                  <div class="mockup-cell coord-label">8</div>
                  <div class="mockup-cell dark"></div>
                  <div class="mockup-cell light"></div>
                  <div class="mockup-cell dark"></div>
                  <div class="mockup-cell light enemy-piece"><span class="p-glyph">💀</span><span class="p-stat">1/18</span><span class="tag-com">MALAKOR</span></div>
                  <div class="mockup-cell dark"></div>
                  <div class="mockup-cell light"></div>
                  <div class="mockup-cell dark"></div>
                  
                  <!-- Row 7 -->
                  <div class="mockup-cell coord-label">7</div>
                  <div class="mockup-cell light"></div>
                  <div class="mockup-cell dark enemy-piece"><span class="p-glyph">🪦</span><span class="p-stat">0/5</span><span class="tag-com">ALTARE</span></div>
                  <div class="mockup-cell light"></div>
                  <div class="mockup-cell dark enemy-piece target-attack"><span class="p-glyph">🧟</span><span class="p-stat">2/2</span><span class="tag-reticle">🎯 BERSAGLIO</span></div>
                  <div class="mockup-cell light"></div>
                  <div class="mockup-cell dark"></div>
                  <div class="mockup-cell light"></div>

                  <!-- Row 6 to 3: Midfield slice -->
                  <div class="mockup-cell coord-label">6</div>
                  <div class="mockup-cell dark"></div><div class="mockup-cell light"></div><div class="mockup-cell dark"></div><div class="mockup-cell light"></div><div class="mockup-cell dark"></div><div class="mockup-cell light"></div><div class="mockup-cell dark"></div>

                  <div class="mockup-cell coord-label">5</div>
                  <div class="mockup-cell light"></div><div class="mockup-cell dark"></div><div class="mockup-cell light move-dest"><span class="tag-step">PASSO 1</span></div><div class="mockup-cell dark"></div><div class="mockup-cell light"></div><div class="mockup-cell dark"></div><div class="mockup-cell light"></div>

                  <div class="mockup-cell coord-label">4</div>
                  <div class="mockup-cell dark"></div><div class="mockup-cell light"></div><div class="mockup-cell dark ally-piece"><span class="p-glyph">🐺</span><span class="p-stat">1/2</span><span class="tag-com">SEGUGIO (Slancio)</span></div><div class="mockup-cell light"></div><div class="mockup-cell dark"></div><div class="mockup-cell light"></div><div class="mockup-cell dark"></div>

                  <div class="mockup-cell coord-label">3</div>
                  <div class="mockup-cell light"></div><div class="mockup-cell dark"></div><div class="mockup-cell light"></div><div class="mockup-cell dark deploy-zone"><span class="tag-deploy">+SCHIERA</span></div><div class="mockup-cell light deploy-zone"><span class="tag-deploy">+SCHIERA</span></div><div class="mockup-cell dark"></div><div class="mockup-cell light"></div>

                  <!-- Row 2 -->
                  <div class="mockup-cell coord-label">2</div>
                  <div class="mockup-cell dark"></div>
                  <div class="mockup-cell light ally-piece"><span class="p-glyph">🏛️</span><span class="p-stat">0/5</span><span class="tag-com">ALTARE (+1M)</span></div>
                  <div class="mockup-cell dark deploy-zone"><span class="tag-deploy">+SCHIERA</span></div>
                  <div class="mockup-cell light ally-piece"><span class="p-glyph">🛡️</span><span class="p-stat">2/24</span><span class="tag-com">VALERIA (👑)</span></div>
                  <div class="mockup-cell dark deploy-zone"><span class="tag-deploy">+SCHIERA</span></div>
                  <div class="mockup-cell light"></div>
                  <div class="mockup-cell dark"></div>

                  <!-- Coordinates footer -->
                  <div class="mockup-cell empty"></div>
                  <div class="mockup-cell letter">a</div><div class="mockup-cell letter">b</div><div class="mockup-cell letter">c</div><div class="mockup-cell letter">d</div><div class="mockup-cell letter">e</div><div class="mockup-cell letter">f</div><div class="mockup-cell letter">g</div><div class="mockup-cell letter">h</div>
                </div>

                <!-- Callout legend -->
                <div class="mockup-legend">
                  <div class="leg-item"><span class="dot gold"></span> <strong>👑 Comandanti:</strong> Capi supremi, fulcro dell'armata.</div>
                  <div class="leg-item"><span class="dot green"></span> <strong>🟩 Zone Verdi (+SCHIERA):</strong> Caselle adiacenti libere dove schierare carte.</div>
                  <div class="leg-item"><span class="dot blue"></span> <strong>🟦 Zone Blu (PASSO):</strong> Caselle raggiungibili con 1 Azione di Movimento.</div>
                  <div class="leg-item"><span class="dot red"></span> <strong>🟥 Zone Rosse (BERSAGLIO):</strong> Nemici a portata attaccabili con 1 Azione.</div>
                </div>
              </div>

              <!-- BOTTOM HUD / HAND -->
              <div class="mockup-hud-bottom">
                <div class="hud-resources">
                  <div class="res-chip mana">🔷 <strong>MANA:</strong> 2 / 2</div>
                  <div class="res-chip blood">🩸 <strong>SANGUE:</strong> 1 (Rito a 3)</div>
                  <div class="res-chip action">⚡ <strong>AZIONI:</strong> 2 Disponibili</div>
                </div>
                <div class="hud-hand-preview">
                  <div class="mock-card"><span class="mc-cost">1</span><span class="mc-title">Fante Corazzato</span><span class="mc-pt">1/4</span></div>
                  <div class="mock-card selected"><span class="mc-cost">1</span><span class="mc-title">Segugio Randagio</span><span class="mc-pt">1/2</span></div>
                  <div class="mock-card"><span class="mc-cost">2</span><span class="mc-title">Picchiere Merc.</span><span class="mc-pt">2/3</span></div>
                  <div class="mock-card spell"><span class="mc-cost">2</span><span class="mc-title">Frantumare Pietra</span><span class="mc-pt">SPELL</span></div>
                </div>
              </div>
            </div>
          </article>
        </section>

        <!-- 3. IL TRIANGOLO DELLE RISORSE -->
        <section class="tutorial-section" id="tut-risorse">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">3</div>
            <h2 class="tutorial-section-title">IL TRIANGOLO DELLE RISORSE: MANA, SANGUE E AZIONI</h2>
          </div>

          <article class="tutorial-card">
            <p>La padronanza di Crownfall risiede nella gestione delle <strong>tre risorse asimmetriche</strong>. Ognuna ha una propria sorgente e una specifica valuta d'impiego:</p>

            <!-- MOCKUP 2: IL TRIANGOLO DELLE RISORSE -->
            <div class="resource-grid-trio">
              <!-- MANA -->
              <div class="res-panel-box mana-box">
                <div class="res-panel-header">
                  <span class="res-icon">🔷</span>
                  <div>
                    <h3 class="res-title">MANA (Energia Territoriale)</h3>
                    <span class="res-sub">La valuta delle Carte</span>
                  </div>
                </div>
                <div class="res-stat-pill">Inizio: 1 | Massimo Cap: 4</div>
                <ul class="res-rules-list">
                  <li><strong>Come si ottiene:</strong> All'inizio di ogni tuo turno, il Mana si ricarica istantaneamente al massimo. Schierare un <strong>Altare</strong> aumenta permanentemente la riserva massima di +1 Mana (fino a 4) e dona +1 Mana subito.</li>
                  <li><strong>A cosa serve:</strong> Pagare il costo di lancio di Miniature, Altari, Sortilegi e Reazioni dalla mano.</li>
                  <li><strong>Attenzione:</strong> Il Mana non speso durante il turno <em>non si accumula</em> per il round successivo (svuota e ricarica).</li>
                </ul>
              </div>

              <!-- SANGUE -->
              <div class="res-panel-box blood-box">
                <div class="res-panel-header">
                  <span class="res-icon">🩸</span>
                  <div>
                    <h3 class="res-title">SANGUE (Valuta del Macello)</h3>
                    <span class="res-sub">La linfa dei Riti Supremi</span>
                  </div>
                </div>
                <div class="res-stat-pill">Inizio: 0 | Accumulo Infinito</div>
                <ul class="res-rules-list">
                  <li><strong>Come si ottiene:</strong> Non si ricarica col turno! Si raccoglie <strong>solo quando cade un pezzo</strong>:
                    <br>• <strong>+2 Sangue</strong> all'uccisore (premio per l'offensiva).
                    <br>• <strong>+1 Sangue</strong> alla vittima (meccanica di rimonta / <em>catch-up</em>).
                  </li>
                  <li><strong>A cosa serve:</strong> Attivare il devastante <strong>Rito d'Armi</strong> del Comandante (costo: 3 o 4 Sangue) e lanciare incantesimi neri di sacrificio.</li>
                  <li><strong>Vantaggio:</strong> Il Sangue si conserva da un turno all'altro finché non decidi di scatenare il Rito.</li>
                </ul>
              </div>

              <!-- AZIONI -->
              <div class="res-panel-box action-box">
                <div class="res-panel-header">
                  <span class="res-icon">⚡</span>
                  <div>
                    <h3 class="res-title">AZIONI (Comando Tattico)</h3>
                    <span class="res-sub">Il Motore delle Mosse</span>
                  </div>
                </div>
                <div class="res-stat-pill">Esattamente 2 Azioni ogni Turno</div>
                <ul class="res-rules-list">
                  <li><strong>Come si ottiene:</strong> All'inizio di ogni turno ricevi sempre <strong>2 Azioni Tattiche</strong> fresche.</li>
                  <li><strong>A cosa serve:</strong> Muovere un'unità sul campo (1 Azione) o attaccare un bersaglio nemico (1 Azione).</li>
                  <li><strong>Regola Chiave di Svolta:</strong> <strong>GIOCARE CARTE DALLA MANO COSTA 0 AZIONI!</strong> Puoi svuotare la mano di 3 carte e avere ancora entrambe le 2 Azioni disponibili per muovere e attaccare!</li>
                </ul>
              </div>
            </div>
          </article>
        </section>

        <!-- 4. L'ECONOMIA DELLE AZIONI: COSTO 0 VS COSTO 1 -->
        <section class="tutorial-section" id="tut-azioni">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">4</div>
            <h2 class="tutorial-section-title">L'ECONOMIA DELLE AZIONI: COSTO 0 VS COSTO 1</h2>
          </div>

          <article class="tutorial-card">
            <div class="tutorial-card-header">
              <h3 class="tutorial-card-title">⚖️ La Regola d'Oro che Ogni Neofita Sbaglia</h3>
              <span class="tutorial-badge gold">Fondamentale</span>
            </div>
            <p>In Crownfall le Azioni Tattiche (le 2 gemme d'oro ⚡) <strong>non vengono consumate dalla mano di carte</strong>. Molti giocatori pensano erroneamente che giocare una carta costi 1 Azione: non è così!</p>

            <div class="action-comparison-table-wrap">
              <table class="action-comparison-table">
                <thead>
                  <tr>
                    <th>Tipo di Manovra</th>
                    <th>Costo Azioni</th>
                    <th>Cosa Richiede</th>
                    <th>Effetto & Conseguenza</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="highlight-free">
                    <td><strong>Schierare una Miniatura</strong></td>
                    <td><span class="cost-pill free">0 Azioni 🟢</span></td>
                    <td>Costo in Mana della carta</td>
                    <td>Entra adiacente al Comandante. Entra <em>esausta</em> (tranne se ha <em>Slancio</em>).</td>
                  </tr>
                  <tr class="highlight-free">
                    <td><strong>Schierare un Altare</strong></td>
                    <td><span class="cost-pill free">0 Azioni 🟢</span></td>
                    <td>Costo in Mana (spesso 0 Mana)</td>
                    <td>Entra adiacente. Aumenta il massimale a +1 Mana/turno (Max 1 per turno, max 4 totali).</td>
                  </tr>
                  <tr class="highlight-free">
                    <td><strong>Lanciare un Sortilegio</strong></td>
                    <td><span class="cost-pill free">0 Azioni 🟢</span></td>
                    <td>Costo in Mana / Sangue</td>
                    <td>Si attiva subito sul bersaglio designato entro la gittata magica.</td>
                  </tr>
                  <tr class="highlight-spent">
                    <td><strong>Muovere un'Unità sul Campo</strong></td>
                    <td><span class="cost-pill paid">1 Azione ⚡</span></td>
                    <td>L'unità non deve essere già esausta</td>
                    <td>Sposta il pezzo lungo la sua traiettoria consentita. Il pezzo diventa <strong>esausto</strong>.</td>
                  </tr>
                  <tr class="highlight-spent">
                    <td><strong>Attaccare con un'Unità</strong></td>
                    <td><span class="cost-pill paid">1 Azione ⚡</span></td>
                    <td>L'unità non deve essere già esausta</td>
                    <td>Colpisce un nemico a portata. Se in mischia, subisce contrattacco. Diventa <strong>esausta</strong>.</td>
                  </tr>
                  <tr class="highlight-spent">
                    <td><strong>Attivare il Rito d'Armi Supremo</strong></td>
                    <td><span class="cost-pill paid">1 Azione ⚡</span></td>
                    <td>3 o 4 Segnalini Sangue 🩸</td>
                    <td>Scatena l'abilità suprema del Comandante ribaltando la partita.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="tutorial-callout gold">
              <div class="tutorial-callout-title">💡 Esempio di Turno Perfetto a 2 Azioni</div>
              <p>Inizio turno (2 Mana, 2 Azioni) ➔ <strong>Spendi 0 Azioni:</strong> Giochi un Altare (+1 Mana immediato) e giochi una Recluta di Leva a costo 1 Mana ➔ <strong>1ª Azione:</strong> Muovi il Comandante di 1 passo in avanti ➔ <strong>2ª Azione:</strong> Fai attaccare il Comandante contro un fante nemico. <em>Risultato: hai schierato 2 pezzi, mosso e attaccato, tutto nello stesso singolo turno!</em></p>
            </div>
          </article>
        </section>

        <!-- 5. ANATOMIA DEL TURNO -->
        <section class="tutorial-section" id="tut-turno">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">5</div>
            <h2 class="tutorial-section-title">ANATOMIA DEL TURNO: LE 3 FASI RIGIDE</h2>
          </div>

          <article class="tutorial-card">
            <div class="turn-phase-timeline">
              <!-- FASE 1 -->
              <div class="phase-step-card">
                <div class="phase-badge phase-1">FASE 1</div>
                <h3 class="phase-title">Risveglio & Ricarica (Inizio Turno)</h3>
                <p class="phase-desc">Avviene automaticamente senza intervento del giocatore all'inizio del tuo turno:</p>
                <ul class="phase-sublist">
                  <li><strong>Ricarica del Mana:</strong> La tua riserva di Mana si riempie completamente fino al valore massimo attuale (1 base + 1 per ogni Altare attivo, fino a 4).</li>
                  <li><strong>Ricarica delle Azioni:</strong> Ricevi esattamente <strong>2 Azioni Tattiche</strong> fresche.</li>
                  <li><strong>Rimozione Stasi (Dis-esaurimento):</strong> Tutte le tue truppe e il tuo Comandante rimuovono lo stato <em>esausto</em> e tornano pronte ad agire.</li>
                  <li><strong>Pescata del Grimorio:</strong> Peschi automaticamente <strong>1 carta</strong> dalla cima del tuo mazzo.</li>
                  <li><strong>Azzera Limite Altari:</strong> Puoi di nuovo schierare 1 nuovo Altare durante questo round.</li>
                </ul>
              </div>

              <!-- FASE 2 -->
              <div class="phase-step-card">
                <div class="phase-badge phase-2">FASE 2</div>
                <h3 class="phase-title">Fase Principale (Manovre & Offensiva)</h3>
                <p class="phase-desc">Il cuore decisionale del round. Puoi compiere qualsiasi combinazione di azioni nell'ordine che preferisci:</p>
                <ul class="phase-sublist">
                  <li>Puoi schierare carte spendendo Mana (0 Azioni).</li>
                  <li>Puoi muovere o attaccare spendendo 1 Azione per volta.</li>
                  <li>Puoi alternare: es. lanciare un sortilegio, muovere un pezzo, giocare un'altra truppa, poi attaccare.</li>
                  <li>Se un'unità ha <strong>Slancio</strong>, puoi schierarla e subito dopo spendere 1 Azione per farla muovere o attaccare nello stesso turno!</li>
                </ul>
              </div>

              <!-- FASE 3 -->
              <div class="phase-step-card">
                <div class="phase-badge phase-3">FASE 3</div>
                <h3 class="phase-title">Fine Turno (Cessione Iniziativa)</h3>
                <p class="phase-desc">Quando hai esaurito le 2 Azioni (o se decidi di passare cliccando sul pulsante dedicato):</p>
                <ul class="phase-sublist">
                  <li>Il controllo passa all'avversario (o all'IA).</li>
                  <li>Le eventuali carte con parola chiave <em>Reazione</em> nella tua mano restano vigili: se l'avversario dichiara un attacco o un movimento idoneo durante il suo turno, potrai innescare la tua trappola!</li>
                </ul>
              </div>
            </div>
          </article>
        </section>

        <!-- 6. SCHIERAMENTO & REGOLE RIGIDE DEGLI ALTARI -->
        <section class="tutorial-section" id="tut-schieramento">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">6</div>
            <h2 class="tutorial-section-title">SCHIERAMENTO DELLE TRUPPE & REGOLE DEGLI ALTARI</h2>
          </div>

          <article class="tutorial-card">
            <div class="tutorial-card-header">
              <h3 class="tutorial-card-title">🏛️ La Fessura Territoriale</h3>
              <span class="tutorial-badge purple">Geometria Tattica</span>
            </div>

            <div class="rules-two-cols">
              <div class="rule-box">
                <h4>1. Zona di Evocazione</h4>
                <p>Non puoi evocare truppe ovunque sulla mappa. Le Miniature e gli Altari possono essere schierati <strong>esclusivamente nelle caselle libere immediatamente adiacenti</strong> al tuo Comandante (ortogonali o diagonali, le 8 caselle attorno a lui).</p>
                <p><em>Nota:</em> Se il tuo Comandante è circondato da ostacoli o nemici, non potrai schierare nuove truppe finché non libererai spazio!</p>
              </div>

              <div class="rule-box">
                <h4>2. Stasi d'Ingresso & Slancio</h4>
                <p>Quando una Miniatura entra in gioco, entra nello stato <strong>esausto</strong>: le sue armi sono fredde e non può compiere né movimenti né attacchi nel turno in cui è stata giocata.</p>
                <p><strong>Eccezione Slancio:</strong> Se la carta possiede la parola chiave <em>Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*</em>, infrange la stasi ed è immediatamente pronta all'uso spendendo un'azione!</p>
              </div>
            </div>

            <div class="altar-deep-dive">
              <h4>🏛️ Le 3 Leggi Inviolabili degli Altari</h4>
              <div class="altar-pillars">
                <div class="altar-pill">
                  <span class="num">I</span>
                  <strong>Max 1 Altare a Turno</strong>
                  <p>Non puoi intasare il campo schierando più di un Altare nello stesso round.</p>
                </div>
                <div class="altar-pill">
                  <span class="num">II</span>
                  <strong>Max 4 Altari sul Campo</strong>
                  <p>Un giocatore può controllare al massimo 4 Altari contemporaneamente. Rappresentano il cap di 4 Mana massimo.</p>
                </div>
                <div class="altar-pill">
                  <span class="num">III</span>
                  <strong>Strutture Immobili & Copertura</strong>
                  <p>Gli Altari hanno ATT 0 e non possono mai muoversi. Fungono da bastioni: gli alleati adiacenti a un Altare subiscono <strong>-1 danno</strong> dagli attacchi nemici!</p>
                </div>
              </div>
            </div>
          </article>
        </section>

        <!-- 7. SCHEMI DI MOVIMENTO SCACCHISTICO -->
        <section class="tutorial-section" id="tut-movimento">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">7</div>
            <h2 class="tutorial-section-title">SCHEMI DI MOVIMENTO SCACCHISTICO</h2>
          </div>

          <article class="tutorial-card">
            <p>Crownfall unisce la profondità del card gaming alla precisione geometrica degli scacchi. Ogni carta specifica il proprio schema di passo nella scheda tecnica:</p>

            <div class="movement-grid-showcase">
              <!-- ORTHO -->
              <div class="move-card">
                <div class="move-card-header">
                  <span class="m-icon">➕</span>
                  <div><strong>Ortho (Ortogonale 1)</strong><span class="sub">Croce a 1 passo</span></div>
                </div>
                <p>Muove di 1 casella orizzontale o verticale (Nord, Sud, Est, Ovest). Tipico della fanteria solida e dei Comandanti bastione (es. Valeria, Aurelius).</p>
              </div>

              <!-- ORTHO 2 -->
              <div class="move-card">
                <div class="move-card-header">
                  <span class="m-icon">⏩</span>
                  <div><strong>Ortho2 (Ortogonale 2)</strong><span class="sub">Carica in linea retta</span></div>
                </div>
                <p>Muove fino a 2 caselle ortogonali in linea retta. <strong>Attenzione:</strong> Se il percorso è sbarrato da una pedina o un muro, non può scavalcarlo.</p>
              </div>

              <!-- DIAG -->
              <div class="move-card">
                <div class="move-card-header">
                  <span class="m-icon">✖️</span>
                  <div><strong>Diag (Diagonale 1)</strong><span class="sub">Infiltratore obliquo</span></div>
                </div>
                <p>Muove di 1 casella in diagonale. Ideale per aggirare le formazioni frontali e minacciare le retrovie avversarie (es. Ladro di Tombe, Vespera).</p>
              </div>

              <!-- DIAG 2 -->
              <div class="move-card">
                <div class="move-card-header">
                  <span class="m-icon">↗️</span>
                  <div><strong>Diag2 (Diagonale 2)</strong><span class="sub">Falcata d'Alfiere</span></div>
                </div>
                <p>Scivola fino a 2 caselle in diagonale. Eccellente mobilità per assassini e spadaccini erranti.</p>
              </div>

              <!-- OMNI -->
              <div class="move-card">
                <div class="move-card-header">
                  <span class="m-icon">✴️</span>
                  <div><strong>Omni (Tutte le Direzioni)</strong><span class="sub">Passo del Re</span></div>
                </div>
                <p>Muove di 1 casella in qualunque delle 8 direzioni adiacenti (ortogonale o diagonale). Massima versatilità tattica (es. Schermagliatore, Malakor).</p>
              </div>

              <!-- KNIGHT / BALZO A L -->
              <div class="move-card knight">
                <div class="move-card-header">
                  <span class="m-icon">♞</span>
                  <div><strong>Balzo a L (Cavallo Scacchistico)</strong><span class="sub">Salto Tridimensionale</span></div>
                </div>
                <p>Muove con traiettoria a "L" (2 passi su un asse + 1 passo perpendicolare). <strong>PROPRIETÀ UNICA:</strong> Scavalca qualsiasi ostacolo, pedina alleata o nemica!</p>
              </div>
            </div>
          </article>
        </section>

        <!-- 8. COMBATTIMENTO, CONTRATTACCO & DANNI DA URTO -->
        <section class="tutorial-section" id="tut-combattimento">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">8</div>
            <h2 class="tutorial-section-title">COMBATTIMENTO, CONTRATTACCO & DANNI DA URTO</h2>
          </div>

          <article class="tutorial-card">
            <div class="tutorial-card-header">
              <h3 class="tutorial-card-title">⚔️ Lo Scontro tra Lame e Strutture</h3>
              <span class="tutorial-badge crimson">Risoluzione del Danno</span>
            </div>
            <p>Quando spendi 1 Azione per ordinare un attacco a un'unità pronta contro un bersaglio entro la sua Gittata, si innesca la rigorosa <strong>Sequenza di Combattimento</strong>.</p>

            <!-- MOCKUP 3: MISCHIA VS DISTANZA -->
            <div class="tutorial-mockup">
              <div class="tutorial-mockup-bar">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-title">📷 SIMULATORE DI RISOLUZIONE: MISCHIA VS TIRO A DISTANZA / ALLUNGO</span>
                <span class="mockup-tag">Meccanica di Contrattacco</span>
              </div>

              <div class="combat-sim-grid">
                <!-- CASO A: MISCHIA -->
                <div class="sim-panel melee">
                  <div class="sim-badge">CASO A: SCONTRO IN MISCHIA (Gittata 1)</div>
                  <div class="sim-flow">
                    <div class="sim-unit attacker">
                      <span class="u-glyph">⚔️</span>
                      <strong>Fante Corazzato</strong>
                      <span class="u-stats">ATT: 2 | PV: 4</span>
                    </div>
                    <div class="sim-vs">
                      <span class="vs-arrow">➔ ATTACCA (2 Danni) ➔</span>
                      <span class="vs-counter">⬅️ CONTRATTACCA (2 Danni) ⬅️</span>
                    </div>
                    <div class="sim-unit defender">
                      <span class="u-glyph">🧟</span>
                      <strong>Ghoul (Nemico)</strong>
                      <span class="u-stats">ATT: 2 | PV: 3</span>
                    </div>
                  </div>
                  <div class="sim-verdict">
                    <strong>Esito:</strong> Il Ghoul subisce 2 danni (rimane a 1 PV). Essendo vivo e a contatto di mischia, <strong>il Ghoul sferra immediatamente il contrattacco</strong> infliggendo 2 danni al Fante! Entrambi sopravvivono ma feriti.
                  </div>
                </div>

                <!-- CASO B: DISTANZA / ALLUNGO -->
                <div class="sim-panel ranged">
                  <div class="sim-badge safe">CASO B: ALLUNGO / TIRO A DISTANZA (Gittata 2+)</div>
                  <div class="sim-flow">
                    <div class="sim-unit attacker">
                      <span class="u-glyph">🔱</span>
                      <strong>Picchiere Mercenario</strong>
                      <span class="u-stats">ATT: 2 | Gittata: 2</span>
                    </div>
                    <div class="sim-vs">
                      <span class="vs-arrow">➔ COLPISCE A DISTANZA 2 (2 Danni) ➔</span>
                      <span class="vs-counter none">🚫 NESSUN CONTRATTACCO POSSIBILE</span>
                    </div>
                    <div class="sim-unit defender">
                      <span class="u-glyph">🧟</span>
                      <strong>Ghoul (Nemico)</strong>
                      <span class="u-stats">ATT: 2 | PV: 2</span>
                    </div>
                  </div>
                  <div class="sim-verdict safe">
                    <strong>Esito:</strong> Il Picchiere attacca a 2 caselle di distanza. Il Ghoul subisce 2 danni e viene eliminato. Poiché il Ghoul non ha gittata 2, <strong>non può compiere il contrattacco</strong>. Il Picchiere subisce ZERO danni!
                  </div>
                </div>
              </div>
            </div>

            <!-- SPINTA & DANNI DA URTO -->
            <div class="tutorial-card-header" id="tut-urto" style="margin-top: 24px;">
              <h3 class="tutorial-card-title">💥 La Spinta & i Danni da Urto (+2 Danni da Collisione)</h3>
              <span class="tutorial-badge orange">Fisica del Terreno</span>
            </div>
            <p>Molti colossi, sortilegi e il Rito di Valeria possiedono l'effetto di <strong>Spinta / Respinta</strong> (Knockback). Quando un'unità viene spinta, indietreggia in linea retta allontanandosi dall'origine dell'impatto.</p>

            <!-- MOCKUP 4: COLLISIONE -->
            <div class="tutorial-mockup">
              <div class="tutorial-mockup-bar">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-title">📷 SIMULAZIONE FISICA: COLLISIONE CONTRO OSTACOLO / BORDO SCACCHIERA</span>
                <span class="mockup-tag">Danni da Urto</span>
              </div>

              <div class="knockback-diagram">
                <div class="kb-cell comm"><span class="glyph">🛡️</span>Valeria (Origine)</div>
                <div class="kb-arrow-push">➔ SCHIANTO SISMICO (Spinta 1) ➔</div>
                <div class="kb-cell target"><span class="glyph">🪓</span>Bersaglio Nemico</div>
                <div class="kb-arrow-crash">💥 URTO CONTRO IL MURO! 💥</div>
                <div class="kb-cell obstacle"><span class="glyph">🏛️</span>Altare / Bordo Scacchiera</div>
              </div>

              <div class="kb-explanation">
                <strong>La Regola dei +2 Danni da Urto:</strong> Se una pedina spinta incontra un ostacolo (un Altare, un Muro di Detriti, un'altra unità o il bordo invalicabile della scacchiera) e non può completare la casella di arretramento, <strong>il suo corpo si schianta subendo 2 DANNI DA URTO IMMEDIATI</strong> in aggiunta ai danni normali! Posizionare i nemici contro le pareti è la chiave per distruggerli in un solo colpo.
              </div>
            </div>
          </article>
        </section>

        <!-- 9. RITI D'ARMI SUPREMI -->
        <section class="tutorial-section" id="tut-riti">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">9</div>
            <h2 class="tutorial-section-title">IL RITO D'ARMI SUPREMO DEL COMANDANTE</h2>
          </div>

          <article class="tutorial-card">
            <p>Ogni Comandante possiede un'<strong>Aura Passiva</strong> permanente e un devastante <strong>Rito d'Armi Supremo</strong>. Il Rito è il punto di rottura di ogni schermaglia: costa <strong>1 Azione Tattica</strong> e una scorta di <strong>3 o 4 Segnalini Sangue 🩸</strong>.</p>

            <div class="rites-grid-overview">
              <div class="rite-item">
                <div class="r-comm">🛡️ Valeria (Ferro — Set α)</div>
                <div class="r-cost">3 Sangue 🩸 | 1 Azione ⚡</div>
                <div class="r-name">Schianto Sismico</div>
                <p>2 danni ad area ortogonale e respinge tutti i nemici attorno di 1 casella (+2 danni se sbattono contro muri o bordi).</p>
              </div>

              <div class="rite-item">
                <div class="r-comm">💀 Malakor (Ceneri — Set α)</div>
                <div class="r-cost">4 Sangue 🩸 | 1 Azione ⚡</div>
                <div class="r-name">Vincolo di Carne</div>
                <p>Maledice un bersaglio a vista: per 1 intero round, il 50% di tutti i danni subiti da Malakor vengono istantaneamente riflessi sul bersaglio.</p>
              </div>

              <div class="rite-item">
                <div class="r-comm">🌌 Vespera (Marea — Set α)</div>
                <div class="r-cost">3 Sangue 🩸 | 1 Azione ⚡</div>
                <div class="r-name">Ritorno di Marea</div>
                <p>Proietta un'onda gravitazionale che scaglia un pezzo qualsiasi fino a 3 caselle in linea retta (+2 danni se impatta).</p>
              </div>

              <div class="rite-item">
                <div class="r-comm">⚖️ Aurelius (Silenzio — Set α)</div>
                <div class="r-cost">4 Sangue 🩸 | 1 Azione ⚡</div>
                <div class="r-name">Decima di Ferro</div>
                <p>Sanziona l'avversario con una tassa di sangue: ogni volta che il nemico sferra un attacco, deve pagare 1 Mana o subire 2 danni diretti.</p>
              </div>

              <div class="rite-item">
                <div class="r-comm">🌋 Vulkan (Forgia — Set α)</div>
                <div class="r-cost">3 Sangue 🩸 | 1 Azione ⚡</div>
                <div class="r-name">Altare Semovente</div>
                <p>Infonde fuoco primordiale in un Altare alleato adiacente, animandolo istantaneamente in un automa da guerra 3/5 che attacca subito.</p>
              </div>

              <div class="rite-item">
                <div class="r-comm">♞ Garek (Ferro — Set β)</div>
                <div class="r-cost">3 Sangue 🩸 | 1 Azione ⚡</div>
                <div class="r-name">Ruggito del Bastione</div>
                <p>Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT di contrattacco difensivo per il resto della contesa.</p>
              </div>
            </div>
          </article>
        </section>

        <!-- 10. REGOLA DEL TURNO 1 & DECKBUILDING -->
        <section class="tutorial-section" id="tut-regole-speciali">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">10</div>
            <h2 class="tutorial-section-title">REGOLA DEL TURNO 1 & DECKBUILDING STANDARD</h2>
          </div>

          <article class="tutorial-card">
            <div class="tutorial-card-header">
              <h3 class="tutorial-card-title">🛡️ Il Codice Cavalleresco di Veridia</h3>
              <span class="tutorial-badge gold">Integrità Competitiva</span>
            </div>

            <div class="t1-rules-box">
              <h4>1. La Clausola di Salvaguardia del Turno 1</h4>
              <p>Per impedire strategie degenerate di eliminazione immediata al primo secondo di partita, vige la regola universale:</p>
              <div class="t1-highlight">
                «Al Turno 1, nessun giocatore può sferrare attacchi diretti al Comandante avversario.»
              </div>
              <p>Puoi schierare Altari, muovere fanti verso il centro, evocare unità con Slancio per contendere le caselle mediane o colpire miniature secondarie, ma la Corona nemica è inviolabile durante il primo round di assestamento.</p>
            </div>

            <div class="t1-rules-box" style="margin-top: 18px;">
              <h4>2. Regole di Composizione del Grimorio (Formato Standard)</h4>
              <ul class="tutorial-list">
                <li><strong>Dimensione del Mazzo:</strong> Il grimorio deve contenere un <strong>minimo di 30 carte</strong> e un <strong>massimo di 40 carte</strong>.</li>
                <li><strong>Vincolo Rigido 4x:</strong> Puoi inserire al massimo <strong>4 copie</strong> della stessa carta identica nel mazzo.</li>
                <li><strong>Comandante Leader:</strong> Ogni grimorio deve essere guidato da esattamente 1 Comandante prescelto.</li>
              </ul>
            </div>
          </article>
        </section>

        <!-- 11. ANATOMIA DI UNA CARTA -->
        <section class="tutorial-section" id="tut-anatomia-carta">
          <div class="tutorial-section-header">
            <div class="tutorial-section-num">11</div>
            <h2 class="tutorial-section-title">ANATOMIA DI UNA CARTA DI CROWNFALL</h2>
          </div>

          <article class="tutorial-card">
            <p>Ogni carta collezionabile del Set α e del Set β segue un rigido layout da gioco di carte collezionabili dark fantasy. Esaminalo nel dettaglio:</p>

            <!-- MOCKUP 5: ANATOMIA CARTA -->
            <div class="tutorial-mockup">
              <div class="tutorial-mockup-bar">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-title">📷 SCHEMA ANATOMICO: GUIDA AGLI ELEMENTI DI UNA CARTA</span>
                <span class="mockup-tag">Layout Carte</span>
              </div>

              <div class="card-anatomy-container">
                <!-- VIRTUAL CARD -->
                <div class="anatomy-virtual-card">
                  <div class="avc-header">
                    <span class="avc-title">Segugio Randagio</span>
                    <div class="avc-cost-pip">1</div>
                  </div>
                  <div class="avc-art">🐺</div>
                  <div class="avc-banner">
                    <span>MINIATURA</span>
                    <span class="avc-rarity">COMUNE</span>
                  </div>
                  <div class="avc-textbox">
                    Slancio <em class="avc-em">*(può muoversi e attaccare nello stesso turno in cui entra in gioco)*</em>: muove fino a 2 caselle ortogonali e attacca subito.
                  </div>
                  <div class="avc-badge-edition">α</div>
                  <div class="avc-pt">1/2</div>
                </div>

                <!-- CALLOUT ANNOTATIONS -->
                <div class="card-callouts-list">
                  <div class="c-callout">
                    <span class="c-num">①</span>
                    <div class="c-body">
                      <strong>Costo di Lancio (Mana / Sangue):</strong>
                      <span>In alto a destra. Cerchio ciano per il Mana (es. 1), pillola cremisi per il Sangue se richiesto (es. 3🩸).</span>
                    </div>
                  </div>

                  <div class="c-callout">
                    <span class="c-num">②</span>
                    <div class="c-body">
                      <strong>Titolo & Glifo:</strong>
                      <span>Nome ufficiale del guscio e glifo araldico che ne identifica la natura sulla scacchiera.</span>
                    </div>
                  </div>

                  <div class="c-callout">
                    <span class="c-num">③</span>
                    <div class="c-body">
                      <strong>Banner Tipologia & Rarità:</strong>
                      <span>MINIATURA (truppa combattente), ALTARE (struttura territoriale), MAGIA (effetto istantaneo) o REAZIONE (attivazione fuori turno). Colore del bordo in base alla rarità.</span>
                    </div>
                  </div>

                  <div class="c-callout">
                    <span class="c-num">④</span>
                    <div class="c-body">
                      <strong>Testo delle Regole & Reminder Text in Corsivo:</strong>
                      <span>Le parole chiave operative come <em>Slancio</em> o <em>Balzo a L</em> sono sempre seguite dalla spiegazione esplicita in corsivo *(tra parentesi)* per chiarezza immediata.</span>
                    </div>
                  </div>

                  <div class="c-callout">
                    <span class="c-num">⑤</span>
                    <div class="c-body">
                      <strong>Badge d'Edizione (in basso a sinistra):</strong>
                      <span>Indica l'espansione di provenienza: <strong>α</strong> (Set Alpha — 290 carte) oppure <strong>β</strong> (Set Beta — 270 carte).</span>
                    </div>
                  </div>

                  <div class="c-callout">
                    <span class="c-num">⑥</span>
                    <div class="c-body">
                      <strong>Riquadro P/T (Attacco / Punti Vita):</strong>
                      <span>In basso a destra. Solo per Miniature e Comandanti (es. 1/2 = 1 ATT e 2 PV). Gli Altari mostrano solo i loro PV (es. 5 PV). I Sortilegi non hanno P/T.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- BOTTONE FINALE VERSO IL GIOCO -->
            <div style="text-align: center; margin-top: 36px;">
              <button class="btn-arena-done" style="max-width: 360px; margin: 0 auto; font-size: 0.95rem; padding: 14px 28px;" onclick="showPane('battle-lobby')">
                ⚔️ ENTRA NELLA BATTAGLIA
              </button>
            </div>
          </article>
        </section>

      </div>
    </div>
`;

console.log('Generated Tutorial HTML length:', tutorialHtml.length);
fs.writeFileSync('scratch/tutorial_content.html', tutorialHtml, 'utf8');
