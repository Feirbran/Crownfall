# Integrazione Database Completo Carte + Fix Kaelen

## Contesto

L'utente richiede due interventi:
1. **Fix del Rito di Kaelen** — la selezione interattiva delle unità da scambiare non funziona
2. **Integrazione del database completo** — sostituire il CARDS_DB attuale (21 carte) e COMMANDERS (10 entry) con il database master completo fornito (~90+ carte, 10 comandanti con struttura dati nuova)

---

## Analisi Kaelen

Il codice del rito di Kaelen **è strutturalmente corretto** (funzioni `startKaelenRiteSelection`, `handleKaelenRiteClick`, `executeKaelenSwap` sono tutte presenti e collegate). Il flusso è:

1. Pulsante "Rito d'Armi" → `useWeaponRiteP1()` 
2. Se `comm.id === 'kaelen'` → `startKaelenRiteSelection(role)` 
3. Imposta `battleState.kaelenRiteState = { step: 1 }` e illumina le caselle
4. Click successivi → `onSquareClick` → `handleKaelenRiteClick`

**Problemi identificati:**

- Il `comm.id` salvato nel `battleState` potrebbe non corrispondere a `'kaelen'` se il mapping name→id è sbagliato nella nuova struttura dati
- Il pulsante del rito **non costa un'azione** — manca il decremento di `battleState[role].actions`  
- Il rito si attiva solo se l'utente ha accumulato 3 🩸 (Sangue), cosa non ovvia per l'utente

> [!IMPORTANT]
> Il problema principale potrebbe essere che **Kaelen non è sbloccato di default** — solo i 5 comandanti Set 0 lo sono. L'utente potrebbe non essere riuscito a usare Kaelen in primo luogo.

---

## Proposed Changes

### Database Carte e Comandanti

#### [MODIFY] [index.html](file:///c:/Users/feirb/Desktop/Desktop/Git/Crownfall/index.html)

**1. Sostituire `COMMANDERS` (righe 887-899)**

Sostituire l'oggetto `COMMANDERS` esistente con il nuovo `COMMANDERS` basato sul `COMMANDERS_POOL` fornito. La struttura interna deve mantenere compatibilità con il codice esistente (`id`, `set`, `rarity`, `name`, `hp`, `att`, `move`, `glyph`, `archetype`, `riteCost`, `riteDesc`).

Mappa dei 10 comandanti (nomi → id interni):
| Nome Display | ID interno | Faction | Set |
|---|---|---|---|
| Valeria del Bastione | `valeria` | Ferro | 0 |
| Garek lo Spezzatore | `garek` | Ferro | 1 |
| Malakor del Rogo | `malakor` | Ceneri | 0 |
| Morbida, la Nutrice | `morbida` | Ceneri | 1 |
| Vespera delle Maree | `vespera` | Marea | 0 |
| Kaelen, Occhio del Vortice | `kaelen` | Marea | 1 |
| Aurelius il Giusto | `aurelius` | Silenzio | 0 |
| Justiciar Kael | `justiciar_kael` | Silenzio | 1 |
| Vulkan il Fabbro | `vulkan` | Forgia | 0 |
| Ignis, la Forgia Vivente | `ignis` | Forgia | 1 |

**2. Sostituire `CARDS_DB` (righe 901-926)**

Sostituire con il database completo di ~90+ carte. Ogni carta deve mantenere la struttura:
```javascript
id: { id, set, rarity, name, type, cost, hp, att, move, range, glyph, desc, keywords? }
```

Dovrò mappare il formato del prompt dell'utente (che usa chiavi testuali come `"Altare"`, `"Recluta di Leva"`) in ID snake_case compatibili con il codice (es. `altare`, `recluta_di_leva`).

La struttura `rarity` va mappata: `"C"` → `"common"`, `"U"` → `"uncommon"`, `"R"` → `"rare"`, `"M"` → `"mythic"`.

Il campo `gittata` del prompt va mappato in `range`.

**3. Aggiornare `defaultBaseDeck` (righe 928-938)**

I 30 ID delle carte base devono puntare ai nuovi ID nel CARDS_DB aggiornato. Il mazzo base includerà carte base di tutte le fazioni neutrali + Ferro (Set 0).

**4. Aggiornare `unlockedCommanders` (riga 956)**

Mantenere i 5 comandanti Set 0 sbloccati di default.

**5. Aggiornare `executeRiteAction` (righe 3590-3698)**

I riti dei comandanti devono essere aggiornati con i nuovi effetti descritti nel prompt. In particolare:
- Valeria: "2 danni ad area e respinta di 1 casella (+1 danno urto)"
- Garek: "Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT"
- E così via per tutti i 10 comandanti

**6. Aggiungere tipo `reaction` al motore**

Il nuovo database include carte di tipo `"reaction"` (reazioni istantanee). Il codice attuale gestisce solo `unit`, `altar`, `spell`. Devo aggiungere supporto per `reaction` nel pack opening e nel deck builder.

---

### Fix Kaelen 

1. **Assicurare che `comm.id` sia sempre `'kaelen'`** nel battleState quando si usa Kaelen
2. **Aggiungere feedback visivo più chiaro** durante la selezione (testo sulla board o toast persistente)
3. **Verificare che `startKaelenRiteSelection` pulisca correttamente** lo stato della selezione mano (`selectedHandIndex`)
4. **Aggiungere un pulsante "Annulla Rito"** visibile durante la selezione

---

## Open Questions

> [!IMPORTANT]
> **Set assignment**: Nel prompt, i comandanti sono divisi per faction (Ferro, Ceneri, Marea, Silenzio, Forgia) ma non per Set. Mantengo il mapping attuale (Valeria/Malakor/Vespera/Aurelius/Vulkan = Set 0, Garek/Morbida/Kaelen/Justiciar Kael/Ignis = Set 1)?

> [!IMPORTANT]  
> **Carte e Set**: Le ~90 carte nel prompt non specificano il Set. Devo assegnare le carte Neutrali e delle fazioni "base" al Set 0, e le carte delle fazioni "avanzate" al Set 1? Oppure tutte le carte di fazione Neutral sono Set 0 e le carte fazione-specifiche sono divise per faction/set del comandante?

> [!IMPORTANT]
> **Reazioni Istantanee**: Le carte di tipo `reaction` sono un nuovo tipo di carta (costo 0 Mana + costo Sangue). Vuoi che le implementi come sortilegi giocabili durante il turno nemico, o come sortilegi normali con costo Sangue aggiuntivo?

---

## Verification Plan

### Automated Tests
- Contare le carte in `CARDS_DB` e verificare che siano tutte presenti
- Verificare che tutti i 10 comandanti siano nell'oggetto `COMMANDERS`
- Verificare che `defaultBaseDeck` contenga 30 carte valide

### Manual Verification
- Aprire il gioco, selezionare Kaelen come comandante, iniziare una battaglia
- Accumulare 3 Sangue, cliccare "Rito d'Armi", verificare la selezione a 2 step
- Verificare che il pack opening estragga dalle nuove carte
- Verificare che il deck builder mostri tutte le carte della collezione
