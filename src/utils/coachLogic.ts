import type { AppInputData } from '../data/mockData';

export const generateInitialAnalysis = (data: AppInputData): string => {
    const { wod, athlete } = data;
    const isBeginner = athlete.level === 'beginner';
    const hasInjury = athlete.injuries_or_limits && athlete.injuries_or_limits.length > 0;

    if (!wod.parts || wod.parts.length === 0) {
        return "Non ho trovato un WOD valido da analizzare. Inserisci il workout per iniziare.";
    }

    // Identify types of work
    const workTypes = wod.parts.map(p => p.type).join(', ');
    const mainMovement = wod.parts[0]?.description.split('\n')[0] || "lavoro principale";

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
## Analisi WOD: ${wod.title || "Workout del Giorno"}
Questo workout include: **${workTypes}**.
Focus principale su: *${mainMovement}*.

## Domande Flash (solo se necessarie)
${hasInjury ? `1) Come va il problema a: ${athlete.injuries_or_limits.join(', ')}?` : ""}
2) Quanto tempo hai a disposizione oggi?

## Piano Coach (Bozza)
### 1) Warm-up
- 5 min Cardio leggero (Row/Bike/Run)
- Mobilità specifica per i movimenti odierni.
- Attivazione core e spalle.

### 2) Focus Tecnico
- Rivedi la tecnica dei movimenti principali prima di caricare.
- Fai delle serie di avvicinamento progressive.

### 3) Scaling
${scalingAdvice}

### 4) Strategia & Pacing
- Gestisci le energie in modo costante. Non partire al 100%.
- Nei set pesanti, recupera il necessario. Nei Metcon, minimizza le transizioni.

### 5) Note & Tips
- Mantieni la postura corretta anche sotto fatica.
- Respira regolarmente.

${kbSection ? `\n### Note da Knowledge Base${kbSection}` : ""}

## Stima Difficoltà
- Score Previsto: ${isBeginner ? "High" : "Medium-High"} intensity.

Attendo conferme per il Piano definitivo.
`.trim();
};

export const generateUpdatedPlan = (_data: AppInputData, userAnswers: string): string => {
    const isShortTime = userAnswers.toLowerCase().includes("60") || userAnswers.toLowerCase().includes("poco");
    const isPainful = userAnswers.toLowerCase().includes("male") || userAnswers.toLowerCase().includes("dolore") || userAnswers.toLowerCase().includes("sì");

    let finalPlan = `## Piano Coach Definitivo\n\n`;

    if (isPainful) {
        finalPlan += `### ⚠️ Modifica Sicurezza:
Ho rimosso i carichi pesanti o i movimenti impattanti visto il dolore segnalato.
- Focus assoluto sulla qualità del movimento o sostituzione con varianti isometriche/low-impact.
    \n`;
    } else {
        finalPlan += `### Luce Verde:
Ottimo che non ci sia dolore. Procedi come programmato.
- Spingi sui carichi se ti senti bene, ma priorità sempre alla tecnica.
    \n`;
    }

    if (isShortTime) {
        finalPlan += `### ⏱️ Adattamento Tempo:
Visto il tempo ridotto:
- Warm-up compatto (5-8 min).
- Riduci i recuperi o taglia un round/set se necessario per stare nei 60 min.
    \n`;
    }

    finalPlan += `### Strategia Finale
1. **Warm-up**: Rapido ed efficace. Sudare leggermente prima di iniziare.
2. **Main WOD**: ${isPainful ? "Lavora sulla qualità, ignorando il timer." : "Intensità controllata. Spingi nell'ultima parte."}

### Logging Finale
Quando hai finito, clicca su "Concludi Allenamento" per salvare i dati.`;

    return finalPlan;
};
