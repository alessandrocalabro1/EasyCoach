import type { AppInputData } from '../data/mockData';

export const generateInitialAnalysis = (data: AppInputData): string => {
    const { wod, athlete } = data;
    const isBeginner = athlete.level === 'beginner';
    const hasInjury = athlete.injuries_or_limits && athlete.injuries_or_limits.length > 0;

    // Basic logic to generate a "smart" response
    let scalingAdvice = "";
    if (isBeginner) {
        scalingAdvice = `- RX: Non raccomandato oggi.\n- Smart Scale: Riduci carico del 30-40%, focus tecnica.`;
    } else if (hasInjury) {
        scalingAdvice = `- RX: Solo se ${athlete.injuries_or_limits[0]} non dà fastidio.\n- Smart Scale: Sostituisci movimenti impattanti.`;
    } else {
        scalingAdvice = `- RX: Go for it!\n- Smart Scale: Cap time ridotto.`;
    }

    // Integrate KB Snippets for Context
    let kbSection = "";
    if (data.kb_snippets && data.kb_snippets.length > 0) {
        data.kb_snippets.forEach(ks => {
            kbSection += `\n- Fonte interna: ${ks.source}: ${ks.snippet}`;
        });
    }

    return `
## Sintesi WOD
Un mix di forza pesante (${wod.parts[0].description.split(':')[0]}) e un Metcon classico a terzine. Richiede gestione del cortisolo nella prima parte e pacing costante nella seconda.

## Domande Flash (solo se necessarie)
${hasInjury ? `1) Come va la schiena oggi? 1-10 dolore?` : ""}
2) Quanto tempo hai esattamente (60 o 90 min)?

## Piano Coach (Bozza)
### 1) Warm-up
- 5 min Row leggero
- 3 round: 10 Air Squats, 5 Inchworms, 10 Scap Pull-ups.
- Mobilità specifica per ${hasInjury ? "la zona lombare" : "anca e spalle"}.

### 2) Technique Primer
- Back Squat: Focus su "spezzare il parallelo" senza perdere la lordosi.

### 3) Scaling
${scalingAdvice}

### 4) Strategia & Pacing (Generale)
- Metcon: 12 min sono lunghi. Parti al 80%.

### 5) Errori comuni + fix
- Squat: Ginocchia che collassano -> Spingi in fuori i piedi.
- Wall Ball: Palla bassa -> Mira preciso al target ogni volta.

### 6) Cooldown/Recovery
- 5 min bici molto blanda.
- Stretching flessori anca e quadricipiti.
${kbSection ? `\n### Note da Knowledge Base${kbSection}` : ""}

## Stima Difficoltà (Provvisoria)
- Score: ${isBeginner ? "85" : "70"}/100

Attendo risposte per il Piano Coach definitivo e specifico.
`.trim();
};

export const generateUpdatedPlan = (_data: AppInputData, userAnswers: string): string => {
    const isShortTime = userAnswers.toLowerCase().includes("60") || userAnswers.toLowerCase().includes("poco");
    const isPainful = userAnswers.toLowerCase().includes("male") || userAnswers.toLowerCase().includes("dolore") || userAnswers.toLowerCase().includes("sì");

    let finalPlan = `## Piano Coach Definitivo\n\n`;

    if (isPainful) {
        finalPlan += `### ⚠️ Modifica Sicurezza:
Ho rimosso i carichi pesanti visto il dolore segnalato. 
- Sostituisci Back Squat pesante con Tempo Goblet Squats @3331 (molto leggeri) per attivazione senza carico spinale.
- Nel Metcon: Wall Balls diventano Air Squats o Thruster a corpo libero se necessario.
    \n`;
    } else {
        finalPlan += `### Carico confermato:
Ottimo che non ci sia dolore. Procedi con la progressione lineare nel Back Squat.
- Target: Cerca di aumentare 2-5kg rispetto alla settimana scorsa se la tecnica è solida.
    \n`;
    }

    if (isShortTime) {
        finalPlan += `### ⏱️ Adattamento Tempo:
Visto che hai ${isShortTime ? "solo 60 min" : "tempo"}, tagliamo:
- Warm-up: 2 round invece di 3.
- Accessory work: Rimandato alla prossima sessione.
    \n`;
    }

    finalPlan += `### Strategia & Pacing (Aggiornata)
1. **Squat**: ${isPainful ? "Focus puramente tecnico, 5 set x 5 reps lentissime." : "5 set salendo. Riposo 2:30 tra i set."}
2. **Metcon**: ${isPainful ? "Lavora sulla qualità del movimento, ignorando il timer." : "Parti deciso. I primi 5 minuti al 85%, poi tieni. Le transizioni devono essere sotto i 10s."}

### Logging Finale
Quando hai finito, clicca su "Concludi Allenamento" per salvare i dati.`; // Updated user prompt in generated plan

    return finalPlan;
};
