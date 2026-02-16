import type { Wod, WodPart } from '../data/mockData';

export const parseWodFromText = (text: string): Wod => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) {
        return { title: 'WOD del Giorno', parts: [] };
    }

    // Try to detect title: first line if short and seemingly a title, or if it starts with "WOD"
    let title = "WOD del Giorno";
    let startIndex = 0;

    if (lines[0].toUpperCase().startsWith("WOD") || lines[0].length < 30) {
        title = lines[0];
        startIndex = 1;
    }

    const parts: WodPart[] = [];
    let currentPart: WodPart | null = null;

    // Simple keywords to identify sections
    const strengthKeywords = ['strength', 'forza', 'back squat', 'deadlift', 'press', 'emom', 'weightlifting'];
    const metconKeywords = ['metcon', 'condiz', 'condition', 'amrap', 'for time', 'rounds', 'wod'];
    const accessoryKeywords = ['accessory', 'accessori', 'skill', 'warm up', 'warm-up', 'finisher'];

    // Helper to determine type
    const determineType = (line: string): WodPart['type'] | null => {
        const lower = line.toLowerCase();
        if (accessoryKeywords.some(k => lower.includes(k))) return 'accessory';
        if (strengthKeywords.some(k => lower.includes(k))) return 'strength';
        if (metconKeywords.some(k => lower.includes(k))) return 'metcon';
        return null;
    };

    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        const detectedType = determineType(line);

        // If we detect a header-like line (e.g. "Strength: ...") or just a keyword starting a block
        if (detectedType || line.endsWith(':')) {
            // Push previous part if exists
            if (currentPart) {
                parts.push(currentPart);
            }
            // Start new part
            currentPart = {
                type: detectedType || 'metcon', // default to metcon if unsure but looks like header
                description: line.endsWith(':') ? "" : line,
                timecap_minutes: null,
                notes: null
            };
            if (!line.endsWith(':') && detectedType) {
                // If the line was just "Metcon", don't add it to description again if possible, 
                // but if it was "Metcon: AMRAP 10", keep it.
                // For simplicity, we just keep the full line acting as header/first line
            }
        } else {
            // It's body text
            if (!currentPart) {
                // Create a default first part if none exists
                currentPart = {
                    type: 'metcon',
                    description: '',
                    timecap_minutes: null,
                    notes: null
                };
            }
            currentPart.description += (currentPart.description ? '\n' : '') + line;

            // Try to extract Time Cap
            const tcMatch = line.match(/(?:tc|time cap|cap)[:\s]*(\d+)/i);
            if (tcMatch) {
                currentPart.timecap_minutes = parseInt(tcMatch[1], 10);
            }
        }
    }

    if (currentPart) {
        parts.push(currentPart);
    }

    // Fallback if structure parsing failed completely (single block)
    if (parts.length === 0 && lines.length > 0) {
        const fullText = lines.slice(startIndex).join('\n');
        // Try to guess type from full text
        let type: WodPart['type'] = 'metcon';
        if (fullText.toLowerCase().includes('squat') && !fullText.toLowerCase().includes('amrap')) type = 'strength';

        parts.push({
            type,
            description: fullText,
            timecap_minutes: null,
            notes: null
        });
    }

    return {
        title,
        parts
    };
};

export const EXAMPLE_WOD_TEXT = `WOD: Heavy Day + Engine

Strength
Every 2:00 x 5 Sets:
3 Deadlifts @ 80-85%
Focus on maintaining a neutral spine.

Metcon
AMRAP 12 Minutes:
15 Wall Balls (9/6kg)
12 Toes to Bar
9 Box Jumps (60/50cm)

Accessory
3 Sets:
15 Banded Face Pulls
30s Plank Hold
`;
